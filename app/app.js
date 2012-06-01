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
    controllers: ['Viewport','CategorySelect','Login','Product', 'ShoppingList'],
    models: ['Category','CategoryInfo','ProductType','Cart','Product','Brand'],
    stores: ['Categories','CategoryInfo','ProductTypes','Carts','Products','Brands'],
    launch: function(){
        Ext.Loader.setPath('Vzabote','app');
        Vzabote.router.initRoutes(this);
    }
});
Ext.ns('templates');
Ext.ns('Vzabote.router');
Ext.ns('Vzabote.util');
