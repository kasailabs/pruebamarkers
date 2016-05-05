$( document ).ready(function() {
	var milat;
	var milong;
    getLocation();

    $('#button').click(function(){
    	console.log($('.selectpicker option:selected').val())
        getLocation2();
    });
});

function getInfo(latitude,longitude){
	$.ajax({
                url: "http://www3.inegi.org.mx/sistemas/api/denue/v1/consulta/buscar/restaurantes/"+latitude+","+longitude+"/200/fc4a61b7-bde5-8b71-a9b6-3b8ef4d91362",
                type: "GET",
                dataType: "json",
                success: function(resp) {  
                	for(var i = 0; i < resp.length; i++){ 
                		console.log(resp[i].Nombre);
                	}
                	
                }
            });
};

function initMap(latitude,longitude, map) {
        var mapDiv = document.getElementById('map');
        var map = new google.maps.Map(mapDiv, {
          center: {lat: latitude, lng: longitude},
          zoom: 14
        });
        var marker = new google.maps.Marker({
		position: {lat:  latitude,lng: longitude},
		map: map,
			});
        

      };


function initMap_click(latitude,longitude,categoria) {
        var mapDiv = document.getElementById('map');
        var map = new google.maps.Map(mapDiv, {
          center: {lat: latitude, lng: longitude},
          zoom: 14
        });
        
		$.ajax({
                url: "http://www3.inegi.org.mx/sistemas/api/denue/v1/consulta/buscar/"+categoria+"/"+latitude+","+longitude+"/500/fc4a61b7-bde5-8b71-a9b6-3b8ef4d91362",
                type: "GET",
                dataType: "json",
                success: function(resp) {  
                	for(var i = 0; i < resp.length; i++){ 
                		console.log(resp[i].Latitud);
                		var marker = new google.maps.Marker({
						  position: {lat:  parseFloat(resp[i].Latitud),lng: parseFloat(resp[i].Longitud)},
						  map: map,
						});
                	}
                	
                }
            });

      };
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x$('#demo').append("Geolocation is not supported by this browser.");
    }
};

function showPosition(position) {
    initMap(position.coords.latitude,position.coords.longitude);
}

function getLocation2() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition2);
    } else {
        x$('#demo').append("Geolocation is not supported by this browser.");
    }
};

function showPosition2(position) {
    initMap_click(position.coords.latitude,position.coords.longitude, $('.selectpicker option:selected').val());
}


