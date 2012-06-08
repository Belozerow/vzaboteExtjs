Ext.define('Vzabote.view.LoginPopup',{
    extend: 'Vzabote.view.SimplePopup',
    alias: 'widget.loginpopup',
    id: 'loginpopup',
    width: 440,
    height: 300,
    closeOnViewportClick: false,
    layout: {
        type: 'vbox',
        align: 'stretch'   
    },
    authorized: true,
    initComponent: function(){
        this.callParent();
        if(this.authorized){
            this.authorizedView();
        }
        else{
            this.notAuthorizedView();
        }
        this.on('show',function(){
            this.alignTo(Ext.getBody(),'tr-tr');
        },this);
        
    },
    authorizedView: function(){
        this.addDocked({
            xtype: 'container',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [Ext.apply({
                flex: 1
            },templates.login.authtitle),Ext.apply({
                xtype: 'button',
                id: 'loginpopup-logout-button'
            },templates.login.logout),Ext.apply({
                xtype: 'button',
                id: 'loginpopup-login-button'
            },templates.viewport.login)]
        });
        this.userChangeForm = Ext.create('Ext.form.Panel',{
            defaultType: 'textfield',
            items: [{
                disabled: true,
                value: 'user@example.com'
            },{
                value: '+7 863 321 43 32'
            },{
                emptyText: 'Новый пароль?',
                name: 'password',
            },{
                name: 'hide-password',
                xtype: 'checkbox',
                boxLabel: 'Скрывать ввод пароля'
            }]
        });
        this.add(this.userChangeForm);
        
        this.cartsList = Ext.create('Ext.view.View',Ext.apply({
            store: Ext.getStore('Carts'),
            itemSelector: '.loginpopup-cart-item'
        },templates.login.carts));        
        this.add(this.cartsList);
        
        this.add(Ext.apply({
            xtype: 'button',
            id: 'loginpopup-close-button'
        },templates.login.close));
    },
    notAuthorizedView: function(){
        this.add({
            xtype: 'panel',
            id: 'loginpopup-tabpanel',
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
                    id: 'loginpopup-button-panel',
                    flex: 1,
                    layout: {
                        type: 'hbox',
                        pack: 'end'
                    },
                    items: [
                        Ext.apply({
                            xtype: 'button',
                            id: 'loginpopup-login-button'
                        },templates.viewport.login)
                    ]
                }
            ]
            
        });
        this.cardPanel = this.add({
            xtype: 'panel',
            id: 'loginpopup-cards',
            layout: 'card',
            flex: 3            
        });
        
        //Login form
        this.loginForm = Ext.create('Ext.form.Panel',{
                    xtype: 'form',
                    flex: 5,
                    id: 'loginpopup-loginform',
                    items: [
                    Ext.apply({},templates.login.neironLogin),
                    {
                        name: 'email',
                        xtype: 'textfield',
                        emptyText: 'Электронная почта',
                        vtype: 'email',
                        allowBlank: false
                    },{
                        name: 'password',
                        xtype: 'textfield',
                        // inputType: 'password', 
                        emptyText: 'Пароль',
                        allowBlank: false                       
                    },
                    {
                        name: 'hide-password',
                        xtype: 'checkbox',
                        boxLabel: 'Скрывать ввод пароля'
                    },
                    {
                        xtype: 'button',
                        id: 'loginpopup-loginbutton',
                        text: 'Вход',
                        handler: function(){
                            this.loginForm.submit();
                        },
                        scope: this
                    }
                        
                    ]
                });
        this.loginBy = Ext.create('Ext.form.Panel',Ext.apply({
            flex: 4,
            id: 'loginpopup-loginby'
        },templates.login.loginBy));
        this.loginCardItem = Ext.create('Ext.panel.Panel',{
            layout: {
                type: 'hbox',
                align: 'stretch',
                pack: 'center'
            },
            id: 'loginpopup-logincard',
            items: [
                this.loginForm,
                this.loginBy
            ]
        });
        
        //Register form
        this.regCardItem = Ext.create('Ext.form.Panel',{
                    xtype: 'form',
                    flex: 5,
                    id: 'loginpopup-regform',
                    items: [
                    Ext.apply({},templates.login.neironReg),
                    {
                        name: 'email',
                        xtype: 'textfield',
                        emptyText: 'Электронная почта',
                        vtype: 'email',
                        allowBlank: false
                    },{
                        name: 'password',
                        xtype: 'textfield',
                        // inputType: 'password', 
                        emptyText: 'Пароль',
                        allowBlank: false                        
                    },
                    {
                        name: 'hide-password',
                        xtype: 'checkbox',
                        boxLabel: 'Скрывать ввод пароля'
                    },
                    {
                        xtype: 'button',
                        id: 'loginpopup-regbutton',
                        text: 'Зарегистрироваться',
                        handler: function(){
                            this.regCardItem.submit();
                        },
                        scope: this
                    }
                        
                    ]
        });
        
        this.cardPanel.add(this.loginCardItem);
        this.cardPanel.add(this.regCardItem);
    }
    
});
