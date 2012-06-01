Vzabote.util = {
    storeOnLoad: function(store,callback,scope,onloadparams){
        if(store.isLoading()){
            store.on('load',callback,scope,onloadparams);
        }
        else{
            callback.call(scope);
        }        
    }
};
