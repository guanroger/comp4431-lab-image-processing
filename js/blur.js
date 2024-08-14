(function(imageproc) {
    "use strict";

    /*
     * Apply blur to the input data
     */
    imageproc.blur = function(inputData, outputData, kernelSize) {
        console.log("Applying blur...");
		
		switch(kernelSize){
			case 3:
			// You are given a 3x3 kernel but you need to create a proper kernel
			// using the given kernel size
			var kernel = [ [1, 1, 1]
			             , [1, 1, 1]
						 , [1, 1, 1] ];
			var div=9;

			/**
			 * TODO: You need to extend the blur effect to include different
			 * kernel sizes and then apply the kernel to the entire image
			 */

			// Apply the kernel to the whole image
			for (var y = 0; y < inputData.height; y++) {
				for (var x = 0; x < inputData.width; x++) {
					// Use imageproc.getPixel() to get the pixel values
					
					// over the kernel
					var pixel = imageproc.getPixel(inputData, x, y);
					// Then set the blurred result to the output data
					
					var outR=0; 
					var outG=0; 
					var outB=0;
					
					for (var j = -1; j <= 1; j++) {
						for (var i = -1; i <= 1; i++) {
							//...multiply the pixels (x + i, y + j) with the coefficients...
							outR=outR+imageproc.getPixel(inputData, x+i, y+j).r*kernel[i+1][j+1];
							outG=outG+imageproc.getPixel(inputData, x+i, y+j).g*kernel[i+1][j+1];
							outB=outB+imageproc.getPixel(inputData, x+i, y+j).b*kernel[i+1][j+1];

							
						}
					}
					outR=outR/div;
					outG=outG/div;
					outB=outB/div;
					
					var i = (x + y * outputData.width) * 4;
					inputData.data[i]     = outR;//inputData.data[i];
					inputData.data[i + 1] = outG;//inputData.data[i + 1];
					inputData.data[i + 2] = outB;//inputData.data[i + 2];
					
					outputData.data[i]     = inputData.data[i];
					outputData.data[i + 1] = inputData.data[i + 1];
					outputData.data[i + 2] = inputData.data[i + 2];
				}
			}
			
			break;
			
			case 5:
			// You are given a 3x3 kernel but you need to create a proper kernel
			// using the given kernel size
			var kernel = [ [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1]  ];
			var div=25;

			/**
			 * TODO: You need to extend the blur effect to include different
			 * kernel sizes and then apply the kernel to the entire image
			 */

			// Apply the kernel to the whole image
			for (var y = 0; y < inputData.height; y++) {
				for (var x = 0; x < inputData.width; x++) {
					// Use imageproc.getPixel() to get the pixel values
					
					// over the kernel
					var pixel = imageproc.getPixel(inputData, x, y);
					// Then set the blurred result to the output data
					
					var outR=0; 
					var outG=0; 
					var outB=0;
					
					for (var j = -2; j <= 2; j++) {
						for (var i = -2; i <= 2; i++) {
							//...multiply the pixels (x + i, y + j) with the coefficients...
							outR=outR+imageproc.getPixel(inputData, x+i, y+j).r*kernel[i+2][j+2];
							outG=outG+imageproc.getPixel(inputData, x+i, y+j).g*kernel[i+2][j+2];
							outB=outB+imageproc.getPixel(inputData, x+i, y+j).b*kernel[i+2][j+2];
							
						}
					}
					outR=outR/div;
					outG=outG/div;
					outB=outB/div;
					
					var i = (x + y * outputData.width) * 4;
					inputData.data[i]     = outR;//inputData.data[i];
					inputData.data[i + 1] = outG;//inputData.data[i + 1];
					inputData.data[i + 2] = outB;//inputData.data[i + 2];
					
					outputData.data[i]     = inputData.data[i];
					outputData.data[i + 1] = inputData.data[i + 1];
					outputData.data[i + 2] = inputData.data[i + 2];
				}
			}
			break;
			
			case 7:
			// You are given a 3x3 kernel but you need to create a proper kernel
			// using the given kernel size
			var kernel = [ [1, 1, 1, 1, 1, 1, 1]
			             , [1, 1, 1, 1, 1, 1, 1]
						 , [1, 1, 1, 1, 1, 1, 1]
						 , [1, 1, 1, 1, 1, 1, 1]
						 , [1, 1, 1, 1, 1, 1, 1]  
						 , [1, 1, 1, 1, 1, 1, 1]
						 , [1, 1, 1, 1, 1, 1, 1] ];
			var div=49;

			/**
			 * TODO: You need to extend the blur effect to include different
			 * kernel sizes and then apply the kernel to the entire image
			 */

			// Apply the kernel to the whole image
			for (var y = 0; y < inputData.height; y++) {
				for (var x = 0; x < inputData.width; x++) {
					// Use imageproc.getPixel() to get the pixel values
					
					// over the kernel
					var pixel = imageproc.getPixel(inputData, x, y);
					// Then set the blurred result to the output data
					
					var outR=0; 
					var outG=0; 
					var outB=0;
					
					for (var j = -3; j <= 3; j++) {
						for (var i = -3; i <= 3; i++) {
							//...multiply the pixels (x + i, y + j) with the coefficients...
							outR=outR+imageproc.getPixel(inputData, x+i, y+j).r*kernel[i+3][j+3];
							outG=outG+imageproc.getPixel(inputData, x+i, y+j).g*kernel[i+3][j+3];
							outB=outB+imageproc.getPixel(inputData, x+i, y+j).b*kernel[i+3][j+3];
							
						}
					}
					outR=outR/div;
					outG=outG/div;
					outB=outB/div;
					
					var i = (x + y * outputData.width) * 4;
					inputData.data[i]     = outR;//inputData.data[i];
					inputData.data[i + 1] = outG;//inputData.data[i + 1];
					inputData.data[i + 2] = outB;//inputData.data[i + 2];
					
					outputData.data[i]     = inputData.data[i];
					outputData.data[i + 1] = inputData.data[i + 1];
					outputData.data[i + 2] = inputData.data[i + 2];
				}
			}
			break;
			
			case 9:
			// You are given a 3x3 kernel but you need to create a proper kernel
			// using the given kernel size
			var kernel = [ [1, 1, 1, 1, 1, 1, 1, 1, 1]
			             , [1, 1, 1, 1, 1, 1, 1, 1, 1]
						 , [1, 1, 1, 1, 1, 1, 1, 1, 1]
						 , [1, 1, 1, 1, 1, 1, 1, 1, 1]
						 , [1, 1, 1, 1, 1, 1, 1, 1, 1]  
						 , [1, 1, 1, 1, 1, 1, 1, 1, 1]
						 , [1, 1, 1, 1, 1, 1, 1, 1, 1] 
						 , [1, 1, 1, 1, 1, 1, 1, 1, 1]
						 , [1, 1, 1, 1, 1, 1, 1, 1, 1]];
			var div=81;

			/**
			 * TODO: You need to extend the blur effect to include different
			 * kernel sizes and then apply the kernel to the entire image
			 */

			// Apply the kernel to the whole image
			for (var y = 0; y < inputData.height; y++) {
				for (var x = 0; x < inputData.width; x++) {
					// Use imageproc.getPixel() to get the pixel values
					
					// over the kernel
					var pixel = imageproc.getPixel(inputData, x, y);
					// Then set the blurred result to the output data
					
					var outR=0; 
					var outG=0; 
					var outB=0;
					
					for (var j = -4; j <= 4; j++) {
						for (var i = -4; i <= 4; i++) {
							//...multiply the pixels (x + i, y + j) with the coefficients...
							outR=outR+imageproc.getPixel(inputData, x+i, y+j).r*kernel[i+4][j+4];
							outG=outG+imageproc.getPixel(inputData, x+i, y+j).g*kernel[i+4][j+4];
							outB=outB+imageproc.getPixel(inputData, x+i, y+j).b*kernel[i+4][j+4];
							
						}
					}
					outR=outR/div;
					outG=outG/div;
					outB=outB/div;
					
					var i = (x + y * outputData.width) * 4;
					inputData.data[i]     = outR;//inputData.data[i];
					inputData.data[i + 1] = outG;//inputData.data[i + 1];
					inputData.data[i + 2] = outB;//inputData.data[i + 2];
					
					outputData.data[i]     = inputData.data[i];
					outputData.data[i + 1] = inputData.data[i + 1];
					outputData.data[i + 2] = inputData.data[i + 2];
				}
			}
			break;
			
		}
    } 

}(window.imageproc = window.imageproc || {}));
