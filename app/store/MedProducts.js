Ext.define('Vzabote.store.MedProducts',{
    extend: 'Ext.data.Store',
    model: 'Vzabote.model.Product',
    remoteFilter: true,
    proxy: {
        type:   'scripttag',
        url:    VzaboteSettings.serviceUrl + '/market/search.json/',
        reader: { type:'json', root: 'values' }
    },
    search: function(id){
        this.clearFilter();
        this.filter(
            [{
                property: 'commercgroup', value: id
            },{
                property: 'location', value: {lat: 55.159889, lng: 61.402577}
            },{
                property: 'distance', value: 10000
            }]
        );
    }
});