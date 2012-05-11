Ext.require('Ext.container.Viewport');
Ext.application({
    name: 'Vzabote',
    autoCreateViewport: true,
    models: ['Category'],
    stores: ['Categories'],
    controllers: ['Viewport'],
    launch: function(){
        Ext.getStore('Categories').load();
    }
})
Ext.ns('templates');