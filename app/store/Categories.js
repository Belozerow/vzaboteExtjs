Ext.define('Vzabote.store.Categories',{
    extend: 'Ext.data.Store',
    requires: 'Vzabote.model.Category',
    model: 'Vzabote.model.Category',
    data: [

        {'id': 0, 'name': 'Продукты','image': 'resources/categories/products.png', 'subname': 'Продуктовая корзина', 'categoryitems':[{
                'name': 'Пятерочка',
                'price': 1101,
                'pricechange': 'down'
            },{
                'name': 'Дикси',
                'price': 1140,
                'pricechange': 'down'
            },{
                'name': 'Магнит',
                'price': 1370,
                'pricechange': 'down'
            }
        ]},
        {'id': 1, 'name': 'Лекарства','image': 'resources/categories/med.png', 'subname': 'Популярные лекарства', 'categoryitems':[{
                'name': 'Классика',
                'price': 1421,
                'pricechange': 'up'
            },{
                'name': '36,6',
                'price': 1670,
                'pricechange': 'down'
            },{
                'name': 'Ригла',
                'price': 1953,
                'pricechange': 'up'
            }
        ]},
        {'id': 2, 'name': 'Топливо','image': 'resources/categories/gas.png', 'subname': '92 бензин', 'categoryitems':[{
                'name': 'Пятерочка',
                'price': 1101,
                'pricechange': 'up'
            },{
                'name': 'Дикси',
                'price': 1140,
                'pricechange': 'down'
            },{
                'name': 'Магнит',
                'price': 1370,
                'pricechange': 'down'
            }
        ]}
    ]
})
