Ext.define('Vzabote.store.MedTypes',{
    extend: 'Ext.data.Store',
    model: 'Vzabote.model.ProductType',
    proxy: {
        type: 'scripttag',
        url: VzaboteSettings.serviceUrl + '/api/v1/commercgroup',
        reader: { type: 'json', root: 'objects', isMeta: true, totalProperty: 'total_count',startParam: 'offset' },
        timeout: 120000
    }
});
