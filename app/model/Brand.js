Ext.define('Vzabote.model.Brand',{
    extend: 'Ext.data.Model',
    fields: ['id', 'name', 'image',{name: 'selected', type: 'boolean', defaultValue: false}],
    proxy: {
        type: 'memory'
    }
});
