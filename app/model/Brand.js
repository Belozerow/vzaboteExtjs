Ext.define('Vzabote.model.Brand',{
    extend: 'Ext.data.Model',
    fields: ['id', 'name', 'image','selected'],
    proxy: {
        type: 'memory'
    }
});
