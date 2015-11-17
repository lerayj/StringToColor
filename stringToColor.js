


var carac = 'abcdefghijklmnopqrstuvwxyz1234567890&"(§!)-_,;:/.+=$%<>@#';

function caracValue (car) {
	return ((carac.indexOf(car)+50)*42)%200;
}

//max hexa par couleur ff == 255
function strToHexa(str, ranged){
	var rgbArr = [0,0,0];
	var result = null;

	for (var i = 0, len = str.length; i < len; i++) {
		var val = caracValue(str[i]);
		console.log("CHAR: ", str[i], " CODE: ", str[i].charCodeAt(0));
		if(i % 3 == 0){
			rgbArr[0] +=  val;
		}
		else if (i % 3 == 1){
			rgbArr[1] +=  val;
		}
		else if (i % 3 == 2){
			rgbArr[2] +=  val;
		}
	}

	rgbArr.forEach(function(elem, idx){
		var i = 0;
		while (elem >= 255) {
			elem = elem - str.charCodeAt(i);
			idx++;
		};
		rgbArr[idx] = Math.round(elem);
	});
	console.log("decimal r: ", rgbArr[0], " g: ", rgbArr[1], " b: " + rgbArr[2]);
	if (ranged)
		return checkLuminosity(formatHexaColorString(rgbArr[0], rgbArr[1], rgbArr[2]));
	return formatHexaColorString(rgbArr[0], rgbArr[1], rgbArr[2]);
}

function formatHexaColorString(r,g,b){
		var r = r.toString(16),
		g = g.toString(16),
		b = b.toString(16);

	if(r.length == 1)
		r = "0" + r;
	if(g.length == 1)
		g = "0" + g;
	if (b.length == 1)
		b = "0" + b;

	if(r.length > 2)
		r = r.slice(0, -1);;
	if(g.length > 2)
		g = g.slice(0, -1);
	if (b.length > 2)
		b = b.slice(0, -1);;
	console.log("Hexa r: ", r, "g: ", g, "b: ", b);
	return "#" + r + g + b;
}

function getGradient(hexaString, nbGradients){
	var hexa = hexaString.substring(1),
		r = parseInt(hexa.substring(0,2),16),
		g = parseInt(hexa.substring(2,4),16),
		b = parseInt(hexa.substring(4,6),16),
		gradients = [];

	console.log("color decimal (from G): ", r, " ", g, " ", b);

	for (var i = 0; i < nbGradients; i++) {
		r = Math.round(r + (i * (r * (10/100)))); 
		g = Math.round(g + (i * (g * (10/100)))); 
		b = Math.round(b + (i * (b * (10/100)))); 
		if(r > 255)
			r = 255;
		if(g > 255)
			g = 255;
		if(b > 255)
			b = 255;
		gradients.push(formatHexaColorString(r,g,b));
	}
	console.log("gradients: ", gradients);
	return gradients;

}

//remove 5% et refaire le calcul de la couleur si trop clair
function checkLuminosity(hexa){
	var c = hexa.substring(1); 
	var rgb = parseInt(c, 16);
	var r = (rgb >> 16) & 0xff;
	var g = (rgb >>  8) & 0xff;
	var b = (rgb >>  0) & 0xff;

	var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;

	if (luma < 40) {
		console.log("LUMA 40+");
		r = parseInt(hexa.substring(0,2),16),
		g = parseInt(hexa.substring(2,4),16),
		b = parseInt(hexa.substring(4,6),16);

		r = Math.round(r - (r * (5/100))); 
		g = Math.round(g - (g * (5/100))); 
		b = Math.round(b - (b * (5/100))); 
		formatHexaColorString(r,g,b);
	}
	return hexa;
	
}
