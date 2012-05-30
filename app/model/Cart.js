Ext.define('Vzabote.model.Cart',{
    extend: 'Ext.data.Model',
    fields: ['name', 'image', 'info', 'custom','minprice','maxprice'],
    associations: [
        {type: 'hasMany', model: 'Vzabote.model.ProductType', name: 'productTypes'},
        {type: 'hasMany', model: 'Vzabote.model.Product', name: 'products'}
    ],
    proxy: {
        type: 'memory',
    }
});