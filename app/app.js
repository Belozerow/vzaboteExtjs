// Ext.require('Ext.container.Viewport');
(function() {
    Ext.Loader.setConfig({
        enabled : true,
        paths   : {
            Vzabote : 'app'
        } 
    });
})();
Ext.application({
    name: 'Vzabote',
    autoCreateViewport: true,
    models: ['Category','CategoryInfo','ProductType','Cart','Product'],
    stores: ['Categories','CategoryInfo','ProductTypes','Carts','Products'],
    controllers: ['Viewport','CategorySelect','Login','Product'],
    launch: function(){
        Ext.Loader.setPath('Vzabote','app');
        Ext.getStore('Categories').load();
        Vzabote.router.initRoutes(this);
    }
});
Ext.ns('templates');
Ext.ns('Vzabote.router');
