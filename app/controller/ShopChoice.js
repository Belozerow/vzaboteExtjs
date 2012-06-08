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
       if(cardPanel.layout.getActiveItem().xtype!='shopsList'){
            this.getController('Viewport').closeAllWindows();
            var store = Ext.getStore('Shops');
            
            if(!this.shopsListView||this.shopsListView.isDestroyed){
                this.shopsListView = Ext.create('Vzabote.view.ShopChoice',{
                    store: store,
                    animDuration: this.animDuration,
                    listeners: {
                        cartList: {
                            itemclick: function(me,item,node,index,e){
                                /*
                            	var el = Ext.get(e.getTarget());
                                if(el.hasCls('loupe')){
                                     this.showProductPopup(node,item);
                                }
                                */
                            },
                            scope: this
                        },

//                        activate: this.onViewActivate,
                        scope: this
                    }
                });
            }
            cardPanel.layout.setActiveItem(this.shopsListView);
       }
   }
   
});

