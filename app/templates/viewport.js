templates.viewport = {
    header: {
        tpl:
        	new Ext.XTemplate(
        		'<nav>'+
    				'<a id="home-tab" class="home-tab nav-tab<tpl if="this.isActive(\'home\')"> active</tpl>" href="{home.url}"></a>'+
    				'<tpl if="products.url">'+
    				    '<a id="choose-tab" class="choose-tab nav-tab<tpl if="this.isActive(\'products\')"> active</tpl>" href="{products.url}">Выбор товаров</a>'+
				    '</tpl>'+
				    '<tpl if="!products.url">'+
                        '<div id="choose-tab" class="choose-tab nav-tab<tpl if="this.isActive(\'products\')"> active</tpl>">Выбор товаров</div>'+
                    '</tpl>'+
                    
                    '<tpl if="cart.url">'+
                        '<a id="list-tab" class="list-tab nav-tab<tpl if="this.isActive(\'cart\')"> active</tpl>" href="{cart.url}">Список покупок <tpl if="this.getCountProductInCart()"><div class="badge">{[this.getCountProductInCart()]}</div></tpl></a>'+
                    '</tpl>'+
                    '<tpl if="!cart.url">'+
                        '<div id="list-tab" class="list-tab nav-tab<tpl if="this.isActive(\'cart\')"> active</tpl>">Список покупок <tpl if="this.getCountProductInCart()"><div class="badge">{[this.getCountProductInCart()]}</div></tpl></div>'+
                    '</tpl>'+
                    
    				'<tpl if="shops.url">'+
                        '<a id="shops-tab" class="shops-tab nav-tab<tpl if="this.isActive(\'shops\')"> active</tpl>" href="{shops.url}">Выбор магазина</a>'+
                    '</tpl>'+
                    '<tpl if="!shops.url">'+
                        '<div id="shops-tab" class="shops-tab nav-tab<tpl if="this.isActive(\'shops\')"> active</tpl>">Выбор магазина</div>'+
                    '</tpl>'+
    			'</nav>',
    			{
        			getCountProductInCart: function(){
        				var UserCart = Ext.getStore('UserCart');
        				if (UserCart){
        					return UserCart.getCount();
        				}
        			},
        			isActive: function(name){
        			    return Vzabote.bc.getActive()==name;
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
