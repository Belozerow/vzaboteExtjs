Ext.define('Vzabote.model.CategoryInfo',{
    extend: 'Ext.data.Model',
    fields: ['id', 'name', 'titleextra'],
    proxy: {
        type: 'memory'
    }
})
