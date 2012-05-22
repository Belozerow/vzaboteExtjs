Ext.define('Vzabote.view.LoginPopup',{
    extend: 'Vzabote.view.SimplePopup',
    alias: 'widget.loginpopup',
    width: 500,
    height: 500,
    layout: {
        type: 'vbox',
        align: 'stretch'   
    },
    initComponent: function(){
        // this.add()
        this.callParent();
    },
    items: [{
            xtype: 'panel',
            flex: 1,
            layout: {
                type: 'hbox',
                align: 'stretch',
                pack: 'center'
            },
            items: [
                Ext.apply({
                  flex: 3  
                },templates.login.tabs),
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
                            id: 'login-button-on-popup',
                        },templates.viewport.login)
                    ]
                }
            ]
            
        }]
    
})
