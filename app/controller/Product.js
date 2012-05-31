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
   }],
   init: function(){
       this.control({

       });
   },
   saveStateAfterLayout: function(){
        if(this.productsIsShown){
            var cardPanel = this.getCardPanel(),
                activeItem = cardPanel.layout.getActiveItem().getTargetEl();
            activeItem.setY(this.productsY)
        }
        if(this.cartIsShown){
            var cardPanel = this.getCardPanel(),
                activeItem = cardPanel.layout.getActiveItem().getTargetEl();
            activeItem.setY(this.cartsY)
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
            
            var store = Ext.getStore('ProductTypes');
            
            if(store.getCount()==0){
                this.mon(store,'load',function(){
                    this.showCategoryHintPopup();
                },this,{single: true})    
                store.load();
            }
                        
            if(!this.productsView||this.productsView.isDestroyed){
                
                this.productsView = Ext.create('Vzabote.view.Products',{
                    store: store,
                    animDuration: this.animDuration,
                    listeners: {
                        productsData: {
                            itemclick: function(){
                                console.log('add to cart')
                            }
                        }
                    }
                });
                this.productsView.on('afterlayout',this.saveStateAfterLayout,this);
                this.productsView.on('deactivate',function(){
                    this.productsView.destroy();
                    this.productsIsShown =  false;
                    this.cartIsShown = false;
                },this)
            }
            cardPanel.layout.setActiveItem(this.productsView)
       }
   },
   product: function(query){
       
       if(!this.productsView)
            this.index();
       this.getProductTypesSlider().disableDataView(query.id)
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
        this.productsView.showCartContent(cart)
        this.animateCartShow(query.id);
   },
   animateCartShow: function(cart){
      var cardPanel = this.getCardPanel(),
              activeItem = cardPanel.layout.getActiveItem().getTargetEl()
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
      })
      var inner = Ext.get(this.productsView.getInner());
      inner.animate({
          to: {height: inner.getHeight()-newY},
          duration: this.animDuration
      })
   },
   animateCartHide: function(callback){
      var cardPanel = this.getCardPanel(),
                      activeItem = cardPanel.layout.getActiveItem().getTargetEl();      
      activeItem.animate({
          to: {y: this.prevY},
          duration: this.animDuration,
          listeners: {
              afteranimate: callback||Ext.emptyFn,
              scope: this
          }
      })
      var inner = Ext.get(this.productsView.getInner());
      inner.animate({
          to: {height: this.productsView.getTargetEl().getHeight()},
          duration: this.animDuration
      })
   },
   animateProductsShow: function(){
      var cardPanel = this.getCardPanel(),
                      activeItem = cardPanel.layout.getActiveItem().getTargetEl()
                      newY = this.productsY;
      this.prevY = activeItem.getY();
      activeItem.animate({
          to: {y: newY},
          duration: this.animDuration,
          listeners: {
              afteranimate: function(){
                 this.productsIsShown = true;   
              },
              scope: this
          }
      })
   },
   animateProductsHide: function(callback){
      
      var cardPanel = this.getCardPanel(),
                      activeItem = cardPanel.layout.getActiveItem().getTargetEl();      
      activeItem.animate({
          to: {y: this.prevY},
          duration: this.animDuration,
          listeners: {
              afteranimate: callback||Ext.emptyFn,
              scope: this
          }
      })
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
                   cls: 'info-popup',
                },templates.popups.productsChooseInfo));
                this.infoPopup.show();    
           },this,{single: true})    
       }   
   }
});