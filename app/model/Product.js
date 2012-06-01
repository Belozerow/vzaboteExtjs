Ext.define('Vzabote.model.Product',{
    extend: 'Ext.data.Model',
    fields: [
             {name: 'id'},
             {name: 'name', type: 'string'},
             {name: 'image', type: 'imag'},
             {name: 'minprice',type: 'float'},
             {name: 'maxprice',type: 'float'},
             {name: 'offerscount',type: 'int'},
    ],
    proxy: {
        type: 'memory'
    }
})
