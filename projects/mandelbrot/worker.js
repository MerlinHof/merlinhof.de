self.addEventListener('message', function(e) {
  let data = e.data;
  let res = drawMandelbrot(data.pos, data.scale, data.height, data.width, data.threadId, data.threadCount);
  self.postMessage(res);
}, false);

function drawMandelbrot(pos, scale, height, width, threadId, threadCount) {
  let pixelFactor = 2;
  let maxIterations = 100;
  let imageHeight = pixelFactor*height;
  let pixels = [];
  let yStart = Math.floor(threadId*imageHeight/threadCount);
  let yEnd = Math.floor(imageHeight/threadCount + threadId*imageHeight/threadCount);
  for (let y = yStart; y < yEnd; y++) {
    for (let x = 0; x < pixelFactor*width; x++) {
      let loc = {x: pos.x - x/scale, y: pos.y - y/scale};
      let a = 0;
      let b = 0;
      let cnt = 0;
      while (a*a + b*b < 8 && cnt < maxIterations) {
        let tmp = a;
        a = a*a - b*b + loc.x;
        b = 2*tmp*b + loc.y;
        cnt++;
      }
      let offset = ((y-yStart) * pixelFactor*width + x) * 4;
      pixels[offset] = 510*cnt/maxIterations;
      pixels[offset + 1] = 1020*cnt/maxIterations;
      pixels[offset + 2] = 1530*cnt/maxIterations;
      pixels[offset + 3] = 255;
    }
  }
  return pixels;
}
