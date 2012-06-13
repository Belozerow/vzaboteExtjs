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
                    /*sls = this.getShoppingListScroller(); 
                    if(Ext.get(e.getTarget()).hasCls('dec-button'))
                    {
                        if (item.data.amount > 0) item.data.amount -= item.data.amount_modificaton_step;
                    }
                    if (Ext.get(e.getTarget()).hasCls('inc-button'))
                    {
                         item.data.amount += item.data.amount_modificaton_step;
                    }
                    sls.dataView.refreshNode(index);*/
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

