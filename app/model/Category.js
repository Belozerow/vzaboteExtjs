Ext.define('Vzabote.model.Category',{
    extend: 'Ext.data.Model',
    fields: ['id', 'name', 'image', 'subname','categoryitems'],
    proxy: {
        type: 'memory'
    }
})
