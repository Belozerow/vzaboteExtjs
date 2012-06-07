Ext.define('Vzabote.view.AddShop',{
    extend: 'Vzabote.view.ModalPanel',
    alias: 'widget.addshop',
    layout: {
        type: 'vbox',
        align: 'stretch',
        pack: 'center'
    },
    initComponent: function(){
        this.callParent();
        this.form = this.add({
            xtype: 'form',
            defaultType: 'textfield',
            items: [Ext.apply({
                xtype: 'container'
            },templates.modal.addshop),
            {
                id: 'addshop-name',
                emptyText: 'Название предприятия',
                allowBlank: false,
                blankText: 'Укажите название предприятия'
            },
            {
                id: 'addshop-address',
                emptyText: 'Адрес предприятия',
                allowBlank: false,
                blankText: 'Укажите адрес предприятия'
            },
            {
                id: 'addshop-phone',
                emptyText: 'Телефон для связи с вами',
                allowBlank: false,
                blankText: 'Укажите телефон предприятия'
            },
            {
                id: 'addshop-email',
                emptyText: 'Электронная почта (если есть)',
                vtype: 'email'
            },
            {
                id: 'addshop-sendbutton',
                xtype: 'button',
                text: 'Отправить заявку',
                handler: function(){
                    this.form.submit();
                },
                scope: this
            }
        ]
        });
        
    }
});
