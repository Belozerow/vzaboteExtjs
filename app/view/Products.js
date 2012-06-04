Ext.define('Vzabote.view.Products',{
   extend: 'Ext.panel.Panel',
   alias: 'widget.products',
   id: 'products',
   layout: {
       type: 'vbox',
       align: 'stretch'
   },
   animDuration: 300,
   fadeDuration: 200,
   productsHeight: 440,
   saveStateAfterLayout: function(){
        var activeItem = this.cardPanel.getEl();
        if(this.productsIsShown){
            activeItem.setY(this.productsY);
        }
        if(this.cartIsShown){
            activeItem.setY(this.cartsY);
        }
   },
   initComponent: function(){
       this.callParent();
       this.add(Ext.apply({},templates.products.title));
       this.productTypesPanel = Ext.create('Vzabote.view.ScrollableDataView',Ext.apply({
           store: this.store,
           cardParent: this,
           id: 'products-productstypes'
       },templates.products.dataview));
       
       this.add(this.productTypesPanel);
       
       this.productsDataPanel = Ext.create('Ext.container.Container',{
           layout: {
               type: 'vbox',
               align: 'stretch'
           },
           height: this.productsHeight,
           hidden: true
       });
       
       //TODO this.sliderMin = this.productsStore.getMinPrice()
       this.sliderMin = 20;
       this.sliderMax = 145;
       this.slider = Ext.create('Ext.slider.Multi',Ext.apply({
           minValue: this.sliderMin,
           maxValue: this.sliderMax,
           increment: 1,
           useTips: false,
           values: [this.sliderMin,this.sliderMax]
       },templates.products.slider));
       this.scrollerInfoData = {
               name: 'Продукт',
               minprice: this.sliderMin,
               maxprice: this.sliderMax,
               measure: 'КГ'
       };
       this.sliderInfoPanel = Ext.create('Ext.container.Container',Ext.apply({
           data: this.scrollerInfoData
       },templates.products.sliderinfo));
       
       this.brandsFilter = Ext.create('Ext.button.Button',Ext.apply({
       },templates.products.brandfilter));
       
       this.productsFilters = Ext.create('Ext.container.Container',{
           layout: {
               type: 'hbox',
               align: 'stretch'
           },
           items: [{
               xtype: 'container',
               layout: {
                   type: 'vbox',
                   align: 'start'
               },
               flex: 7,
               items: [this.sliderInfoPanel,this.slider]
           },{
               xtype: 'container',
               flex: 3,
               layout: {
                   type: 'hbox',
                   align: 'middle',
                   pack: 'center'
               },
               items: this.brandsFilter
           }
           
           ]
       });
       this.productsDataPanel.add(this.productsFilters);
       this.productsData = Ext.create('Vzabote.view.ScrollableDataView',Ext.apply({
           store: this.productsStore,
           id: 'products-products',
           cardParent: this,
           metaData: [
                {name: 'Свежая свинина', count: 3},
                {name: 'Полуфабрикаты', count: 3},
                {name: 'Копченая', count: 2}
           ]
       },templates.products.products));
       this.productsDataPanel.add(this.productsData);
       
       this.add(this.productsDataPanel);
       this.cartsDataView = Ext.create('Vzabote.view.ScrollableDataView',Ext.apply({
                   id: 'products-carts',
                   itemCls: 'products-carts-dataview',
                   store: this.cartsStore,
                   cardParent: this,
                   bubbleEvents: ['itemclick'],
                   hideScrollerOnEmpty: true
       },templates.products.cart));
       this.cartsPanel = Ext.create('Ext.container.Container',{
           xtype: 'panel',
           id: 'products-cartspanel',
           layout: {
               type: 'vbox',
               align: 'stretch'
           },
           items: [
                Ext.apply({
                },templates.products.cartsTitle),
                this.cartsDataView
           ]
       });
       
       this.add(this.cartsPanel);
       this.mainpageBackButton = Ext.create('Ext.button.Button',Ext.apply({
               xtype: 'button',
               href: '#/index',
               hrefTarget: '_self',
               id: 'products-backbutton',
               cls: 'back-button'
       },templates.products.backbutton));
       this.productsBackButton = Ext.create('Ext.button.Button',Ext.apply({
               xtype: 'button',
               href: '#/products',
               hrefTarget: '_self',
               id: 'products-productsbackbutton',
               cls: 'back-button'
       },templates.products.backbuttonproducts));
       this.bottomPanel = Ext.create('Ext.container.Container',{xtype: 'panel',
           dock: 'bottom',
           layout: {
               type: 'hbox',
               pack: 'start'
           },
           items: [
            this.mainpageBackButton,
            this.productsBackButton,
            Ext.apply({
               xtype: 'button',
               href: '#/products',
               hrefTarget: '_self',
               id: 'products-forwardbutton',
               cls: 'forward-button'
            },templates.products.forwardbutton)
           ]
       });
       this.cartContent = Ext.create('Vzabote.view.ScrollableDataView',Ext.apply({
            store: null,
            cardParent: this,
            height: this.productsHeight,
            hidden: true,
            listeners: {
               itemclick: function(me,item,node,index,e){
                   this.fireEvent('cartcontentitemclick',me,item,node,index,e);
               },
               scope: this
            }
       },templates.products.cartcontent));
       this.add(this.cartContent);
       this.addDocked(this.bottomPanel);
       this.cngButton('main');
       this.on('afterlayout',this.saveStateAfterLayout,this);
   },
   cngButton: function(type){
        switch(type){
            case 'main':    
                this.mainpageBackButton.show();
                this.productsBackButton.hide();
                break;
            case 'products':
                this.mainpageBackButton.hide();
                this.productsBackButton.show();
                break;
        }
        
   },
   showProducts: function(callback,scope){
       this.stopAnimation();
       this.cartsPanel.getEl().fadeOut({
            duration: this.fadeDuration,
            callback: function(){
                    this.cartsPanel.hide();
                    this.productsDataPanel.show();
                    this.productsDataPanel.getEl().slideIn(null,{
                        duration: this.animDuration,
                        callback: function(){
                            this.productsY = -this.productTypesPanel.getDataViewHeight()/2;
                            var activeItem = this.cardPanel.getEl(),
                                newY = this.productsY;
                            this.prevY = activeItem.getY();
                            activeItem.animate({
                                  to: {y: newY},
                                  duration: this.animDuration,
                                  listeners: {
                                      afteranimate: function(){
                                         this.productsIsShown = true;
                                         this.cngButton('products');
                                         this.doLayout();
                                      },
                                      scope: this
                                  }
                            });
                        },
                        scope: this                        
                    });
                    this.productsData.refresh();
                },
            scope: this
            
        });
   },
   hideProducts: function(callback,scope){
        if(this.productsIsShown){
            this.stopAnimation();
            var activeItem = this.cardPanel.getEl();
            this.suspendLayout = true;
            activeItem.animate({
              to: {y: this.prevY},
              duration: this.animDuration,
              listeners: {
                  afteranimate: function(){
                      this.productsDataPanel.getEl().slideOut(null,{
                            duration: this.animDuration,
                            callback: function(){
                                    this.productsDataPanel.hide();
                                    this.cartsPanel.show();
                                    this.cartsDataView.refresh();
                                    this.cartsPanel.getEl().fadeIn({
                                        duration: this.fadeDuration,
                                        callback: function(){
                                                this.productsIsShown = false;
                                                this.productTypesPanel.enableDataView();
                                                this.cngButton('main');
                                                this.suspendLayout = false;
                                                this.productTypesPanel.showScrollBar();
                                                this.doLayout();
                                        },
                                        scope: this
                                    });
                            },
                            scope: this
                        });
                 },
                 scope: this
              }
            });   
        }
   },
   showCartContent: function(cart){
       this.stopAnimation();
       var carts = this.cartsDataView.dataView;
        Vzabote.util.onEventOrNow(carts,'viewready','viewReady',undefined,function(){
            this.cartsY = - carts.getEl().getY() - carts.getEl().down('.scrollable-dataview-item').getHeight()/3;
            var activeItem = this.cardPanel.getEl(),
              newY = this.cartsY;
              
            this.prevY = activeItem.getY();
            this.cartContent.show();
            this.cartContent.bindStore(cart.products(),true);
            this.cardPanel.doLayout();
            activeItem.animate({
                  to: {y: newY},
                  duration: this.animDuration,
                  listeners: {
                      afteranimate: function(){
                            this.cartIsShown = true;
                            this.doLayout();
                      },
                      scope: this
                  }
            });
            
        },this,{single: true});
   },
   hideCartContent: function(){
       if(this.cartIsShown){
           this.stopAnimation();
           var activeItem = this.cardPanel.getEl();
           if(this.cartContent&&!this.cartContent.isDestroyed){
                this.cartContent.hide();
                this.cardPanel.doLayout();
           }
           activeItem.animate({
              to: {y: this.prevY},
              duration: this.animDuration,
              callback: function(){
                  this.cartIsShown = false;
                  this.enableCartsDataView();
                  this.doLayout();
              },
              scope: this
           });
       }
   },
   stopAnimation: function(){
       if(this.cartsPanel.getActiveAnimation()){
           this.cartsPanel.getActiveAnimation().end();
       }
       if(this.cartsPanel.getEl().getActiveAnimation()){
           this.cartsPanel.getEl().getActiveAnimation().end();
       }
       if(this.productsDataPanel.getActiveAnimation()){
           this.productsDataPanel.getActiveAnimation().end();
       }
       if(this.productsDataPanel.getEl().getActiveAnimation()){
           this.productsDataPanel.getEl().getActiveAnimation().end();
       }
       var activeItem = this.cardPanel.getEl();
       if(activeItem&&activeItem.getActiveAnimation())
            activeItem.getActiveAnimation().end();
   },
   
   refresh: function(){
       this.productTypesPanel.refresh();
       this.productsData.refresh();       
   },
   getInner: function(){
        if(this.getEl())
            return this.getEl().down('#products-innerCt');  
        else return false;
   },
   disableCartsDataView: function(cart){
       Vzabote.util.onEventOrNow(this.cartsDataView.dataView,'viewready','viewReady',undefined,function(){
           this.cartsDataView.disableDataView(cart.get('id'));
           // this.activeElement = Ext.get(this.cartsDataView.dataView.getNode(cart));
           // this.activeElement.addCls('scrollable-dataview-item-selected');
       },this);
   },
   enableCartsDataView: function(){
       this.cartsDataView.enableDataView();
       // this.activeElement.removeCls('scrollable-dataview-item-selected');
   },
   updateSliderInfo: function(newDate){
       Ext.apply(this.scrollerInfoData,newDate);
       this.sliderMin = this.sliderInfoPanel.minprice;
       this.sliderMax = this.sliderInfoPanel.maxprice;
       this.sliderInfoPanel.update(this.scrollerInfoData);
   },
   setBrandText: function(text){
       this.brandsFilter.setText(text);
   }
});
