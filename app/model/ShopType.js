Ext.define('Vzabote.model.ShopType',{
    extend: 'Ext.data.Model',
    fields: [
             {name: 'id'},
             {name: 'type', type: 'string'},
             {name: 'distance', type: 'double'},
             {name: 'address', type: 'string'},
             {name: 'price', type: 'double'},
             {name: 'info', type: 'string'}
    ],
    proxy: {
        type: 'memory'
    }
});