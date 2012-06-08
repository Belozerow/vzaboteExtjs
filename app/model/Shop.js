Ext.define('Vzabote.model.Shop',{
    extend: 'Ext.data.Model',
    fields: [
             {name: 'id'},
             {name: 'name', type: 'string'},
             {name: 'image', type: 'imag'},
             {name: 'address', type: 'string'}
    ],
    proxy: {
        type: 'memory'
    }
});
