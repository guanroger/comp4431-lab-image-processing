(function(imageproc) {
    "use strict";

    /* Comic palette colour list */
    var palette = [
        [254, 251, 198],
        [255, 247, 149],
        [255, 240,   1],
        [189, 223, 198],
        [120, 201, 195],
        [  0, 166, 192],
        [190, 219, 152],
        [128, 197, 152],
        [  0, 163, 154],
        [251, 194, 174],
        [244, 148, 150],
        [234,  31, 112],
        [253, 193, 133],
        [246, 146, 120],
        [235,  38,  91],
        [184, 229, 250],
        [109, 207, 246],
        [  0, 173, 239],
        [249, 200, 221],
        [244, 149, 189],
        [233,   3, 137],
        [183, 179, 216],
        [122, 162, 213],
        [  0, 140, 209],
        [184, 137, 189],
        [132, 127, 185],
        [  0, 111, 182],
        [183,  42, 138],
        [143,  50, 141],
        [ 56,  58, 141],
        [187, 176, 174],
        [132, 160, 172],
        [  0, 137, 169],
        [188, 135, 151],
        [139, 126, 152],
        [  1, 110, 151],
        [198, 216,  54],
        [138, 192,  68],
        [  0, 160,  84],
        [190, 175, 136],
        [135, 159, 137],
        [  0, 137, 139],
        [189, 136, 120],
        [140, 126, 123],
        [  0, 110, 125],
        [255, 189,  33],
        [247, 145,  44],
        [236,  42,  50],
        [186,  45, 114],
        [144,  52, 115],
        [ 59,  59, 121],
        [194, 171,  57],
        [142, 156,  68],
        [  0, 135,  79],
        [189,  50,  55],
        [147,  56,  62],
        [ 61,  60,  65],
        [188,  48,  93],
        [145,  54,  97],
        [ 61,  60, 102],
        [191, 134,  57],
        [145, 125,  66],
        [  0, 108,  72],
        [  0,   0,   0],
        [255, 255, 255],
    ];

    /*
     * Convert the colours in the input data to comic colours
     */
    imageproc.comicColor = function(inputData, outputData, saturation) {
        console.log("Applying comic color...");

        /*
         * TODO: You need to complete the comic colour function so that
         * the pixels are mapped to one of the comic colours
         */

        for (var i = 0; i < inputData.data.length; i += 4) {
            var r = inputData.data[i];
            var g = inputData.data[i + 1];
            var b = inputData.data[i + 2];
			
			//var multiplier= parseInt($("#comic-color-saturation").val());

            // First, you convert the colour to HSL
            // then, increase the saturation by the saturation factor
            // ***** beware of the final range of the saturation *****
            // after that, convert it back to RGB
			var h= imageproc.fromRGBToHSV(r,g,b).h;
			var s= imageproc.fromRGBToHSV(r,g,b).s;
			var v= imageproc.fromRGBToHSV(r,g,b).v;
			
			if (s*saturation >1){
				s=1;
			}else if (s*saturation <0){
				s=0;
			}else{
				s=s*saturation;
			}
			
			var r =imageproc.fromHSVToRGB(h,s,v).r;
			var g =imageproc.fromHSVToRGB(h,s,v).g;
			var b =imageproc.fromHSVToRGB(h,s,v).b;
			
            // Second, based on the saturated colour, find the matching colour
            // from the comic colour palette
            // This is done by finding the minimum distance between the colours
			
			var matchID=0;
			var minDistance =999;
			
			for (var j=0; j<palette.length; j++){
				//.....
				var colorRed =palette[j][0];
				var colorGreen =palette[j][1];
				var colorBlue = palette[j][2];
				var distance = Math.hypot(colorRed-r, colorGreen-g, colorBlue-b);
				//console.log(distance);
				if (distance <minDistance){
					minDistance=distance;
					matchID=j;
				}
				
			}
			var comicR=palette[matchID][0];
			var comicG=palette[matchID][1];
			var comicB=palette[matchID][2];

            inputData.data[i]     = comicR;
            inputData.data[i + 1] = comicG;
            inputData.data[i + 2] = comicB;
			
			outputData.data[i]     = inputData.data[i];
			outputData.data[i + 1] = inputData.data[i + 1];
			outputData.data[i + 2] = inputData.data[i + 2];
        }
    }
 
}(window.imageproc = window.imageproc || {}));
