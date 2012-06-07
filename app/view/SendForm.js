Ext.define('Vzabote.view.SendForm',{
    extend: 'Vzabote.view.ModalPanel',
    alias: 'widget.sendform',
    formTitle: '',
    fieldEmptyText: '',
    formValidation: '',
    sendType: 'sms', //sms/email/book
    initComponent: function(){
        this.callParent();
        this.add([{
            xtype: 'container',
            html: this.formTitle
        },Ext.apply({
            id: 'sendform-input',
            emptyText: this.fieldEmptyText,
            listeners: {
                specialkey: function(field,e){
                    if(e.getKey() == e.ENTER)
                        this.submit();
                },
                scope: this
            }
        },this.formValidation),{
            xtype: 'button',
            text: 'Отправить',
            handler: function(){
                this.successPanel({code:100});
                this.submit();
            },
            scope: this
        }]);
    },
    successPanel: function(data){
        this.removeAll();
        this.add(Ext.apply({
            xtype: 'container',
            data: data
        },templates.modal['success'+this.sendType]));
    }
});
