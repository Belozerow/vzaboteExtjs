Ext.define('Vzabote.view.ModalMap',{
    extend: 'Vzabote.view.ModalPanel',
    alias: 'widget.modalmap',
    id: 'modalmap',
    floating: true,
    left: 0,
    top: 0,
    city: "Челябинск",
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    initComponent: function(){
        this.points = [];
        this.refreshSize();
        Ext.EventManager.onWindowResize(function(){
            this.refreshSize();
            this.gmap.onResize();
        },this);
        this.callParent();
        this.findForm = Ext.create('Ext.form.Panel',{
            height: 125,
            items: [Ext.apply({
                xtype: 'container'
            },templates.modal.map),{
                xtype: 'textfield',
                id: 'address_field',
                emptyText: 'Введите адрес точки на карте'
            },{
                xtype: 'button',
                text: 'Добавить точку',
                handler: function(){
                    this.gmap.addWaypoint(this.findForm.getComponent("address_field").getValue(), this.city)
                    this.gmap.displayRoute();
                },
                scope: this
            },
            {
                xtype: 'button',
                text: 'Удалить маршрут',
                handler: function(){
                    this.gmap.clearRoute();
                },
                scope: this
            }]
        });
        this.add(this.findForm);
        this.routePanel = Ext.create('Ext.form.Panel',{
            id: 'route',
            items: []
        });
        this.add(this.routePanel);
        this.gmap = this.add({
                xtype: 'map',
                id: 'mymap',
                gmapType: 'map',
                zoomLevel: 16,
                flex: 1,
                setCenter: {
                    lat: 39.26940,
                    lng: -76.64323
                }
        });
        
        Ext.util.Observable.capture(this.gmap, function(name, d2, d3){
            if (name == "mapready")
            {
                this.gmap.showMyPoint();

            }
        }, this);
        
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

