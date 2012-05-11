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
                    flex: 1,
                    layout: {
                        type: 'hbox',
                        pack: 'end'
                    },
                    items: [
                        Ext.apply({
                            xtype: 'button',
                        },templates.viewport.login)
                    ]
                },
            ]
            // listeners: {
                // el:{
                    // click: function(e,node){
                        // this.fireEvent('tab-active',node.id);
                    // },
                    // scope: this
                // }                
            // }
        })
        this.cards = this.add({
            xtype: 'panel',
            id: 'cardpanel',
            layout: 'card',
            items: [{
                xtype: 'mainpage'
            },{
                html: 'something'
            },{
                html: 'something else'
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
                  flex: 3  
                },templates.viewport.footer),
                {
                    xtype: 'panel',
                    flex: 1,
                    layout: {
                        type: 'hbox',
                        pack: 'end'
                    },
                    items: [
                        Ext.apply({
                            xtype: 'button',
                        },templates.viewport.addshop)
                    ]
                },
                
            ]
        });
    }
})
