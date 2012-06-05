Ext.define('Vzabote.controller.ShoppingList',{
   extend: 'Ext.app.Controller',
   animDuration: 700,
   refs: [
   {
       ref: 'cardPanel',
       selector: '#cardpanel'
   },
   {
       ref: 'shoppingListScroller',
       selector: '#shoppingList-productstypes'
   }],
   init: function(){
       this.control({
            '#shoppingList-productstypes': {
                itemclick: function(me,item,node,index,e){
                //console.log(Ext.get(e.getTarget()))
                    if(Ext.get(e.getTarget()).hasCls('dec-button'))
                    {
                        if (item.data.amount > 0) item.data.amount -= item.data.amount_modificaton_step;
                        sls = this.getShoppingListScroller();
                    }
                    if (Ext.get(e.getTarget()).hasCls('inc-button'))
                    {
                         item.data.amount += item.data.amount_modificaton_step;
                         sls = this.getShoppingListScroller();
                         sls.dataView.refreshNode(index);
                    }
                }
            }
       });
   },

   index: function(query){
       var cardPanel = this.getCardPanel();
       if(cardPanel.layout.getActiveItem().xtype!='shoppingList'){
            this.getController('Viewport').closeAllWindows();
            //var store = Ext.getStore('ProductTypes');
            var store = Ext.getStore('UserCart');
//            if(store.getCount()==0)
//                store.load();
            if(!this.shoppingListView||this.shoppingListView.isDestroyed){
                this.shoppingListView = Ext.create('Vzabote.view.ShoppingList',{
                    store: store,
                    animDuration: this.animDuration,
                    listeners: {
                        productsData: {
                            itemclick: function(){
                                console.log('add to cart');
                            }
                        },
                        viewready : this.showCountChangePopup, 
                        scope: this
                    }
                });
            }
            cardPanel.layout.setActiveItem(this.shoppingListView);
       }
   },   
   showCountChangePopup: function(){
            var element = this.getShoppingListScroller().getEl().down('.item-count');
            if(this.countPopup)
                this.countPopup.close();
            this.countPopup = Ext.create('widget.simplepopup',Ext.apply({
               ownerEl: element,
               id: 'shoppinglist-change-count-popup',
               alignPosition: "t-b?"
               //cls: 'count-popup'
            },templates.popups.countChangePopup));
            this.countPopup.show();    
   }
});
