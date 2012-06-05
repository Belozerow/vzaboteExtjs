templates.viewport = {
    header: {
        tpl:
        	new Ext.XTemplate(
        		'<nav>'+
    				'<a id="home-tab" class="home-tab" href="#/index"></a>'+
    				'<a id="choose-tab" class="choose-tab" href="#">Выбор товаров</a>'+
    				'<a id="list-tab" class="list-tab" href="#/cart">Список покупок {[this.getCountProductInCart()]}</a>'+
    				'<a id="shops-tab" class="shops-tab" href="#">Выбор магазина</a>'+
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
