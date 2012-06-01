Ext.define('Vzabote.controller.ShoppingList',{
   extend: 'Ext.app.Controller',
   productsY: -100,
   cartsY: -300,
   productsIsShown: false,
   cartIsShown: false,
   animDuration: 700,
   refs: [
   {
       ref: 'cardPanel',
       selector: '#cardpanel'
   }],
   init: function(){
       this.control({

       });
   },

   index: function(query){
       var cardPanel = this.getCardPanel();
       
       if(cardPanel.layout.getActiveItem().xtype!='shoppingList'){
            this.getController('Viewport').closeAllWindows();
            var store = Ext.getStore('ProductTypes');
            if(store.getCount()==0)
                store.load();
            if(!this.productsView||this.productsView.isDestroyed){
                this.productsView = Ext.create('Vzabote.view.ShoppingList',{
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
            }
            cardPanel.layout.setActiveItem(this.productsView)
       }
   }
});
