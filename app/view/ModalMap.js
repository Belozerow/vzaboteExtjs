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
        this.addDocked({
            xtype: 'container',
            dock: 'top',
            height: 125
        });
        this.add({
                xtype: 'gmappanel',
                id: 'mymap',
                flex: 1,
                //zoomLevel: 14,
                //gmapType: 'map',
                //mapConfOpts: ['enableScrollWheelZoom','enableDoubleClickZoom','enableDragging'],
                //mapControls: ['GSmallMapControl','GMapTypeControl'],
                setCenter: {
                    lat: 39.26940,
                    lng: -76.64323
                }
        });
        this.addDocked({
            xtype: 'container',
            dock: 'bottom',
            height: 100
        });
    },
    refreshSize: function(){
        this.setWidth(Ext.getBody().getWidth());
        this.setHeight(Ext.getBody().getHeight());
    }
});
