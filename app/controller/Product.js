Ext.define('Vzabote.controller.Product',{
   extend: 'Ext.app.Controller',
   productsY: -100,
   cartsY: -300,
   productsIsShown: false,
   cartIsShown: false,
   animDuration: 700,
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
   saveStateAfterLayout: function(){
        var activeItem = this.productsView.getTargetEl();
        if(this.productsIsShown){
            activeItem.setY(this.productsY);
        }
        if(this.cartIsShown){
            activeItem.setY(this.cartsY);
            var inner = Ext.get(this.productsView.getInner());
            inner.setHeight(this.newHeight);
        }
   },
   index: function(query){
       var cardPanel = this.getCardPanel();
       if(this.productsIsShown){
           this.animateProductsHide(function(){
                  this.productsIsShown = false;
                  this.productsView.hideProducts(function(){
                      this.getProductTypesSlider().enableDataView(query.id);
                      this.productsView.cngButton('main');    
                  },this);
           });           
       }
       if(this.cartIsShown){
           this.animateCartHide(function(){
                  this.cartIsShown = false;
                  this.productsView.hideCartContent();
                  this.productsView.cngButton('main');
                  this.productsView.enableCartsDataView();    
           });
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
                    animDuration: this.animDuration,
                    itemsHeight: this.getCardPanel().getHeight()/2,
                    listeners: {
                        productsData: {
                            itemclick: function(me,item,node,index,e){
                                var el = Ext.get(e.getTarget());
                                if(el.hasCls('loupe')){
                                     this.showProductPopup(node,item);
                                }
                                
                                // Добавление товара в корзину
                                var uStore = Ext.getStore('UserCart');
            					uStore.addItem(item.raw);
            					
            					// Обновляем индикатор в header
            					this.getViewportTopPanel().update({});
                                
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
                            click: function(){
                                this.showBrandsPopup();
                            },
                            scope: this
                        },
                        scope: this
                    }
                });
                this.productsView.on('afterlayout',this.saveStateAfterLayout,this);
                this.productsView.on('deactivate',function(){
                    this.stopAnimation();
                    this.productsIsShown =  false;
                    this.cartIsShown = false;
                    this.productsView.destroy();                    
                },this);
            }
            cardPanel.layout.setActiveItem(this.productsView);
       }
   },
   product: function(query){
       
       if(!this.productsView)
            this.index();
       
       Vzabote.util.onEventOrNow(this.store,'load',this.store.isLoading,true,function(){
           this.productsView.updateSliderInfo({name: this.store.getById(query.id).get('name')});
       },this,{single: true});
       this.getProductTypesSlider().disableDataView(query.id);
       this.productsView.showProducts(function(){
           this.animateProductsShow();       
           this.productsView.cngButton('products');
           this.productsIsShown = true;
       },this);       
   },
   
   carts: function(query){
        if(!this.productsView)
            this.index();
        var cart = Ext.getStore('Carts').getById(parseInt(query.id));
        this.productsView.disableCartsDataView(cart);
        this.productsView.showCartContent(cart);
        this.animateCartShow(query.id);
   },
   animateCartShow: function(cart){
        var carts = this.getCartsDataView();
        Vzabote.util.onEventOrNow(carts,'viewready','viewReady',undefined,function(){
            this.cartsY = - carts.getEl().getY() - carts.getEl().down('.products-carts-dataview').getHeight()/3;
            var activeItem = this.productsView.getTargetEl(),
              newY = this.cartsY;
              
            this.prevY = activeItem.getY();
            activeItem.animate({
                  to: {y: newY},
                  duration: this.animDuration,
                  listeners: {
                      afteranimate: function(){
                            this.cartIsShown = true;
                      },
                      scope: this
                  }
            });
            var inner = Ext.get(this.productsView.getInner()),
                newHeight = inner.getHeight()-newY;
            inner.animate({
                  to: {height: newHeight},
                  duration: this.animDuration,
                  listeners: {
                      afteranimate: function(){
                          this.newHeight = newHeight;
                      },
                      scope: this
                  }
            });
        },this,{single: true});
   },
   animateCartHide: function(callback){
      var activeItem = this.productsView.getTargetEl();
      
      activeItem.animate({
          to: {y: this.prevY},
          duration: this.animDuration,
          listeners: {
              afteranimate: callback||Ext.emptyFn,
              scope: this
          }
      });
      var inner = Ext.get(this.productsView.getInner()),
          newHeight = this.productsView.getTargetEl().getHeight();
      
      inner.animate({
          to: {height: newHeight},
          duration: this.animDuration,
          listeners: {
              afteranimate: function(){
                  this.newHeight = newHeight;
              },
              scope: this
          }
      });
   },
   animateProductsShow: function(){
      this.productsY = -this.getProductTypesSlider().getDataViewHeight()/2;
      var activeItem = this.productsView.getTargetEl(),
          newY = this.productsY;
      this.prevY = activeItem.getY();
      activeItem.animate({
          to: {y: newY},
          duration: this.animDuration,
          listeners: {
              afteranimate: function(){
                 this.productsIsShown = true;
                 this.showProductHintPopup();   
              },
              scope: this
          }
      });
   },
   animateProductsHide: function(callback){
      var activeItem = this.productsView.getTargetEl();
      activeItem.animate({
          to: {y: this.prevY},
          duration: this.animDuration,
          listeners: {
              afteranimate: callback||Ext.emptyFn,
              scope: this
          }
      });
   },
   showCategoryHintPopup: function(){
       if(!this.productsIsShown){
           this.mon(this.getProductTypesSlider().dataView,'show',function(){
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
               id: 'products-choose-info-popup',
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
           id: 'products-choose-info-popup',
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
           id: 'products-choose-info-popup',
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
       var inner = Ext.get(this.productsView.getInner());
       if(inner.getActiveAnimation())
           inner.getActiveAnimation().end();
       
       var activeItem = this.productsView.getTargetEl();
       if(activeItem.getActiveAnimation())
            activeItem.getActiveAnimation().end();
       
   }
});
