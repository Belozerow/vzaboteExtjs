Ext.require('Ext.container.Viewport');
Ext.application({
    name: 'Vzabote',
    autoCreateViewport: true,
    models: ['Category','CategoryInfo','ProductType','Cart','Product'],
    stores: ['Categories','CategoryInfo','ProductTypes','Carts','Products','UserCart'],
    controllers: ['Viewport','CategorySelect','Login','Product'],
    launch: function(){
        Ext.Loader.setPath('Vzabote','app');
        // Ext.getStore('Categories').load();
        Vzabote.router.initRoutes(this);
    }
})
Ext.ns('templates');
Ext.ns('Vzabote.router');
