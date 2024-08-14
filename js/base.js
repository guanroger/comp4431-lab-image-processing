(function(imageproc) {
    "use strict";

    /*
     * Apply negation to the input data
     */
    imageproc.negation = function(inputData, outputData) {
        console.log("Applying negation...");

        for (var i = 0; i < inputData.data.length; i += 4) {
            inputData.data[i]     = 255 - inputData.data[i];
            inputData.data[i + 1] = 255 - inputData.data[i + 1];
            inputData.data[i + 2] = 255 - inputData.data[i + 2];
			
			outputData.data[i]     = inputData.data[i];
			outputData.data[i + 1] = inputData.data[i + 1];
			outputData.data[i + 2] = inputData.data[i + 2];
        }
    }

    /*
     * Convert the input data to grayscale
     */
    imageproc.grayscale = function(inputData, outputData) {
        console.log("Applying grayscale...");

        /**
         * TODO: You need to create the grayscale operation here
         */

        for (var i = 0; i < inputData.data.length; i += 4) {
            // Find the grayscale value using simple averaging
			var intensity= (inputData.data[i]+inputData.data[i+1]+inputData.data[i+2])/3;
			inputData.data[i]=intensity;
			inputData.data[i+1]=intensity;
			inputData.data[i+2]=intensity;
           
            // Change the RGB components to the resulting value

            outputData.data[i]     = inputData.data[i];
            outputData.data[i + 1] = inputData.data[i + 1];
            outputData.data[i + 2] = inputData.data[i + 2];
        }
    }

    /*
     * Applying brightness to the input data
     */
    imageproc.brightness = function(inputData, outputData, offset) {
        console.log("Applying brightness...");

        /**
         * TODO: You need to create the brightness operation here
         */

        for (var i = 0; i < inputData.data.length; i += 4) {
            // Change the RGB components by adding an offset
			// get the offset number
			var offset= parseFloat($("#brightness-offset").val());
			
			// handle the clipping
			if (inputData.data[i]+offset > 255)
				inputData.data[i]=255;
			else if (inputData.data[i]+offset < 0)
				inputData.data[i]=0;
			else
				inputData.data[i]=inputData.data[i]+offset;
			
			if (inputData.data[i+1]+offset > 255)
				inputData.data[i+1]=255;
			else if (inputData.data[i+1]+offset < 0)
				inputData.data[i+1]=0;
			else
				inputData.data[i+1]=inputData.data[i+1]+offset;
			
			if (inputData.data[i+2]+offset > 255)
				inputData.data[i+2]=255;
			else if (inputData.data[i+2]+offset < 0)
				inputData.data[i+2]=0;
			else
				inputData.data[i+2]=inputData.data[i+2]+offset;

            outputData.data[i]     = inputData.data[i];
            outputData.data[i + 1] = inputData.data[i + 1];
            outputData.data[i + 2] = inputData.data[i + 2];

            // Handle clipping of the RGB components
        }
    }

    /*
     * Applying contrast to the input data
     */
    imageproc.contrast = function(inputData, outputData, factor) {
        console.log("Applying contrast...");

        /**
         * TODO: You need to create the brightness operation here
         */

        for (var i = 0; i < inputData.data.length; i += 4) {
            // Change the RGB components by multiplying a factor
			// get the offset number
			var offset= parseFloat($("#contrast-factor").val());
			
			// handle the clipping
			if (inputData.data[i]*offset > 255)
				inputData.data[i]=255;
			else
				inputData.data[i]=inputData.data[i]*offset;
			
			
			if (inputData.data[i+1]*offset > 255)
				inputData.data[i+1]=255;
			else
				inputData.data[i+1]=inputData.data[i+1]*offset;
			
			
			if (inputData.data[i+2]*offset > 255)
				inputData.data[i+2]=255;
			else
				inputData.data[i+2]=inputData.data[i+2]*offset;
			

            outputData.data[i]     = inputData.data[i];
            outputData.data[i + 1] = inputData.data[i + 1];
            outputData.data[i + 2] = inputData.data[i + 2];

            // Handle clipping of the RGB components
        }
    }

    /*
     * Make a bit mask based on the number of MSB required
     */
    function makeBitMask(bits) {
        var mask = 0;
        for (var i = 0; i < bits; i++) {
            mask >>= 1;
            mask |= 128;
        }
        return mask;
    }

    /*
     * Apply posterization to the input data
     */
    imageproc.posterization = function(inputData, outputData,
                                       redBits, greenBits, blueBits) {
        console.log("Applying posterization...");

        /**
         * TODO: You need to create the posterization operation here
         */

        // Create the red, green and blue masks
        // A function makeBitMask() is already given

        for (var i = 0; i < inputData.data.length; i += 4) {
            // Apply the bitmasks onto the RGB channels
			var redBits= parseFloat($("#posterization-red-bits").val());
			var greenBits= parseFloat($("#posterization-green-bits").val());
			var blueBits= parseFloat($("#posterization-blue-bits").val());
			
			var redBitMask=makeBitMask(redBits);
			var greenBitMask=makeBitMask(greenBits);
			var blueBitMask=makeBitMask(blueBits);
			
			inputData.data[i]     = inputData.data[i] & redBitMask;
            inputData.data[i + 1] = inputData.data[i + 1] & blueBitMask;
            inputData.data[i + 2] = inputData.data[i + 2] & greenBitMask;
			
			

            outputData.data[i]     = inputData.data[i];
            outputData.data[i + 1] = inputData.data[i + 1];
            outputData.data[i + 2] = inputData.data[i + 2];
        }
    }

    /*
     * Apply threshold to the input data
     */
    imageproc.threshold = function(inputData, outputData, thresholdValue) {
        console.log("Applying thresholding...");

        /**
         * TODO: You need to create the thresholding operation here
         */

        for (var i = 0; i < inputData.data.length; i += 4) {
            // Find the grayscale value using simple averaging
            // You will apply thresholding on the grayscale value
			var intensity= (inputData.data[i]+inputData.data[i+1]+inputData.data[i+2])/3;
			var threshold= parseFloat($("#threshold-value").val());
           
            // Change the colour to black or white based on the given threshold
			if (intensity >= threshold){
				inputData.data[i]=255;
				inputData.data[i+1]=255;
				inputData.data[i+2]=255;
			}else{
				inputData.data[i]=0;
				inputData.data[i+1]=0;
				inputData.data[i+2]=0;
			}

            outputData.data[i]     = inputData.data[i];
            outputData.data[i + 1] = inputData.data[i + 1];
            outputData.data[i + 2] = inputData.data[i + 2];
        }
    }

    /*
     * Build the histogram of the image for a channel
     */
    function buildHistogram(inputData, channel) {
        var histogram = [];
        for (var i = 0; i < 256; i++)
            histogram[i] = 0;

        /**
         * TODO: You need to build the histogram here
         */

        // Accumulate the histogram based on the input channel
        // The input channel can be:
        // "red"   - building a histogram for the red component
        // "green" - building a histogram for the green component
        // "blue"  - building a histogram for the blue component
        // "gray"  - building a histogram for the intensity
        //           (using simple averaging)
		switch (channel){
			case "gray":
				/*for (var y = 0; y < inputData.height; y++) {
					for (var x = 0; x < inputData.width; x++) {
						var pixel = imageproc.getPixel(inputData, x, y);

						// Change the colour to grayscale and normalize it
						var intensity = (pixel.r + pixel.g + pixel.b) / 3;
						
						histogram[intensity]+=1;
						//console.log(histogram.slice(0, 10).join(","));
						
					}
				*/
				for (var i = 0; i < inputData.data.length; i+=4) {
					var intensity = parseInt(( inputData.data[i]+ inputData.data[i+1] + inputData.data[i+2]) / 3);
					histogram[intensity]=histogram[intensity]+1;
				}
				
				/*for (var i = 0; i < inputData.data.length; i+=4) {
					histogram[inputData.data[i]]=histogram[inputData.data[i]]+1;
				}*/
				
				break;
			case "red":
				for (var i = 0; i < inputData.data.length; i+=4) {
					histogram[inputData.data[i]]=histogram[inputData.data[i]]+1;
				}
			
				break; 
			case "green":
				for (var i = 0; i < inputData.data.length; i+=4) {
					histogram[inputData.data[i+1]]=histogram[inputData.data[i+1]]+1;
				}
			
				break;
			case "blue":
				for (var i = 0; i < inputData.data.length; i+=4) {
					histogram[inputData.data[i+2]]=histogram[inputData.data[i+2]]+1;
				}
			
			    break;
		}
		

        return histogram;
    }

    /*
     * Find the min and max of the histogram
     */
    function findMinMax(histogram, pixelsToIgnore) {
        var min = 0, max = 255;

        /**
         * TODO: You need to build the histogram here
         */

        // Find the minimum in the histogram with non-zero value by
        // ignoring the number of pixels given by pixelsToIgnore
		
		var currentIgnoredPixel = 0;
		for (min = 0; min < 255; min++) {
			currentIgnoredPixel=currentIgnoredPixel+histogram[min];
			
			if (histogram[min] > 0){
				
				if (currentIgnoredPixel>=pixelsToIgnore)
					break;
				
			}
			
		}
       
        // Find the maximum in the histogram with non-zero value by
        // ignoring the number of pixels given by pixelsToIgnore
		
		currentIgnoredPixel = 0;
        for (max = 255; max >=0 ; max--) {
			currentIgnoredPixel=currentIgnoredPixel+histogram[max];
			//if (histogram[max] > 0&& currentIgnoredPixel>=(pixelsToIgnore/2)){
			if (histogram[max] > 0){
				//max =max - pixelsToIgnore;
				if (currentIgnoredPixel>=pixelsToIgnore)
					break;
			}
		}
		
		var currentIgnoredPixel = 0;
		
		/*for (var i=min, j=max; i<255, j>=0; i++, j--){
			currentIgnoredPixel+=histogram[j];
			if (currentIgnoredPixel<pixelsToIgnore){
				max=max-1;
			}else{
				break; break;
			}
			currentIgnoredPixel+=histogram[i];
			if (currentIgnoredPixel<pixelsToIgnore){
				min=min+1;
			}else{
				break; break;
			}
		}*/
        return {"min": min, "max": max};
    }

    /*
     * Apply automatic contrast to the input data
     */
    imageproc.autoContrast = function(inputData, outputData, type, percentage) {
        console.log("Applying automatic contrast...");

        // Find the number of pixels to ignore from the percentage
        var pixelsToIgnore = (inputData.data.length / 4) * percentage;

        var histogram, minMax;
        if (type == "gray") {
            // Build the grayscale histogram
            histogram = buildHistogram(inputData, "gray");
			
			//console.log(histogram.join(","));

            // Find the minimum and maximum grayscale values with non-zero pixels
            minMax = findMinMax(histogram, pixelsToIgnore);
			
			//console.log(minMax);
			//console.log(pixelsToIgnore);
			//console.log(percentage);

            var min = minMax.min, max = minMax.max, range = max - min;

            /**
             * TODO: You need to apply the correct adjustment to each pixel
             */
			var factor = 255/range;
            for (var i = 0; i < inputData.data.length; i += 4) {
                // Adjust each pixel based on the minimum and maximum values

                inputData.data[i]     = (inputData.data[i]-min)* factor ;
                inputData.data[i + 1] = (inputData.data[i + 1]-min)*factor;
                inputData.data[i + 2] = (inputData.data[i + 2]-min)*factor;
				
				outputData.data[i]     = inputData.data[i];
				outputData.data[i + 1] = inputData.data[i + 1];
				outputData.data[i + 2] = inputData.data[i + 2];
            }
        }
        else {

            /**
             * TODO: You need to apply the same procedure for each RGB channel
             *       based on what you have done for the grayscale version
             */
			 
			// for the red part
			var Rhistogram = buildHistogram(inputData, "red");
			
			//console.log(Rhistogram.join(","));

            // Find the minimum and maximum grayscale values with non-zero pixels
            var RminMax = findMinMax(Rhistogram, pixelsToIgnore);
			
			//console.log(RminMax);
			//console.log(pixelsToIgnore);
			//console.log(percentage);
			
			var Rmin = RminMax.min, Rmax = RminMax.max, Rrange = Rmax - Rmin;
			var Rfactor=225/Rrange;
			
			// for the green part
			var Ghistogram = buildHistogram(inputData, "green");
			
			//console.log(Ghistogram.join(","));

            // Find the minimum and maximum grayscale values with non-zero pixels
            var GminMax = findMinMax(Ghistogram, pixelsToIgnore);
			
			//console.log(GminMax);
			//console.log(pixelsToIgnore);
			//console.log(percentage);
			
			var Gmin = GminMax.min, Gmax = GminMax.max, Grange = Gmax - Gmin;
			var Gfactor=225/Grange;
			
			// for the blue part
			var Bhistogram = buildHistogram(inputData, "blue");
			
			//console.log(Bhistogram.join(","));

            // Find the minimum and maximum grayscale values with non-zero pixels
            var BminMax = findMinMax(Bhistogram, pixelsToIgnore);
			
			//console.log(BminMax);
			//console.log(pixelsToIgnore);
			//console.log(percentage);
			
			var Bmin = BminMax.min, Bmax = BminMax.max, Brange = Bmax - Bmin;
			var Bfactor=225/Brange;
			

            for (var i = 0; i < inputData.data.length; i += 4) {
                // Adjust each channel based on the histogram of each one

                inputData.data[i]     = (inputData.data[i]-Rmin)*Rfactor;
                inputData.data[i + 1] = (inputData.data[i + 1]-Gmin)*Gfactor;
                inputData.data[i + 2] = (inputData.data[i + 2]-Bmin)*Bfactor;
				
				outputData.data[i]     = inputData.data[i];
				outputData.data[i + 1] = inputData.data[i + 1];
				outputData.data[i + 2] = inputData.data[i + 2];
            }
        }
    }

}(window.imageproc = window.imageproc || {}));
