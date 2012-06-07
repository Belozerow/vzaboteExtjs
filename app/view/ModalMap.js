Ext.define('Vzabote.view.ModalMap',{
    extend: 'Ext.panel.Panel',
    alias: 'widget.modalmap',
    id: 'modalmap',
    floating: true,
    left: 0,
    top: 0,
    modal: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    initComponent: function(){
        this.refreshSize();
        Ext.EventManager.onWindowResize(function(){
            this.refreshSize();
        },this);
        this.callParent();
        this.findForm = Ext.create('Ext.form.Panel',{
            dock: 'top',
            height: 125,
            items: [Ext.apply({
                xtype: 'container'
            },templates.modal.map),{
                xtype: 'textfield',
                emptyText: 'Введите адрес точки на карте'
            },{
                xtype: 'button',
                text: 'Добавить точку',
                handler: function(){
                    console.log('add');
                },
                scope: this
            }]
        })
        this.addDocked(this.findForm);
        this.gmap = this.add({
                xtype: 'gmappanel',
                id: 'mymap',
                flex: 1,
                setCenter: {
                    lat: 39.26940,
                    lng: -76.64323
                }
        });
        this.addDocked({
            xtype: 'container',
            dock: 'bottom',
            height: 100,
            items: {
                xtype: 'button',
                text: 'OK'
            }
        });
    },
    refreshSize: function(){
        this.setWidth(Ext.getBody().getWidth());
        this.setHeight(Ext.getBody().getHeight());
    }
});
