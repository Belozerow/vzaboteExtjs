Ext.define('Vzabote.view.AddShop',{
    extend: 'Vzabote.view.ModalPanel',
    alias: 'widget.addshop',    
    initComponent: function(){
        this.callParent();
        this.form = Ext.create('Ext.form.Panel',{
            defaultType: 'textfield',
            items: [Ext.apply({
                xtype: 'container'
            },templates.modal.addshop),
            {
                id: 'addshop-name',
                emptyText: 'Название предприятия'
            },
            {
                id: 'addshop-address',
                emptyText: 'Адрес предприятия'
            },
            {
                id: 'addshop-phone',
                emptyText: 'Телефон для связи с вами'
            },
            {
                id: 'addshop-email',
                emptyText: 'Электронная почта (если есть)'
            },
            {
                id: 'addshop-sendbutton',
                xtype: 'button',
                text: 'Отправить заявку'
            }
            ]
        })
        this.add(this.form)
    }
});
