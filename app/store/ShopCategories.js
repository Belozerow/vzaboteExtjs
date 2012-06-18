Ext.define('Vzabote.store.ShopCategories',{
    extend: 'Ext.data.Store',
    requires: 'Vzabote.model.ShopCategory',
    model: 'Vzabote.model.ShopCategory',
    data: [
        {id: 1, name: 'Живая рыба', image: 'resources/products/gulyash.png', checked: 0},
        {id: 2, name: 'Туалет', image: 'resources/products/gulyash.png', checked: 1},
        {id: 3, name: 'Свежая выпечка', image: 'resources/products/gulyash.png', checked: 0},
        {id: 4, name: 'Готовая еда', image: 'resources/products/gulyash.png', checked: 1},
        {id: 5, name: 'Принимает карты', image: 'resources/products/gulyash.png', checked: 1},
        {id: 6, name: 'Кафе', image: 'resources/products/gulyash.png', checked: 1},
        {id: 7, name: 'Живая рыба', image: 'resources/products/gulyash.png', checked: 0},
        {id: 8, name: 'Живая рыба', image: 'resources/products/gulyash.png', checked: 0},
        {id: 9, name: 'Готовая еда', image: 'resources/products/gulyash.png', checked: 1},
        {id: 10, name: 'Готовая еда', image: 'resources/products/gulyash.png', checked: 1},
        {id: 11, name: 'Кафе', image: 'resources/products/gulyash.png', checked: 0},
        {id: 12, name: 'Принимает карты', image: 'resources/products/gulyash.png', checked: 0},
        {id: 13, name: 'Принимает карты', image: 'resources/products/gulyash.png', checked: 1}
    ]
});
