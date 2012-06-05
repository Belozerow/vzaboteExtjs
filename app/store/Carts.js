Ext.define('Vzabote.store.Carts',{
    extend: 'Ext.data.Store',
    model: 'Vzabote.model.Cart',
    // requires: 'Vzabote.model.Cart',
    data: [
        {id: 1, name: 'Пост', custom: true, info: 'Поститься!Поститься!Поститься!Поститься!', image: 'resources/cart.png', minprice: 1248, maxprice: 1731.5, products:[ 
            {id: 1, name: 'Фарш', image: 'resources/products/farsh.png', minprice: 100.1, maxprice: 221.4, offerscount: 12},
            {id: 2, name: 'Грудинка', image: 'resources/products/grudinka.png', minprice: 122.3, maxprice: 211.4, offerscount: 2},
            {id: 3, name: 'Гуляш', image: 'resources/products/gulyash.png', minprice: 100.1, maxprice: 221.4, offerscount: 12},
            {id: 4, name: 'Вырезка', image: 'resources/products/vyrezka.png', minprice: 100.1, maxprice: 221.4, offerscount: 12},
            {id: 5, name: 'Фарш', image: 'resources/products/farsh.png', minprice: 100.1, maxprice: 221.4, offerscount: 12},
            {id: 6, name: 'Грудинка', image: 'resources/products/grudinka.png', minprice: 100.1, maxprice: 221.4, offerscount: 12},
            {id: 7, name: 'Гуляш', image: 'resources/products/gulyash.png', minprice: 100.1, maxprice: 221.4, offerscount: 12},
            {id: 8, name: 'Вырезка', image: 'resources/products/vyrezka.png', minprice: 100.1, maxprice: 221.4, offerscount: 12},
            {id: 9, name: 'Фарш', image: 'resources/products/farsh.png', minprice: 100.1, maxprice: 221.4, offerscount: 12},
            {id: 10, name: 'Грудинка', image: 'resources/products/grudinka.png', minprice: 100.1, maxprice: 221.4, offerscount: 12},
            {id: 11, name: 'Гуляш', image: 'resources/products/gulyash.png', minprice: 100.1, maxprice: 221.4, offerscount: 12},
            {id: 12, name: 'Вырезка', image: 'resources/products/vyrezka.png', minprice: 100.1, maxprice: 221.4, offerscount: 12}
        ]},
        {id: 2, name: 'Моя Корзина', custom: true, info: 'Моя корзинаМоя корзинаМоя корзина', image: 'resources/cart.png', minprice: 1248, maxprice: 1731.5, products:[ 
            {id: 1, name: 'Фарш', image: 'resources/products/farsh.png', minprice: 100.1, maxprice: 221.4, offerscount: 12},
            {id: 2, name: 'Грудинка', image: 'resources/products/grudinka.png', minprice: 122.3, maxprice: 211.4, offerscount: 2},
            {id: 3, name: 'Гуляш', image: 'resources/products/gulyash.png', minprice: 100.1, maxprice: 221.4, offerscount: 12},
            {id: 4, name: 'Вырезка', image: 'resources/products/vyrezka.png', minprice: 100.1, maxprice: 221.4, offerscount: 12},
            {id: 5, name: 'Фарш', image: 'resources/products/farsh.png', minprice: 100.1, maxprice: 221.4, offerscount: 12},
            {id: 6, name: 'Грудинка', image: 'resources/products/grudinka.png', minprice: 100.1, maxprice: 221.4, offerscount: 12},
            {id: 7, name: 'Гуляш', image: 'resources/products/gulyash.png', minprice: 100.1, maxprice: 221.4, offerscount: 12},
            {id: 8, name: 'Вырезка', image: 'resources/products/vyrezka.png', minprice: 100.1, maxprice: 221.4, offerscount: 12},
            {id: 9, name: 'Фарш', image: 'resources/products/farsh.png', minprice: 100.1, maxprice: 221.4, offerscount: 12},
            {id: 10, name: 'Грудинка', image: 'resources/products/grudinka.png', minprice: 100.1, maxprice: 221.4, offerscount: 12},
            {id: 11, name: 'Гуляш', image: 'resources/products/gulyash.png', minprice: 100.1, maxprice: 221.4, offerscount: 12},
            {id: 12, name: 'Вырезка', image: 'resources/products/vyrezka.png', minprice: 100.1, maxprice: 221.4, offerscount: 12}
        ]},
        {id: 3, name: 'Ежедневная', custom: false, info: 'Какой-то текстКакой-то текстКакой-то текст', image: 'resources/cart.png', minprice: 1248, maxprice: 1731.5, products:[ 
            {id: 1, name: 'Фарш', image: 'resources/products/farsh.png', minprice: 100.1, maxprice: 221.4, offerscount: 12},
            {id: 2, name: 'Грудинка', image: 'resources/products/grudinka.png', minprice: 122.3, maxprice: 211.4, offerscount: 2},
            {id: 3, name: 'Гуляш', image: 'resources/products/gulyash.png', minprice: 100.1, maxprice: 221.4, offerscount: 12},
            {id: 4, name: 'Вырезка', image: 'resources/products/vyrezka.png', minprice: 100.1, maxprice: 221.4, offerscount: 12},
            {id: 5, name: 'Фарш', image: 'resources/products/farsh.png', minprice: 100.1, maxprice: 221.4, offerscount: 12},
            {id: 6, name: 'Грудинка', image: 'resources/products/grudinka.png', minprice: 100.1, maxprice: 221.4, offerscount: 12},
            {id: 7, name: 'Гуляш', image: 'resources/products/gulyash.png', minprice: 100.1, maxprice: 221.4, offerscount: 12},
            {id: 8, name: 'Вырезка', image: 'resources/products/vyrezka.png', minprice: 100.1, maxprice: 221.4, offerscount: 12},
            {id: 9, name: 'Фарш', image: 'resources/products/farsh.png', minprice: 100.1, maxprice: 221.4, offerscount: 12},
            {id: 10, name: 'Грудинка', image: 'resources/products/grudinka.png', minprice: 100.1, maxprice: 221.4, offerscount: 12},
            {id: 11, name: 'Гуляш', image: 'resources/products/gulyash.png', minprice: 100.1, maxprice: 221.4, offerscount: 12},
            {id: 12, name: 'Вырезка', image: 'resources/products/vyrezka.png', minprice: 100.1, maxprice: 221.4, offerscount: 12}
        ]},
        {id: 4, name: 'На 2 недели', custom: false, info: 'Какой-то текстКакой-то текстКакой-то текст', image: 'resources/cart.png', minprice: 1248, maxprice: 1731.5, products:[ 
            {id: 1, name: 'Фарш', image: 'resources/products/farsh.png', minprice: 100.1, maxprice: 221.4, offerscount: 12},
            {id: 2, name: 'Грудинка', image: 'resources/products/grudinka.png', minprice: 122.3, maxprice: 211.4, offerscount: 2},
            {id: 3, name: 'Гуляш', image: 'resources/products/gulyash.png', minprice: 100.1, maxprice: 221.4, offerscount: 12},
            {id: 4, name: 'Вырезка', image: 'resources/products/vyrezka.png', minprice: 100.1, maxprice: 221.4, offerscount: 12},
            {id: 5, name: 'Фарш', image: 'resources/products/farsh.png', minprice: 100.1, maxprice: 221.4, offerscount: 12},
            {id: 6, name: 'Грудинка', image: 'resources/products/grudinka.png', minprice: 100.1, maxprice: 221.4, offerscount: 12},
            {id: 7, name: 'Гуляш', image: 'resources/products/gulyash.png', minprice: 100.1, maxprice: 221.4, offerscount: 12},
            {id: 8, name: 'Вырезка', image: 'resources/products/vyrezka.png', minprice: 100.1, maxprice: 221.4, offerscount: 12},
            {id: 9, name: 'Фарш', image: 'resources/products/farsh.png', minprice: 100.1, maxprice: 221.4, offerscount: 12},
            {id: 10, name: 'Грудинка', image: 'resources/products/grudinka.png', minprice: 100.1, maxprice: 221.4, offerscount: 12},
            {id: 11, name: 'Гуляш', image: 'resources/products/gulyash.png', minprice: 100.1, maxprice: 221.4, offerscount: 12},
            {id: 12, name: 'Вырезка', image: 'resources/products/vyrezka.png', minprice: 100.1, maxprice: 221.4, offerscount: 12}
        ]},
        {id: 5, name: 'На праздник', custom: false, info: 'Какой-то текстКакой-то текстКакой-то текст', image: 'resources/cart.png', minprice: 1248, maxprice: 1731.5, products:[ 
            {id: 1, name: 'Фарш', image: 'resources/products/farsh.png', minprice: 100.1, maxprice: 221.4, offerscount: 12},
            {id: 2, name: 'Грудинка', image: 'resources/products/grudinka.png', minprice: 122.3, maxprice: 211.4, offerscount: 2},
            {id: 3, name: 'Гуляш', image: 'resources/products/gulyash.png', minprice: 100.1, maxprice: 221.4, offerscount: 12},
            {id: 4, name: 'Вырезка', image: 'resources/products/vyrezka.png', minprice: 100.1, maxprice: 221.4, offerscount: 12},
            {id: 5, name: 'Фарш', image: 'resources/products/farsh.png', minprice: 100.1, maxprice: 221.4, offerscount: 12},
            {id: 6, name: 'Грудинка', image: 'resources/products/grudinka.png', minprice: 100.1, maxprice: 221.4, offerscount: 12},
            {id: 7, name: 'Гуляш', image: 'resources/products/gulyash.png', minprice: 100.1, maxprice: 221.4, offerscount: 12},
            {id: 8, name: 'Вырезка', image: 'resources/products/vyrezka.png', minprice: 100.1, maxprice: 221.4, offerscount: 12},
            {id: 9, name: 'Фарш', image: 'resources/products/farsh.png', minprice: 100.1, maxprice: 221.4, offerscount: 12},
            {id: 10, name: 'Грудинка', image: 'resources/products/grudinka.png', minprice: 100.1, maxprice: 221.4, offerscount: 12},
            {id: 11, name: 'Гуляш', image: 'resources/products/gulyash.png', minprice: 100.1, maxprice: 221.4, offerscount: 12},
            {id: 12, name: 'Вырезка', image: 'resources/products/vyrezka.png', minprice: 100.1, maxprice: 221.4, offerscount: 12}
        ]}
    ]   
});
