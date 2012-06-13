Ext.define('Vzabote.store.GasTypes',{
    extend: 'Ext.data.Store',
    model: 'Vzabote.model.ProductType',
    data: [
        {id: 1, name: 'АИ-95', minprice: '24.2',maxprice: '28.55',image: 'resources/gas/95.png'},
        {id: 2, name: 'АИ-92', minprice: '24.2',maxprice: '28.55',image: 'resources/gas/92.png'},
        {id: 3, name: 'ДТ', minprice: '24.2',maxprice: '28.55',image: 'resources/gas/dt.png'},
        {id: 4, name: 'АИ-98', minprice: '24.2',maxprice: '28.55',image: 'resources/gas/98.png'},
        {id: 5, name: 'АИ-80', minprice: '24.2',maxprice: '28.55',image: 'resources/gas/80.png'}
    ]
});
