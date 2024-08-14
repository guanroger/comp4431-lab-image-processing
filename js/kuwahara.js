(function(imageproc) {
    "use strict";

    /*
     * Apply Kuwahara filter to the input data
     */
    imageproc.kuwahara = function(inputData, outputData, size) {
        console.log("Applying Kuwahara filter...");

        /*
         * TODO: You need to extend the kuwahara function to include different
         * sizes of the filter
         *
         * You need to clearly understand the following code to make
         * appropriate changes
         */

        /*
         * An internal function to find the regional stat centred at (x, y)
         */
        function regionStat(x, y) {
            // Find the mean colour and brightness
			
			switch (size){
				case 5: 
				// the box is 3*3
				var div=3*3;
				var meanR = 0, meanG = 0, meanB = 0;
				var meanValue = 0; // brightness
				for (var j = -1; j <= 1; j++) {
					for (var i = -1; i <= 1; i++) {
						var pixel = imageproc.getPixel(inputData, x + i, y + j);

						// For the mean colour
						meanR += pixel.r;
						meanG += pixel.g;
						meanB += pixel.b;

						// For the mean brightness
						meanValue += (pixel.r + pixel.g + pixel.b) / 3;
					}
				}
				meanR /= div;
				meanG /= div;
				meanB /= div;
				meanValue /= div;

				// Find the variance
				var variance = 0;
				for (var j = -1; j <= 1; j++) {
					for (var i = -1; i <= 1; i++) {
						var pixel = imageproc.getPixel(inputData, x + i, y + j);
						var value = (pixel.r + pixel.g + pixel.b) / 3;

						variance += Math.pow(value - meanValue, 2);
					}
				}
				variance /= div;
				break;
				
				case 9: 
				// the box is 5*5
				var div=5*5;
				var meanR = 0, meanG = 0, meanB = 0;
				var meanValue = 0; // brightness
				for (var j = -2; j <= 2; j++) {
					for (var i = -2; i <= 2; i++) {
						var pixel = imageproc.getPixel(inputData, x + i, y + j);

						// For the mean colour
						meanR += pixel.r;
						meanG += pixel.g;
						meanB += pixel.b;

						// For the mean brightness
						meanValue += (pixel.r + pixel.g + pixel.b) / 3;
					}
				}
				meanR /= div;
				meanG /= div;
				meanB /= div;
				meanValue /= div;

				// Find the variance
				var variance = 0;
				for (var j = -2; j <= 2; j++) {
					for (var i = -2; i <= 2; i++) {
						var pixel = imageproc.getPixel(inputData, x + i, y + j);
						var value = (pixel.r + pixel.g + pixel.b) / 3;

						variance += Math.pow(value - meanValue, 2);
					}
				}
				variance /= div;
				break;
				
				case 13: 
				// the box is 7*7
				var div=7*7;
				var meanR = 0, meanG = 0, meanB = 0;
				var meanValue = 0; // brightness
				for (var j = -3; j <= 3; j++) {
					for (var i = -3; i <= 3; i++) {
						var pixel = imageproc.getPixel(inputData, x + i, y + j);

						// For the mean colour
						meanR += pixel.r;
						meanG += pixel.g;
						meanB += pixel.b;

						// For the mean brightness
						meanValue += (pixel.r + pixel.g + pixel.b) / 3;
					}
				}
				meanR /= div;
				meanG /= div;
				meanB /= div;
				meanValue /= div;

				// Find the variance
				var variance = 0;
				for (var j = -3; j <= 3; j++) {
					for (var i = -3; i <= 3; i++) {
						var pixel = imageproc.getPixel(inputData, x + i, y + j);
						var value = (pixel.r + pixel.g + pixel.b) / 3;

						variance += Math.pow(value - meanValue, 2);
					}
				}
				variance /= div;
				break;
			}	

            // Return the mean and variance as an object
            return {
                mean: {r: meanR, g: meanG, b: meanB},
                variance: variance
            };
        }

        for (var y = 0; y < inputData.height; y++) {
            for (var x = 0; x < inputData.width; x++) {
				
				switch (size){
					case 5:
					// Find the statistics of the four sub-regions
					var regionA = regionStat(x - 1, y - 1, inputData);
					var regionB = regionStat(x + 1, y - 1, inputData);
					var regionC = regionStat(x - 1, y + 1, inputData);
					var regionD = regionStat(x + 1, y + 1, inputData);
					break;
					
					case 9:
					// Find the statistics of the four sub-regions
					var regionA = regionStat(x - 2, y - 2, inputData);
					var regionB = regionStat(x + 2, y - 2, inputData);
					var regionC = regionStat(x - 2, y + 2, inputData);
					var regionD = regionStat(x + 2, y + 2, inputData);
					break;
					
					case 13:
					// Find the statistics of the four sub-regions
					var regionA = regionStat(x - 3, y - 3, inputData);
					var regionB = regionStat(x + 3, y - 3, inputData);
					var regionC = regionStat(x - 3, y + 3, inputData);
					var regionD = regionStat(x + 3, y + 3, inputData);
					break;
				}

                // Get the minimum variance value
                var minV = Math.min(regionA.variance, regionB.variance,
                                    regionC.variance, regionD.variance);

                var i = (x + y * inputData.width) * 4;

                // Put the mean colour of the region with the minimum
                // variance in the pixel
                switch (minV) {
                case regionA.variance:
                    outputData.data[i]     = regionA.mean.r;
                    outputData.data[i + 1] = regionA.mean.g;
                    outputData.data[i + 2] = regionA.mean.b;
                    break;
                case regionB.variance:
                    outputData.data[i]     = regionB.mean.r;
                    outputData.data[i + 1] = regionB.mean.g;
                    outputData.data[i + 2] = regionB.mean.b;
                    break;
                case regionC.variance:
                    outputData.data[i]     = regionC.mean.r;
                    outputData.data[i + 1] = regionC.mean.g;
                    outputData.data[i + 2] = regionC.mean.b;
                    break;
                case regionD.variance:
                    outputData.data[i]     = regionD.mean.r;
                    outputData.data[i + 1] = regionD.mean.g;
                    outputData.data[i + 2] = regionD.mean.b;
                }
            }
        }
    }
 
}(window.imageproc = window.imageproc || {}));
