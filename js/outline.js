(function(imageproc) {
    "use strict";

    /*
     * Apply sobel edge to the input data
     */
    imageproc.sobelEdge = function(inputData, outputData, threshold) {
        console.log("Applying Sobel edge detection...");

        /* Initialize the two edge kernel Gx and Gy */
        var Gx = [
            [-1, 0, 1],
            [-2, 0, 2],
            [-1, 0, 1]
        ];
        var Gy = [
            [-1,-2,-1],
            [ 0, 0, 0],
            [ 1, 2, 1]
        ];

        /**
         * TODO: You need to write the code to apply
         * the two edge kernels appropriately
         */
        
        for (var y = 0; y < inputData.height; y++) {
            for (var x = 0; x < inputData.width; x++) {
				
				// Use imageproc.getPixel() to get the pixel values
				// over the kernel
				// Then set the blurred result to the output data
				// you only need the red (one channel to do that
				var gx=0; var gy=0;
				
				for (var j = -1; j <= 1; j++) {
					for (var i = -1; i <= 1; i++) {
						var pixel=imageproc.getPixel(inputData, x+i, y+j);
						gx+=pixel.r*Gx[i+1][j+1];
						gy+=pixel.r*Gy[i+1][j+1];
					}
				}
				
				
				// find the strength
				var strength = Math.hypot(gx, gy);
				
				//put the stiength into te buffer
				var i = (x + y * outputData.width) * 4;
				if (strength<threshold){
					outputData.data[i]=
					outputData.data[i + 1]=
					outputData.data[i + 2]=0;
				}else{
					outputData.data[i]=
					outputData.data[i + 1]=
					outputData.data[i + 2]=255;
				}
                
            }
        }
    } 

}(window.imageproc = window.imageproc || {}));
