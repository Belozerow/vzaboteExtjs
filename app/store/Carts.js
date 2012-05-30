Ext.define('Vzabote.store.Carts',{
    extend: 'Ext.data.Store',
    model: 'Vzabote.model.Cart',
    requires: 'Vzabote.model.Cart',
    data: [
        {name: 'Пост', custom: true, info: 'Поститься!', image: 'resources/cart.png', minprice: 1248, maxprice: 1731.5, products:[ 
            {name: 'Гуляш', image: 'resources/product', minprice: 100.1, maxprice: 221.4, offerscount: 12},
            {name: 'Гуляш', image: 'resources/product', minprice: 100.1, maxprice: 221.4, offerscount: 12},
            {name: 'Гуляш', image: 'resources/product', minprice: 100.1, maxprice: 221.4, offerscount: 12},
            {name: 'Гуляш', image: 'resources/product', minprice: 100.1, maxprice: 221.4, offerscount: 12},
            {name: 'Гуляш', image: 'resources/product', minprice: 100.1, maxprice: 221.4, offerscount: 12},
        ]},
        {name: 'Моя Корзина', custom: true, info: 'Моя корзина', image: 'resources/cart.png', minprice: 1248, maxprice: 1731.5, products:[ 
            {name: 'Гуляш', image: 'resources/product', minprice: 100.1, maxprice: 221.4, offerscount: 12},
            {name: 'Гуляш', image: 'resources/product', minprice: 100.1, maxprice: 221.4, offerscount: 12},
            {name: 'Гуляш', image: 'resources/product', minprice: 100.1, maxprice: 221.4, offerscount: 12},
            {name: 'Гуляш', image: 'resources/product', minprice: 100.1, maxprice: 221.4, offerscount: 12},
            {name: 'Гуляш', image: 'resources/product', minprice: 100.1, maxprice: 221.4, offerscount: 12},
        ]},
        {name: 'Ежедневная', custom: false, info: 'Какой-то текст', image: 'resources/cart.png', minprice: 1248, maxprice: 1731.5, products:[ 
            {name: 'Гуляш', image: 'resources/product', minprice: 100.1, maxprice: 221.4, offerscount: 12},
            {name: 'Гуляш', image: 'resources/product', minprice: 100.1, maxprice: 221.4, offerscount: 12},
            {name: 'Гуляш', image: 'resources/product', minprice: 100.1, maxprice: 221.4, offerscount: 12},
            {name: 'Гуляш', image: 'resources/product', minprice: 100.1, maxprice: 221.4, offerscount: 12},
            {name: 'Гуляш', image: 'resources/product', minprice: 100.1, maxprice: 221.4, offerscount: 12},
        ]},
        {name: 'На 2 недели', custom: false, info: 'Какой-то текст', image: 'resources/cart.png', minprice: 1248, maxprice: 1731.5, products:[ 
            {name: 'Гуляш', image: 'resources/product', minprice: 100.1, maxprice: 221.4, offerscount: 12},
            {name: 'Гуляш', image: 'resources/product', minprice: 100.1, maxprice: 221.4, offerscount: 12},
            {name: 'Гуляш', image: 'resources/product', minprice: 100.1, maxprice: 221.4, offerscount: 12},
            {name: 'Гуляш', image: 'resources/product', minprice: 100.1, maxprice: 221.4, offerscount: 12},
            {name: 'Гуляш', image: 'resources/product', minprice: 100.1, maxprice: 221.4, offerscount: 12},
        ]},
        {name: 'На праздник', custom: false, info: 'Какой-то текст', image: 'resources/cart.png', minprice: 1248, maxprice: 1731.5, products:[ 
            {name: 'Гуляш', image: 'resources/product', minprice: 100.1, maxprice: 221.4, offerscount: 12},
            {name: 'Гуляш', image: 'resources/product', minprice: 100.1, maxprice: 221.4, offerscount: 12},
            {name: 'Гуляш', image: 'resources/product', minprice: 100.1, maxprice: 221.4, offerscount: 12},
            {name: 'Гуляш', image: 'resources/product', minprice: 100.1, maxprice: 221.4, offerscount: 12},
            {name: 'Гуляш', image: 'resources/product', minprice: 100.1, maxprice: 221.4, offerscount: 12},
        ]}
    ]   
})
