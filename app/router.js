Vzabote.router = {
    initRoutes: function(app){
        Path.map('#/index').to(function(){
            app.getController('Viewport').setActiveTab('mainpage'); 
        });
        Path.map('#/pricestat').to(function(){
            app.getController('Viewport').setActiveTab('pricestat');
        })
        Path.root('#/index');
        Path.listen();
    },
    dispatch: function(historyUrl){
        location.hash = historyUrl;
    }
}
