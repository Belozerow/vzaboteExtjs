Ext.define('Vzabote.controller.Product',{
   extend: 'Ext.app.Controller',
   refs: [{
       ref: 'cardPanel',
       selector: '#cardpanel'
   }],
   init: function(){
       this.control({
          'scrollabledataview': {
              afterrender: function(){
                  console.log('ads')
              }
          }
          
       });
   },
   index: function(query){
       var cardPanel = this.getCardPanel();
       if(cardPanel.layout.getActiveItem().xtype!='products'){
            this.getController('Viewport').closeAllWindows();
            var store = Ext.getStore('Products');
            if(store.getCount()==0)
            store.load();
            if(!this.productsView){
                this.productsView = Ext.create('Vzabote.view.Products',{
                    store: store
                });
            }
            cardPanel.layout.setActiveItem(this.productsView)
       }
   }   
});