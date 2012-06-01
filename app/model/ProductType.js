Ext.define('Vzabote.model.ProductType',{
    extend: 'Ext.data.Model',
    fields: [{name: 'name', type: 'string'},
             {name: 'image', type: 'image'},
             {name: 'url', type: 'string'},
             {name: 'icon', type: 'string'},
             {name: 'resource_uri',type:'string'},
             {name: 'cat_id', type: 'int'},
             {name: 'id'}
    ],
    proxy: {
        type: 'scripttag',
        url: VzaboteSettings.serviceUrl + '/api/v1/whitebrand/',
        extraParams: {
            format: 'jsonp'
        },
        reader: {
            type: 'json',
            root: 'objects'
        }
    }
});
