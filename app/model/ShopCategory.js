Ext.define('Vzabote.model.ShopCategory',{
    extend: 'Ext.data.Model',
    fields: [
             {name: 'id'},
             {name: 'name', type: 'string'},
             {name: 'image', type: 'imag'},
             {name: 'checked',type: 'int'}
    ],
    proxy: {
        type: 'memory'
    }
});
