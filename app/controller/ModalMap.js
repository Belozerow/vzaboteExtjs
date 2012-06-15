Ext.define('Vzabote.controller.ModalMap',{
    extend: 'Ext.app.Controller',
    animDuration: 700,
    popupIsShown: false,
    city: 'Челябинск',
    travelMode: 'DRIVING',
    init: function(){
        this.savedwaypoints = [];        
        this.control({
            '#modalmap-ok': {click: function(){
                    this.mapView.close();
                    this.savedwaypoints = this.mapView.gmap.waypoints;
                    this.travelMode = this.mapView.gmap.travelMode;
                }   
            },
            '#modalmap-addwaypoint': { click: function(){
                    wayp = this.mapView.findForm.getComponent("address_field").getValue() + ', ' + this.city;
                    me = this;
                    geocoded_waypoint = new google.maps.Geocoder().geocode({address : wayp}, function(a){ 
                        console.log(a);
                        loc = a[0].geometry.location;
//                        me.savedwaypoints.push({
//                            location: loc,
//                            stopover:true
//                        });
                        me.mapView.gmap.addWaypoint(loc);
                        me.mapView.gmap.displayRoute();
                    });
                }
            },
            '#modalmap-clear': {click: function(){
                   this.mapView.gmap.clearRoute();
                   this.savedwaypoints = [];
                   this.travelMode = 'DRIVING';
                }
            }
        });
    },

    index: function(query){
       
        this.getController('Viewport').closeAllWindows();

        if(!this.mapView||this.mapView.isDestroyed){
            points = [];
            Ext.apply(points, this.savedwaypoints);
            this.mapView = Ext.create('Vzabote.view.ModalMap',{waypoints: points, travelMode: this.travelMode});
            this.mapView.show();
        }
   }
});

// Воровского 10
