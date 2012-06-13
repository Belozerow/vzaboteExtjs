Ext.define('Vzabote.store.Shops', {
	extend: 'Ext.data.Store',
	model: 'Vzabote.model.Shop',
	requires: 'Vzabote.model.Shop',
	
	data: [
	        {id: 1, name: 'Пятерочка', image: 'resources/products/farsh.png', address: 'ул. Героев Танкограда, д.128'},
	        {id: 2, name: 'Магнит', image: 'resources/products/farsh.png', address: 'ул. Горького, д.48'},
	        {id: 3, name: 'Максим', image: 'resources/products/farsh.png', address: 'ул. Горького, д.36'},
	        {id: 4, name: 'Магнит', image: 'resources/products/farsh.png', address: 'пр-т Победы, д.128'},
	        {id: 5, name: 'Пятерочка', image: 'resources/products/farsh.png', address: 'ул. Героев Танкограда, д.58'},
	        {id: 6, name: 'Смак', image: 'resources/products/farsh.png', address: 'ул. Цвилинга, д.46'},
	        {id: 7, name: 'Пекарочка', image: 'resources/products/farsh.png', address: 'пр-т Победы, д.118'},
	        {id: 8, name: 'Пятерочка', image: 'resources/products/farsh.png', address: 'ул. Героев Танкограда, д.13'},
	        {id: 9, name: 'Гастроном', image: 'resources/products/farsh.png', address: 'ул. Цвилинга, д.81'}
	    ]    

});
