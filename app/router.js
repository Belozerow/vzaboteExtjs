Vzabote.router = {
    initRoutes: function(app){
        Path.map('#/index').to(function(){
            app.getController('CategorySelect').index(this.params);
        });
        Path.map('#/pricestat').to(function(){
            app.getController('CategorySelect').pricestat(this.params);
        });
        Path.map('#/products').to(function(){
            app.getController('Product').index(this.params); 
        });
        Path.map('#/products/:id').to(function(){
            app.getController('Product').product(this.params); 
        });
        Path.map('#/products/carts/:id').to(function(){
            app.getController('Product').carts(this.params); 
        });
        Path.map('#/cart').to(function(){
            app.getController('ShoppingList').index(this.params); 
        });
        Path.root('#/index');
        Path.listen();
    },
    dispatch: function(historyUrl){
        location.hash = historyUrl;
    }
}
