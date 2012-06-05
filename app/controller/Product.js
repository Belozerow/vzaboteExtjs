Ext.define('Vzabote.controller.Product',{
   extend: 'Ext.app.Controller',
   refs: [{
       ref: 'cardPanel',
       selector: '#cardpanel'
   },{
       ref: 'productsBackButton',
       selector: '#products-backbutton'
   },{
       ref: 'productTypesSlider',
       selector: '#products-productstypes'
   },{
       ref: 'productsSlider',
       selector: '#products-products'
   },{
	   ref: 'viewportTopPanel',
	   selector: '#top-panel'
   },{
       ref: 'cartsDataView',
       selector: '#products-carts'
   }],
   init: function(){
	   
   },
   index: function(query){
       if(query){
           Vzabote.bc.setItem('products',{
               url: '#/products',
               back: '#/index',
               forward: '#cart'
           });
       }
       var cardPanel = this.getCardPanel();
       if(this.productsView&&this.productsView.getEl()){
           this.productsView.hideProducts();           
       }
       if(this.productsView&&this.productsView.getEl()){
           this.productsView.hideCartContent();
       }
       if(cardPanel.layout.getActiveItem().xtype!='products'){
           
            this.getController('Viewport').closeAllWindows();
            
            var store = this.store = Ext.getStore('ProductTypes');
            this.productsStore = Ext.getStore('Products');
            this.cartsStore = Ext.getStore('Carts');
            
            
            if(store.getCount() === 0){
                this.mon(store,'load',function(){
                    this.showCategoryHintPopup();
                },this,{single: true});
                store.load();
            }
                        
            if(!this.productsView||this.productsView.isDestroyed){
                
                this.productsView = Ext.create('Vzabote.view.Products',{
                    store: this.store,
                    productsStore: this.productsStore,
                    cartsStore: this.cartsStore,
                    parentHeight: this.getCardPanel().getHeight(),
                    cardPanel: this.getCardPanel(),
                    listeners: {
                        productsData: {
                            itemclick: function(me,item,node,index,e){
                                var el = Ext.get(e.getTarget());
                                if(el.hasCls('loupe')){
                                     this.showProductPopup(node,item);
                                }
                                
                                // Добавление товара в корзину
                                var uStore = Ext.getStore('UserCart');
            					uStore.addItem(item.raw, {
            						dublicate: 'id'		// Товар не будет добавлен, если в сторе уже есть товар с таким id
            					});
            					
            					// Обновляем индикатор в header
            					// this.getViewportTopPanel().update({});
            					Vzabote.bc.updateNav();
                                
                            },
                            scope: this
                        },
                        cartcontentitemclick: function(me,item,node,index,e){
                                var el = Ext.get(e.getTarget());
                                if(el.hasCls('loupe')){
                                     this.showProductPopup(node,item);
                                }
                        },
                        cartsDataView: {
                            itemclick: function(me,item,node,index,e){
                                var el = Ext.get(e.getTarget());
                                if(el.hasCls('cart-info')){
                                     this.showCartInfoPopup(el,item);
                                }
                            },
                            scope: this
                        },
                        slider: {
                            change: function(me,val,thumb){
                                if(thumb.index === 0){
                                    this.productsView.updateSliderInfo({minprice: val});
                                }
                                else {
                                    this.productsView.updateSliderInfo({maxprice: val});
                                }
                                
                            },
                            scope: this
                        },
                        brandsFilter: {
                            click: function(me){
                                this.showBrandsPopup(me);
                            },
                            scope: this
                        },
                        scope: this
                    }
                });
                this.productsView.on('deactivate',function(){
                    this.stopAnimation();
                    this.productsView.productsIsShown =  false;
                    this.productsView.cartIsShown = false;
                    this.productsView.destroy();                    
                },this);
            }
            cardPanel.layout.setActiveItem(this.productsView);
       }
   },
   product: function(query){
       Vzabote.bc.setItem('products',{
           url: '#/products/'+query.id,
           back: '#/products',
           forward: '#cart'
       });
       if(!this.productsView||this.productsView.isDestroyed){
           this.index(false);
       }       
       Vzabote.util.onEventOrNow(this.store,'load',this.store.isLoading,true,function(){
           this.productsView.updateSliderInfo({name: this.store.getById(query.id).get('name')});
       },this,{single: true});
       Vzabote.util.onEventOrNow(this.getProductTypesSlider().dataView,'viewready','viewReady',undefined,function(){
           this.getProductTypesSlider().disableDataView(query.id);
           this.productsView.showProducts(function(){
               this.showProductHintPopup();
               this.productsView.productsData.getVisibleItems();
           },this);
       },this);
              
   },
   
   carts: function(query){
       Vzabote.bc.setItem('products',{
           url: '#/products/carts/'+query.id,
           back: '#/products',
           forward: '#cart'
        });
        if(!this.productsView||this.productsView.isDestroyed){
            this.index(false);
        }            
        var cart = Ext.getStore('Carts').getById(parseInt(query.id));
        Vzabote.util.onEventOrNow(this.getCartsDataView().dataView,'viewready','viewReady',undefined,function(){
           this.productsView.disableCartsDataView(cart);
           this.productsView.showCartContent(cart);
        },this);
        
   },
   showCategoryHintPopup: function(){
       if(!this.productsView.productsIsShown&&!this.productsView.cartIsShown&&!this.productsView.isDestroyed){
           this.productsView.mon(this.getProductTypesSlider().dataView,'show',function(){
                var element = this.getProductTypesSlider().getEl().down('.producttypes-image');
                if(this.infoPopup)
                    this.infoPopup.close();
                this.infoPopup = Ext.create('widget.simplepopup',Ext.apply({
                   ownerEl: element,
                   id: 'products-choose-info-popup',
                   cls: 'info-popup'
                },templates.popups.productsChooseInfo));
                this.infoPopup.show();    
           },this,{single: true});    
       }   
   },
   showProductHintPopup: function(){
       //TODO привязать к store.load
       if(!this.infoProductPopup){
           var element = this.getProductsSlider().getEl().down('.product-image');
           this.infoProductPopup = Ext.create('widget.simplepopup',Ext.apply({
               ownerEl: element,
               id: 'products-hint-info-popup',
               cls: 'info-popup'
           },templates.popups.productsProductInfo));
           this.infoProductPopup.show();
       }
   },
   showCartInfoPopup: function(element, item){
       if(this.cartInfoPopup)
            this.cartInfoPopup.close();       
       this.cartInfoPopup = Ext.create('widget.simplepopup',Ext.apply({
           ownerEl: element,
           id: 'products-carts-info-popup',
           cls: 'info-popup',
           data: item.data,
           alignPosition: 'bl-t'
       },templates.popups.cartInfoPopup));
       this.cartInfoPopup.show();  
   },
   showProductPopup: function(element, item){
       if(this.productPopup)
            this.productPopup.close();       
       this.productPopup = Ext.create('widget.simplepopup',Ext.apply({
           ownerEl: element,
           id: 'products-info-popup',
           cls: 'info-popup',
           layout: {
               type: 'vbox',
               align: 'stretch' 
           },
           alignPosition: 'c-c',
           items: [Ext.apply({
               data: item.data
           },templates.popups.productPopup),Ext.apply({
               xtype: 'button'
           },templates.popups.productPopupButton)]
       },templates.popups.productPopup));
       this.productPopup.show();
   },
   showBrandsPopup: function(element){
       if(this.brandsPopup)
            this.brandsPopup.close();       
       this.brandsPopup = Ext.create('widget.brandspopup',Ext.apply({
           ownerEl: element,
           alignPosition: 'tr-br',
           store: Ext.getStore('Brands'),
           listeners: {
               itemclick: function(me,item,node,index,e){
                   Ext.getStore('Brands').each(function(storeitem){
                       storeitem.set('selected',false);
                   });
                   item.set('selected',true);
                   this.productsView.setBrandText(item.get('name'));
                   this.brandsPopup.close();
               },
               scope: this
           }
       },templates.popups.brands));
       this.brandsPopup.show();
   },
   stopAnimation: function(){
       this.productsView.stopAnimation();
   }
});
