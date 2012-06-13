templates.login = {
    tabs: {
        html: '<div id="signintab">Вход в систему</div><div id="signuptab">Регистрация</div>'
    },
    neironLogin: {
        html: 'С логином Neiron'
    },
    neironReg: {
        html: 'Для регистрации заполните два поля'  
    },
    loginBy: {
        html: '<div>Через соц. сети</div>'+
              '<div class="vkontakte"></div>'+
              '<div class="google"></div>'+
              '<div class="facebook"></div>'+
              '<div class="tweeter"></div>'+
              '<div class="odnoglazniki"></div>'
    },
    authtitle: {
        html: 'Профиль пользователя'
    },
    logout: {
        text: '<div class="logout"></div>' 
    },
    close: {
        text: 'Закрыть'
    },
    carts: {
        tpl: new Ext.XTemplate(
            '<tpl if="this.hasCarts()">'+
                'Списки покупок'+
            '</tpl>'+
            '<tpl for=".">'+
                '<tpl if="custom">'+
                    '<div class="loginpopup-cart-item">'+
                        '<div>{name}</div>'+
                        '<div class="cart-delete">X</div>'+
                    '</div>'+
                '</tpl>'+
                '<tpl if="!custom">'+
                    '<div class="loginpopup-cart-item"></div>'+
                '</tpl>'+
            '</tpl>',{
                hasCarts: function(){
                    return Ext.getStore('Carts').hasCustom();
                }
            }
        )
    }
}