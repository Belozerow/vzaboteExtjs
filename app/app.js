Ext.require('Ext.container.Viewport');
Ext.application({
    name: 'Vzabote',
    autoCreateViewport: true,
    models: ['Category','CategoryInfo'],
    stores: ['Categories','CategoryInfo'],
    controllers: ['Viewport','CategorySelect','Login'],
    launch: function(){
        Ext.getStore('Categories').load();
        Vzabote.router.initRoutes(this);
        
    }
})
Ext.ns('templates');
Ext.ns('Vzabote.router');
