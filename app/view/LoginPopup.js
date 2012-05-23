Ext.define('Vzabote.view.LoginPopup',{
    extend: 'Vzabote.view.SimplePopup',
    alias: 'widget.loginpopup',
    width: 440,
    height: 300,
    closeOnViewportClick: false,
    layout: {
        type: 'vbox',
        align: 'stretch'   
    },    
    initComponent: function(){
        this.callParent();
        this.add({
            xtype: 'panel',
            cls: 'login-tab-panel',
            flex: 1,
            layout: {
                type: 'hbox',
                align: 'stretch',
                pack: 'center'
            },
            items: [
                Ext.apply({
                  id: 'login-tabs',
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
            
        });
        this.cardPanel = this.add({
            xtype: 'panel',
            layout: 'card',
            id: 'login-card',
            flex: 3            
        });
        
        //Login form
        this.loginForm = Ext.create('Ext.form.Panel',{
                    xtype: 'form',
                    flex: 5,
                    id: 'login-form',
                    items: [
                    Ext.apply({},templates.login.neironLogin),
                    {
                        name: 'email',
                        xtype: 'textfield',
                        emptyText: 'Электронная почта'
                    },{
                        name: 'password',
                        xtype: 'textfield',
                        // inputType: 'password', 
                        emptyText: 'Пароль',                        
                    },
                    {
                        name: 'hide-password',
                        xtype: 'checkbox',
                        boxLabel: 'Скрывать ввод пароля'
                    },
                    {
                        xtype: 'button',
                        text: 'Вход',
                        handler: function(){
                            this.loginForm.submit();
                        },
                        scope: this
                    }
                        
                    ]
                })
        this.loginBy = Ext.create('Ext.form.Panel',Ext.apply({
            flex: 4
        },templates.login.loginBy));
        this.loginCardItem = Ext.create('Ext.panel.Panel',{
            layout: {
                type: 'hbox',
                align: 'stretch',
                pack: 'center'
            },
            items: [
                this.loginForm,
                this.loginBy
            ]
        });
        
        //Register form
        this.regCardItem = Ext.create('Ext.form.Panel',{
                    xtype: 'form',
                    flex: 5,
                    id: 'reg-form',
                    items: [
                    Ext.apply({},templates.login.neironReg),
                    {
                        name: 'email',
                        xtype: 'textfield',
                        emptyText: 'Электронная почта'
                    },{
                        name: 'password',
                        xtype: 'textfield',
                        // inputType: 'password', 
                        emptyText: 'Пароль',                        
                    },
                    {
                        name: 'hide-password',
                        xtype: 'checkbox',
                        boxLabel: 'Скрывать ввод пароля'
                    },
                    {
                        xtype: 'button',
                        text: 'Зарегистрироваться',
                        handler: function(){
                            this.regCardItem.submit();
                        },
                        scope: this
                    }
                        
                    ]
                })
        
        this.cardPanel.add(this.loginCardItem);
        this.cardPanel.add(this.regCardItem);
        
        this.on('show',function(){
            this.alignTo(Ext.getBody(),'tr-tr');
        },this);
        
    }
    
})
