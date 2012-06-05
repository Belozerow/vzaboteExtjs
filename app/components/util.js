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
            
    }
};
