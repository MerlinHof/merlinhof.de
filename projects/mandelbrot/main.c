void makeMandelbrot(int *pixels, double posX, double posY, double scale, int width, int height, double pixelFactor, int pixelCount) {
  int maxIterations = 100;
  int maxY = pixelFactor*height;
  int maxX = pixelFactor*width;
  double locX, locY, a, b, tmp;
  int cnt, offset;
  for (int y = 0; y < maxY; y++) {
    for (int x = 0; x < maxX; x++) {
      locX = posX - x/scale;
      locY = posY - y/scale;
      a = 0;
      b = 0;
      cnt = 0;
      while (a*a + b*b < 8 && cnt < maxIterations) {
        tmp = a;
        a = a*a - b*b + locX;
        b = 2*tmp*b + locY;
        cnt++;
      }
      offset = (y * maxX + x) * 4;
      pixels[offset] = (510*cnt/maxIterations);
      pixels[offset + 1] = (1020*cnt/maxIterations);
      pixels[offset + 2] = (1530*cnt/maxIterations);
      pixels[offset + 3] = 255;
      if (offset > pixelCount - 1) return;
    }
  }
}
