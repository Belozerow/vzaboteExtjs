Ext.define('Vzabote.controller.ShoppingList',{
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
            '#shoppingList-productstypes': {
                itemclick: function(me,item,node,index,e){
                    sls = this.getShoppingListScroller(); 
                    if(Ext.get(e.getTarget()).hasCls('dec-button'))
                    {
                        if (item.data.amount > 0) item.data.amount -= item.data.amount_modificaton_step;
                    }
                    if (Ext.get(e.getTarget()).hasCls('inc-button'))
                    {
                         item.data.amount += item.data.amount_modificaton_step;
                    }
                    sls.dataView.refreshNode(index);
                }
            }
       });
   },

   index: function(query){
       
       Vzabote.bc.setItem('cart',{
           back: {url: (Vzabote.bc.getItem('products').url||'#/index'), text: 'Выбор товара'},
           forward: {url: '#/shops', text: 'Выбор магазина'},
           url: '#/cart'
       });
       var cardPanel = this.getCardPanel();
       if(cardPanel.layout.getActiveItem().xtype!='shoppingList'){
            this.getController('Viewport').closeAllWindows();
            var store = Ext.getStore('UserCart');
//            if(store.getCount()==0)
//                store.load();
            if(!this.shoppingListView||this.shoppingListView.isDestroyed){
                this.shoppingListView = Ext.create('Vzabote.view.ShoppingList',{
                    store: store,
                    animDuration: this.animDuration,
                    listeners: {
                        cartList: {
                            itemclick: function(me,item,node,index,e){
                                var el = Ext.get(e.getTarget());
                                if(el.hasCls('loupe')){
                                     this.showProductPopup(node,item);
                                }
                            },
                            scope: this
                        },
//                        viewready : this.showCountChangePopup, 
//                        activate: this.intotalRecount,
                        activate: this.onViewActivate,
                        scope: this
                    }
                });
            }
            cardPanel.layout.setActiveItem(this.shoppingListView);
       }
   },  
    
   showCountChangePopup: function(){
        if (this.shoppingListView.count > 0 && this.popupIsShown != true)
        {
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
            this.popupIsShown = true;
        }
   },
   
    showProductPopup: function(element, item){
        if(this.productPopup)
            this.productPopup.close();
        this.productPopup = Ext.create('widget.simplepopup',Ext.apply({
            ownerEl: element,
            id: 'products-info-popup',
            cls: 'info-popup',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            alignPosition: 'c-c',
            items: [
                Ext.apply({
                    data: item.data
                },templates.popups.productPopup)
            ]
        },templates.popups.productPopup));
        this.productPopup.show();
    },
   
   intotalRecount: function(){
            this.shoppingListView.updateInTotal();
   },
   
   onViewActivate: function(){
        this.intotalRecount();
        this.showCountChangePopup();
   }
});

