Ext.define('Vzabote.controller.ShopChoice',{
   extend: 'Ext.app.Controller',
   animDuration: 700,
   popupIsShown: false,
   refs: [
   {
       ref: 'cardPanel',
       selector: '#cardpanel'
   },
   {
       ref: 'shopsList',
       selector: '#shopsList'
   }],
   init: function(){
       this.control({
            '#shopsList': {
                itemclick: function(me,item,node,index,e){
                	console.log('controller shopChoice %o %o %o %o %o',me,item,node,index,e);
                }
            },
            
            '#buttons-box-id #button-reserve-products': {
            	click: function(){
            		alert('Бронируем товары!');
            	}
            },
            
            '#buttons-box-id #send-print-list': {
            	click: function(){
            		alert('Отправляем и печатаем список');
            	}
            },
            
            '#button-shop-way': {
            	click: function(){
            		alert('Купить по пути домой?');
            	}
            },
            
            '#button-etc-categories': {
            	click: function(){
            		alert('Еще..');
            	}
            }
       
       
       });
   },

   index: function(query){
       
       Vzabote.bc.setItem('shops',{
           back: {url: (Vzabote.bc.getItem('cart').url||'#/index'), text: 'Список покупок'},
           forward: {url: '', text: ''},
           url: '#/shops'
       });
       var cardPanel = this.getCardPanel();
       if(cardPanel.layout.getActiveItem().xtype!='shopChoice'){
            this.getController('Viewport').closeAllWindows();
            var store = Ext.getStore('Shops');
            
            if(!this.shopsView||this.shopsView.isDestroyed){
                this.shopsView = Ext.create('Vzabote.view.ShopChoice',{
                    store: store
                });
            }
            cardPanel.layout.setActiveItem(this.shopsView);
       }
   }
   
});

