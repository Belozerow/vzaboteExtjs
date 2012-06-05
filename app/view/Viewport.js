Ext.define('Vzabote.view.Viewport',{
    extend: 'Ext.container.Viewport',
    id: 'viewport',
    requires: [
        'Vzabote.view.MainPage',
        'Vzabote.store.UserCart'
    ],
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    initComponent: function(){
        this.callParent();
        this.header = this.add({
            xtype: 'panel',
            id: 'header',
            //flex: 1,
            height: 76,
            layout: {
                type: 'hbox',
                align: 'stretch',
                pack: 'center'
            },
            items: [
                Ext.apply({
                  flex: 3,
                  id: 'top-panel',
                  data: Vzabote.bc.getData()
                },templates.viewport.header),
                {
                    xtype: 'panel',
                    cls: 'login-panel',
                    id: 'viewport-loginpanel',
                    flex: 1,
                    layout: {
                        type: 'hbox',
                        pack: 'end'
                    },
                    items: [
                        Ext.apply({
                            xtype: 'button',
                            id: 'viewport-loginbutton'
                        },templates.viewport.login)
                    ]
                }
            ]
        });
        this.footer = Ext.create('Ext.panel.Panel',{
            xtype: 'panel',
            id: 'footer',
            dock: 'bottom',
            //flex: 1,
            height: 66,
            layout: {
                type: 'hbox',
                align: 'stretch',
                pack: 'center'
            },
            items: [
                Ext.apply({
                  flex: 3,
                  id: 'viewport-copyright'  
                },templates.viewport.footer),
                {
                    xtype: 'panel',
                    cls: 'add-shop-panel',
                    id: 'viewport-addshop',
                    flex: 1,
                    layout: {
                        type: 'hbox',
                        pack: 'end'
                    },
                    items: [
                        Ext.apply({
                            id: 'viewport-addshop-button',
                            xtype: 'button'
                        },templates.viewport.addshop)
                    ]
                }
                
            ]
        });
        this.cards = this.add({
            xtype: 'panel',
            id: 'cardpanel',
            layout: 'card',
            cls: 'cardpanel',
            items: [{
                xtype: 'mainpage'
            }],
            dockedItems: this.footer
        });
    }
});
