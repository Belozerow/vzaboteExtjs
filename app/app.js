Ext.require('Ext.container.Viewport');
Ext.application({
    name: 'Vzabote',
    autoCreateViewport: true,
    models: ['Category','CategoryInfo','Product'],
    stores: ['Categories','CategoryInfo','Products'],
    controllers: ['Viewport','CategorySelect','Login'],
    launch: function(){
        Ext.getStore('Categories').load();
        Vzabote.router.initRoutes(this);
        
    }
})
Ext.ns('templates');
Ext.ns('Vzabote.router');
