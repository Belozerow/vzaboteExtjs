Ext.define('Vzabote.view.Products',{
   extend: 'Ext.panel.Panel',
   alias: 'widget.products',
   id: 'products',
   layout: {
       type: 'vbox',
       align: 'stretch'
   },
   animDuration: 500,
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
           height: 0
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
       this.cartsDataView = Ext.create('Ext.view.View',Ext.apply({
                   id: 'products-carts',
                   itemCls: 'products-carts-dataview',
                   store: this.cartsStore,
                   bubbleEvents: ['itemclick']
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
       this.addDocked(this.bottomPanel);
       this.cngButton('main');
           
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
        this.productsDataPanel.animate({
            to: {height: this.getHeight()-this.productTypesPanel.getHeight()},
            from: {height: 0},
            duration: this.animDuration
        });
        
        this.productsData.refresh();
        this.cartsPanel.animate({
            to: {y: Ext.getBody().getHeight()-70},
            from: {y:this.productsDataPanel.getEl().getY()},
            duration: this.animDuration,
            listeners: {
                afteranimate: callback||Ext.emptyFn,
                scope: scope||this
            }
        });         
   },
   hideProducts: function(callback,scope){
        this.productsDataPanel.animate({
            to: {height: 0},
            duration: this.animDuration
        });
        this.cartsPanel.animate({
            to: {y: this.productsDataPanel.getEl().getY()},
            duration: this.animDuration,
            listeners: {
                afteranimate: callback||Ext.emptyFn,
                scope: scope||this
            }
        });
   },
   showCartContent: function(cart){
       if(!this.cartContent||this.cartContent.isDestroyed){
            this.cartContent = Ext.create('Vzabote.view.ScrollableDataView',Ext.apply({
               store: cart.products(),
               cardParent: this,
               listeners: {
                   itemclick: function(me,item,node,index,e){
                       this.fireEvent('cartcontentitemclick',me,item,node,index,e)
                   },
                   scope: this
               }
            },templates.products.cartcontent));
            this.add(this.cartContent);    
       }
       
   },
   hideCartContent: function(){
       this.remove(this.cartContent);
   },
   refresh: function(){
       this.productTypesPanel.refresh();
       this.productsData.refresh();       
   },
   getInner: function(){
       return this.getEl().down('#products-innerCt');
   },
   disableCartsDataView: function(cart){
       if(this.cartsDataView.viewReady){
            this.cartsDataView.mask();
            this.activeElement = Ext.get(this.cartsDataView.getNode(cart));
            this.activeElement.addCls('scrollable-dataview-item-selected');    
       }
       else{
            this.cartsDataView.on('viewready',function(){
                this.cartsDataView.mask();
                this.activeElement = Ext.get(this.cartsDataView.getNode(cart));
                this.activeElement.addCls('scrollable-dataview-item-selected');    
            },this,{single: true});
       }
   },
   enableCartsDataView: function(){
       this.cartsDataView.getTargetEl().unmask();
       this.activeElement.removeCls('scrollable-dataview-item-selected');
   },
   updateSliderInfo: function(newDate){
       Ext.apply(this.scrollerInfoData,newDate);
       this.sliderMin = newDate.minprice;
       this.sliderMax = newDate.maxprice;
       this.sliderInfoPanel.update(this.scrollerInfoData);
   },
   setBrandText: function(text){
       this.brandsFilter.setText(text);
   }
});
