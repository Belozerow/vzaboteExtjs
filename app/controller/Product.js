Ext.define('Vzabote.controller.Product',{
   extend: 'Ext.app.Controller',
   productsY: -100,
   productsIsHidden: false,
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
        if(this.productsIsHidden){
            var cardPanel = this.getCardPanel(),
                activeItem = cardPanel.layout.getActiveItem().getTargetEl();
            activeItem.setY(this.productsY)
        }
   },
   index: function(query){
       var cardPanel = this.getCardPanel();
       if(this.productsIsHidden){
           this.animateProductsShow(function(){
                  this.productsIsHidden = false;
                  this.productsView.hideProducts(function(){
                      this.getProductTypesSlider().enableDataView(query.id)
                      this.productsView.cngButton('main');    
                  },this);
           });           
       }
       if(cardPanel.layout.getActiveItem().xtype!='products'){
            this.getController('Viewport').closeAllWindows();
            var store = Ext.getStore('ProductTypes');
            if(store.getCount()==0)
                store.load();
            if(!this.productsView){
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
            }
            cardPanel.layout.setActiveItem(this.productsView)
       }
       // this.productsIsHidden = false;
   },
   product: function(query){
       
       if(!this.productsView)
            this.index();
       this.getProductTypesSlider().disableDataView(query.id)
       this.productsView.showProducts(function(){
           this.animateProductsHide();       
           this.productsView.cngButton('products');
           this.productsIsHidden = true;
       },this);       
   },
   animateProductsHide: function(){
      // this.productsIsHidden = true;
      
      var cardPanel = this.getCardPanel(),
                      activeItem = cardPanel.layout.getActiveItem().getTargetEl()
                      newY = this.productsY;
      this.prevY = activeItem.getY();
      activeItem.animate({
          to: {y: newY},
          duration: this.animDuration,
          listeners: {
              afteranimate: function(){
                 this.productsIsHidden = true;   
              },
              scope: this
          }
      })
      
      
   },
   animateProductsShow: function(callback){
      
      var cardPanel = this.getCardPanel(),
                      activeItem = cardPanel.layout.getActiveItem().getTargetEl();      
      activeItem.animate({
          to: {y: this.prevY},
          duration: this.animDuration,
          listeners: {
              afteranimate: callback,
              scope: this
          }
      })
      
   }
});