Ext.define('Vzabote.controller.Login',{
   extend: 'Ext.app.Controller',
   refs: [{
       ref: 'loginPopup',
       selector: 'loginpopup'
   }],
   init: function(){
       this.control({
          '#header #viewport-loginbutton': {
              click: function(){
                  this.showLogin();
              }
          },
          'loginpopup #loginpopup-login-button': {
                click: function(){
                    this.getLoginPopup().close(true);
                }
          },
          'loginpopup #login-tabs':{
                afterrender: function(me){
                    me.getTargetEl().down('#signintab').addCls('active');
                    me.getTargetEl().on('click',function(e,node){
                        this.setActiveTab(node);
                    },this);
                }
          },
          'loginpopup checkbox': {
              change: function(me,newVal,oldVal){
                  //TODO Как-то не очень красиво, надо подумать.
                  this.changePasswordType(me.up().down('[name=password]'),newVal);
              }
          }
          
       });
   },
   changePasswordType: function(field,type){
        var value = field.getValue(),
            newPasswordField = new Ext.form.TextField({
                name: 'password',
                emptyText: 'Пароль',
                inputType: (type)?'password':'text',
                value: value
            });
        var form = field.up();
            index = form.items.indexOf(field);
        form.items.items[index].destroy();
        form.insert(index,newPasswordField);
        form.doLayout();
       
   },
   showLogin: function(){
       if(this.loginPopup) 
            this.loginPopup.close();
       this.loginPopup = Ext.create('widget.loginpopup',{
       });
       this.loginPopup.show();
   },
   setActiveTab: function(node){
        var loginPopup = this.getLoginPopup();
        if(node.id == 'signintab'){
            loginPopup.cardPanel.layout.setActiveItem(0);
            loginPopup.getTargetEl().down('#signintab').addCls('active');
            loginPopup.getTargetEl().down('#signuptab').removeCls('active');
        }
        else if(node.id == 'signuptab'){
            loginPopup.cardPanel.layout.setActiveItem(1);
            loginPopup.getTargetEl().down('#signuptab').addCls('active');
            loginPopup.getTargetEl().down('#signintab').removeCls('active');
        }
       
            
   }   
});