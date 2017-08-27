$(document).ready(function() {
	var lon, // Variable Name for Longitude
		lat, // Variable Name for Latitude
		fTemp, // Variable Name for Fahrenheit Temperature
		cTemp, // Variable Name for Celsius Temperature
		kTemp, // Variable Name for Kelvin
		xyz = document.getElementById('container'), // Variable for Browser Incompatibility
		tempSwap = true; // Variable Name for Temperature Swapping Fahrenheit to Celsius or Fahrenheit to Celsius.
	
	// FCC Get Geo-Location
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			// Assigning the 'Longitude' and 'Latitude' to a variable called 'lon' and 'lat'
			lon = position.coords.longitude;
			lat = position.coords.latitude;
                
			// FCC Weather API
			var api = "https://fcc-weather-api.glitch.me/api/current?lat="+lat+"&lon="+lon+"";
		
			$.getJSON(api, function(data){
				// JSON call for FCC Weather API
				kTemp = data.main.temp - 2; // Temperature of Kelvin
				var city = data.name; // Getting the City Name
				var country = data.sys.country; // Getting the Country Name
				var weatherIcon = data.weather[0].icon; // Getting the Image from FCC Weather API
				var weatherIconAlt = data.weather[0].main; // Getting your current weather
				var icon = document.createElement("img"); // Inserting the <img> tag to <li> tag
				icon.src = weatherIcon; // Image Source Link
				icon.alt = weatherIconAlt; // Image Attribute 
				document.body.appendChild(icon); // Displaying the Image
				
				console.log(api); //This is used for checking your current API
        
				// Converting from Kelvin to Fahrenheit
				fTemp = ((9/5) * (kTemp) + 32 - 1 ).toFixed();
				// Temperature of Celsius
				cTemp = (kTemp).toFixed();
				
				$('#fTemp').html(fTemp + '&#176;' + ' F');
					// Switching Temperature from Fahrenheit to Celsius or Celsius to Fahrenheit.
					$('#fTemp').click(function(){
						if(tempSwap === false) {
							$('#fTemp').html(fTemp + '&#176;' + ' F'); // '&#176' is the ASCII Code for Degree
							tempSwap = true;
						} else {
							$('#fTemp').html(cTemp + '&#176;' + ' C'); // '&#176' is the ASCII Code for Degree
							tempSwap = false;
						}
					});
				$('#location').html(city + ' , ' + country);
				$('#weatherIcon').html(icon);
			});
		});
	} else {
        xyz.innerHTML = "Geolocation is not supported by this browser.";
  }
});