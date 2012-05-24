Ext.define('Vzabote.view.Viewport',{
    extend: 'Ext.container.Viewport',
    id: 'viewport',
    requires: [
        'Vzabote.view.MainPage'
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
            flex: 1,
            layout: {
                type: 'hbox',
                align: 'stretch',
                pack: 'center'
            },
            items: [
                Ext.apply({
                  flex: 3  
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
                            id: 'viewport-loginbutton',
                        },templates.viewport.login)
                    ]
                },
            ]
        })
        this.cards = this.add({
            xtype: 'panel',
            id: 'cardpanel',
            layout: 'card',
            items: [{
                xtype: 'mainpage'
            }],
            flex: 4
        })
        this.footer = this.add({
            xtype: 'panel',
            id: 'footer',
            flex: 1,
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
                            xtype: 'button',
                        },templates.viewport.addshop)
                    ]
                },
                
            ]
        });
    }
})
