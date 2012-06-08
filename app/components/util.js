Vzabote.util = {
    /*
     * Выполняется по событию или сразу, если событие уже произошло
     * element
     * e - event
     * checkFn - функция или параметр проверки произошло ли событие, например store.isLoading
     * checkVal - значение возвращаемое checkFn, если событие не произошло
     * callback
     * scope
     * onloadparams - параметры передаваемые в обработчик события, например {single: true} 
     */
    onEventOrNow: function(element,e,checkFn,checkVal,callback,scope,onloadparams){
        if(!onloadparams)
            onloadparams = {single: true};
        if(Ext.isFunction(checkFn)){
            if(checkFn.call(element) === checkVal)
                element.on(e,callback,scope,onloadparams);
            else
                callback.call(scope);
        }    
        else{
            if(element[checkFn] === checkVal)
                element.on(e,callback,scope,onloadparams);
            else
                callback.call(scope);
        }
            
    },
    declination: function(number,titles){
        var decCases = [2,0,1,1,1,2],
        decCache = [];
        if(!decCache[number]) decCache[number] = number % 100 > 4 && number % 100 < 20 ? 2 : decCases[Math.min(number % 10, 5)];
            return titles[decCache[number]];
    },
    offer: function(number){
        return Vzabote.util.declination(number,['предложение', 'предложения', 'предложений']);     
    },
    shop: function(number){
        return Vzabote.util.declination(number,['магазин', 'магазина', 'магазинов']);     
    },
    price: function(price){
        return (price)?price.toFixed(1).toString().replace('.',','):0;
    },
    product: function(number){
        return Vzabote.util.declination(number,['товар', 'товара', 'товаров']);
    }
};
Ext.apply(Ext.form.field.VTypes,{
    emailText: 'Электронная почта должна быть в формате: "user@example.com"'
});
