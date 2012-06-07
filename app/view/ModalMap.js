Ext.define('Vzabote.view.ModalMap',{
    extend: 'Vzabote.view.ModalPanel',
    alias: 'widget.modalmap',
    id: 'modalmap',
    floating: true,
    left: 0,
    top: 0,
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
        });
        this.add(this.findForm);
        this.gmap = this.add({
                xtype: 'gmappanel',
                id: 'mymap',
                flex: 1,
                setCenter: {
                    lat: 39.26940,
                    lng: -76.64323
                }
        });
        this.add({
            xtype: 'container',
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
