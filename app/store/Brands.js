Ext.define('Vzabote.store.Brands',{
    extend: 'Ext.data.Store',
    model: 'Vzabote.model.Brand',
    data: [
        {id: 1, name: 'Ромкор', image: 'resources/brands/romkor.png'},
        {id: 2, name: 'Калинка', image: 'resources/brands/kalinka.png'},
        {id: 3, name: 'Рамфуд', image: 'resources/brands/ramfood.png'},
        {id: 4, name: 'Ариант', image: 'resources/brands/romkor.png'},
        {id: 5, name: 'Калинка', image: 'resources/brands/kalinka.png'},
        {id: 6, name: 'Рамфуд', image: 'resources/brands/ramfood.png'},
        {id: 7, name: 'Ариант', image: 'resources/brands/romkor.png'}
    ],
    setSelecedItem: function(item){
       this.each(function(storeitem){
           storeitem.set('selected',false);
       },this);
       item.set('selected',true);
    }
});