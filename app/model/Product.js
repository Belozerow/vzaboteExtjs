Ext.define('Vzabote.model.Product',{
    extend: 'Ext.data.Model',
    fields: [{name: 'name', type: 'string'},
             {name: 'image', type: 'image'},
             {name: 'url', type: 'string'},
             {name: 'icon', type: 'string'},
             {name: 'resource_uri',type:'string'},
             {name: 'cat_id', type: 'int'}
    ],
    proxy: {
        type: 'rest',
        url: VzaboteSettings.serviceUrl + '/api/v1/whitebrand/',
        extraParams: {
            format: 'json'
        },
        reader: {
            type: 'json',
            root: 'objects'
        }
    }
})
