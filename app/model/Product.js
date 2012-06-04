Ext.define('Vzabote.model.Product',{
    extend: 'Ext.data.Model',
    fields: [
             {name: 'id'},
             {name: 'name', type: 'string'},
             {name: 'image', type: 'imag'},
             {name: 'minprice',type: 'float'},
             {name: 'maxprice',type: 'float'},
             {name: 'offerscount',type: 'int'},
             {name: 'amount',type: 'int'},
             {name: 'amount_measure',type: 'string'},
             {name: 'amount_modificaton_step',type: 'int'},
    ],
    proxy: {
        type: 'memory'
    }
});
