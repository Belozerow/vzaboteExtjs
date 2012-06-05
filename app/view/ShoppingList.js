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

        this.productTypesPanel = Ext.create('Vzabote.view.ScrollableDataView',Ext.apply({
            store: this.store,
            cardParent: this,
            id: 'shoppingList-productstypes'
        },templates.shoppingList.dataview));

        this.add(this.productTypesPanel);

        this.mainpageBackButton = Ext.create('Ext.button.Button',Ext.apply({
            xtype: 'button',
            href: '#/index',
            hrefTarget: '_self',
            id: 'shoppingList-backbutton',
            cls: 'back-button'
        },templates.shoppingList.backbutton));
        this.productsBackButton = Ext.create('Ext.button.Button',Ext.apply({
            xtype: 'button',
            href: '#/products',
            hrefTarget: '_self',
            id: 'shoppingList-productsbackbutton',
            cls: 'back-button'
        },templates.shoppingList.backbuttonproducts));
        this.bottomPanel = Ext.create('Ext.panel.Panel',{xtype: 'panel',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                pack: 'start'
            },
            items: [
                this.mainpageBackButton,
                this.productsBackButton,
                Ext.apply({
                    xtype: 'button',
                    href: '#/products',
                    hrefTarget: '_self',
                    id: 'shoppingList-forwardbutton',
                    cls: 'forward-button'
                },templates.shoppingList.forwardbutton)
            ]
        });
        this.addDocked(this.bottomPanel);
        this.cngButton('main');

        this.inTotal = Ext.create('Ext.panel.Panel',{
            //cls: 'categories-panel',
            id: 'shoppingList-intotal-panel',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                Ext.apply({
                    //flex: 2,
                    //height: 105,
                    id: 'shoppingList-intotal-info',
                    data: {
                        minprice: this.minprice.toFixed(2),
                        maxprice: this.maxprice.toFixed(2),
                        count: this.count
                    }
            },templates.shoppingList.inTotal)]
        });
        this.add(this.inTotal);

        this.saveloadPanel = Ext.create('Ext.container.Container',{
            layout: {
                type: 'vbox',
                align: 'right'
            },
            items: [
                Ext.apply({
                    xtype: 'button',
                    href: '#/',
                    hrefTarget: '_self',
                    id: 'shopinglist-saveloadbutton'
                },templates.shoppingList.saveLoadButton)
            ]
        });
        this.add(this.saveloadPanel);
    },

    cngButton: function(type){
        switch(type){
        case 'main':    
            this.mainpageBackButton.show();
            this.productsBackButton.hide();
            break;
        case 'products':
            this.mainpageBackButton.hide();
            this.productsBackButton.show();
            break;
        }
    },
    
    refresh: function(){
        this.productTypesPanel.refresh();
        //this.productsList.refresh();       
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
            minprice: this.minprice.toFixed(2),
            maxprice: this.maxprice.toFixed(2),
            count: this.count
        });
    }
});

