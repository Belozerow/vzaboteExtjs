Ext.define('Vzabote.controller.ModalMap',{
   extend: 'Ext.app.Controller',
   animDuration: 700,
   popupIsShown: false,
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
       
//       Vzabote.bc.setItem('cart',{
//           back: {url: (Vzabote.bc.getItem('products').url||'#/index'), text: 'Выбор товара'},
//           forward: {url: '#/shops', text: 'Выбор магазина'},
//           url: '#/cart'
//       });
       var cardPanel = this.getCardPanel();
       if(cardPanel.layout.getActiveItem().xtype!='modalmap'){
            this.getController('Viewport').closeAllWindows();
            var store = Ext.getStore('UserCart');

            if(!this.mapView||this.mapView.isDestroyed){
                var map = Ext.create('Vzabote.view.ModalMap',{});
                map.show();
            }
            cardPanel.layout.setActiveItem(this.mapView);
       }
   }
});

