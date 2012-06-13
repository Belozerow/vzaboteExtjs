Ext.define('Vzabote.view.Map',{
    extend: 'Ext.ux.GMapPanel',
    alias: 'widget.map',
    initComponent: function(){
        this.waypoints = [];
        this.callParent(arguments);
    },
    showMyPoint: function(){
        var me = this;
        navigator.geolocation.getCurrentPosition(function(position) {
            me.initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
            me.addMarker(me.initialLocation, me.setCenter, false, true);
        }, function() {
                console.log("No location found");
            });
    },
    addWaypoint: function(point, city){
            this.waypoints.push({
                location: point + ', ' + city,
                stopover:true
            });
            
            var directionsService = new google.maps.DirectionsService();
            directionsDisplay = new google.maps.DirectionsRenderer();
            directionsDisplay.setMap(this.getMap());
            
            points = [];
            Ext.apply(points, this.waypoints, [])

            var request = {
                origin: this.initialLocation,
                destination: points.pop().location,
                waypoints: points,
                optimizeWaypoints: true,
                // Note that Javascript allows us to access the constant
                // using square brackets and a string value as its
                // "property."
                travelMode: google.maps.TravelMode["DRIVING"]
                //travelMode: google.maps.TravelMode["WALKING"]
            };
            directionsService.route(request, function(response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                }
            });
    },
});
