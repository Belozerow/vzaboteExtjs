Ext.define('Vzabote.controller.ModalMap',{
   extend: 'Ext.app.Controller',
   animDuration: 700,
   popupIsShown: false,
   init: function(){
       this.control({

       });
   },

   index: function(query){
       
            this.getController('Viewport').closeAllWindows();

            if(!this.mapView||this.mapView.isDestroyed){
                this.mapView = Ext.create('Vzabote.view.ModalMap',{});
                this.mapView.show();
            }
   }
});

