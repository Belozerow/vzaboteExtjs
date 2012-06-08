Ext.define('Vzabote.view.ShopChoice',{
    extend: 'Ext.panel.Panel',
    alias: 'widget.shopChoice',
    id: 'shopChoice',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    initComponent: function(){
        this.callParent();

        
        this.cartList = Ext.create('Vzabote.view.ScrollableDataView',Ext.apply({
            store: this.store,
            cardParent: this,
            id: 'shopsList'
        },templates.shoppingList.dataview));

        this.add(this.cartList);

        this.navPanel = Ext.create('Vzabote.view.NavigationPanel',{
            step: 'shops',
            dock: 'bottom'
        });
        this.addDocked(this.navPanel);
        this.on('activate',function(){
            this.navPanel.updateButtons();
        },this);

    }
});