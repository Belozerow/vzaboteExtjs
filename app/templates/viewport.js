templates.viewport = {
    header: {
        tpl:
        	new Ext.XTemplate(
        		'<nav>'+
    				'<a id="home-tab" class="home-tab nav-tab" href="{home.url}"></a>'+
    				'<tpl if="products.url">'+
    				    '<a id="choose-tab" class="choose-tab nav-tab" href="{products.url}">Выбор товаров</a>'+
				    '</tpl>'+
				    '<tpl if="!products.url">'+
                        '<div id="choose-tab" class="choose-tab nav-tab">Выбор товаров</div>'+
                    '</tpl>'+
                    
                    '<tpl if="cart.url">'+
                        '<a id="list-tab" class="list-tab nav-tab" href="{cart.url}">Список покупок <tpl if="this.getCountProductInCart()"><div class="badge">{[this.getCountProductInCart()]}</div></tpl></a>'+
                    '</tpl>'+
                    '<tpl if="!cart.url">'+
                        '<div id="list-tab" class="list-tab nav-tab">Список покупок <tpl if="this.getCountProductInCart()"><div class="badge">{[this.getCountProductInCart()]}</div></tpl></div>'+
                    '</tpl>'+
                    
    				'<tpl if="shops.url">'+
                        '<a id="shops-tab" class="shops-tab nav-tab" href="{shops.url}">Выбор магазина</a>'+
                    '</tpl>'+
                    '<tpl if="!shops.url">'+
                        '<div id="shops-tab" class="shops-tab nav-tab">Выбор магазина</div>'+
                    '</tpl>'+
    			'</nav>',
    			{
        			getCountProductInCart: function(){
        				var UserCart = Ext.getStore('UserCart');
        				if (UserCart){
        					return UserCart.getCount();
        				}
        			}
    			})
    },
    footer: {
        html: '<div class="copyright">&copy; neiron.com, 2011-2012</div>'
    },
    addshop: {
        text: '<div class="add-shop-button">Добавить предприятие</div>'
    },
    login: {
        text: '<div class="login"></div>'   
    }    
}
