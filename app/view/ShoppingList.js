Ext.define('Vzabote.view.ShoppingList',{
    extend: 'Ext.panel.Panel',
    alias: 'widget.shoppingList',
    id: 'shoppingList',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    initComponent: function(){
        this.callParent();

        this.minprice = 0;
        this.maxprice = 0;
        this.count = 0;

        this.cartList = Ext.create('Vzabote.view.ScrollableDataView',Ext.apply({
            store: this.store,
            cardParent: this,
            id: 'shoppingList-productstypes',
            scrollableName: 'Список покупок'
        },templates.shoppingList.dataview));

        this.add(this.cartList);

        this.navPanel = Ext.create('Vzabote.view.NavigationPanel',{
            step: 'cart',
            dock: 'bottom'
        });
        this.addDocked(this.navPanel);
        this.on('activate',function(){
            this.navPanel.updateButtons();
        },this);

        this.saveloadPanel = Ext.create('Ext.container.Container',{
            layout: {
                type: 'vbox',
                align: 'right'
            },
            flex : 6,
            items: [
                Ext.apply({
                    xtype: 'button',
                    href: '#/',
                    hrefTarget: '_self',
                    id: 'shopinglist-saveloadbutton'
                },templates.shoppingList.saveLoadButton)
            ]
        });
        
        this.inTotal = Ext.create('Ext.panel.Panel',{
            id: 'shoppingList-intotal-panel',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [
                Ext.apply({
                    flex: 6,
                    id: 'shoppingList-intotal-info',
                    data: {
                        minprice: this.minprice.toFixed(2),
                        maxprice: this.maxprice.toFixed(2),
                        count: this.count
                    }
            },templates.shoppingList.inTotal),
            this.saveloadPanel]
        });
        this.add(this.inTotal);
    },

    reCount: function(){
        this.minprice = 0;
        this.maxprice = 0;
        this.count = 0;
        this.store.each(function(item){
            this.minprice+=item.get('minprice');
            this.maxprice+=item.get('maxprice');
            this.count += 1;
        }, this);
    },
    
    updateInTotal: function(){
        this.reCount();
        this.inTotal.query('#shoppingList-intotal-info')[0].update( {
            minprice: this.minprice,
            maxprice: this.maxprice,
            count: this.count
        });
    }
});

