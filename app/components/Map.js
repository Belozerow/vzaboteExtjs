Ext.define('Vzabote.view.Map',{
    extend: 'Ext.ux.GMapPanel',
    alias: 'widget.map',
    travelmode: "DRIVING",
    
    initComponent: function(){
        this.waypoints = [];
        this.callParent(arguments);
        this.directionsService = new google.maps.DirectionsService();
        this.directionsDisplay = new google.maps.DirectionsRenderer();
        this.on('mapready', function(){
            this.setButtons();
        });
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
    },
    
    displayRoute: function(){
        if (this.waypoints.length == 0) 
            return;
        this.directionsDisplay.setMap(this.getMap());
        
        points = [];
        Ext.apply(points, this.waypoints, [])

        var request = {
            origin: this.initialLocation,
            destination: points.pop().location,
            waypoints: points,
            optimizeWaypoints: true,
            travelMode: google.maps.TravelMode[this.travelmode]
        };
        
        var me = this;
        this.directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                me.directionsDisplay.setDirections(response);
            }
        });
    },
    
    changeTravelMode: function(mode){
        if (mode in {"DRIVING":'', "WALKING":''})
            this.travelmode = mode;
        if (this.waypoints.length > 0) this.displayRoute();
    },
    
    clearRoute: function(){
        this.waypoints = [];
        this.directionsDisplay.setMap(null);
    },
    setButtons: function(){
	    var walking = this.getCustomButton('Пешком');
	    me = this;
	    this.customButton(walking,function(){
            me.changeTravelMode('WALKING');
		});
	    var driving = this.getCustomButton('На машине');
	    this.customButton(driving,function(){
            me.changeTravelMode('DRIVING');
		});
    },
	getCustomButton: function(text){
		var controlUI = document.createElement('DIV');
		controlUI.innerHTML = '<div class="x-button-label">'+text+'</div>';
		controlUI.className = "x-button x-button-dark";
		return controlUI;
	},
	customButton: function(controlUI,fn){
		google.maps.event.addDomListener(controlUI, 'click', fn);
	    this.getMap().controls[google.maps.ControlPosition.TOP_RIGHT].push(controlUI);
	}
});

