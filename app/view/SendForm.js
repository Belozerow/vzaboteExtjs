Ext.define('Vzabote.view.SendForm',{
    extend: 'Vzabote.view.ModalPanel',
    alias: 'widget.sendform',
    sendType: 'sms', //sms/email/book
    layout: {
        type: 'vbox',
        align: 'stretch',
        pack: 'center'
    },
    initComponent: function(){
        this.callParent();
        var sendType = this.sendType;
        this.sendform = this.add({
            xtype: 'form',
            defaultType: 'textfield',
            items:[
                Ext.apply({
                    xtype: 'container'
                },templates.modal['title'+sendType]),Ext.apply({
                    id: 'sendform-input',
                    allowBlank: false,
                    listeners: {
                        specialkey: function(field,e){
                            if(e.getKey() == e.ENTER)
                                this.submit();
                        },
                        scope: this
                    }
                },this['getParamsFor'+sendType]),{
                    xtype: 'button',
                    text: 'Отправить',
                    handler: function(){
                        this.successPanel({code: 195837});
                        this.sendform.submit();
                    },
                    scope: this
                }
            ] 
        });
     },
    successPanel: function(data){
        this.removeAll();
        this.add(Ext.apply({
            xtype: 'container',
            data: data
        },templates.modal['success'+this.sendType]));
    },
    getParamsForsms: function(){
        return {
            emptyText: 'Введите номер мобильного телефона'
        };
    },
    getParamsForbook: function(){
        return this.getParamsForsms();
    },
    getParamsForemail: function(){
        return {
            emptyText: 'Введите адрес почты',
            vtype: 'email'
        };
    }
});
