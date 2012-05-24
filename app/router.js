Vzabote.router = {
    initRoutes: function(app){
        Path.map('#/index').to(function(){
            app.getController('CategorySelect').index(this.params) 
        });
        Path.map('#/pricestat').to(function(){
            app.getController('CategorySelect').pricestat(this.params)
        })
        Path.root('#/index');
        Path.listen();
    },
    dispatch: function(historyUrl){
        location.hash = historyUrl;
    }
}
