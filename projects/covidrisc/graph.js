class Graph {
  static smoothenBarGraph(data, iterations, dataIsRelative, ctx) {
    let points = [];
    for (let i = 0; i < data.length; i++) {
      let diff = data[i].to-data[i].from+1;
      let y = data[i].area;
      if (dataIsRelative) y /= diff;
      for (let j = 0; j < diff; j++) {
        points.push(y);
      }
    }
    Graph.adjustPoints(points, iterations);
    Graph.drawPoints(points, ctx);
    return points;
  }

  static adjustPoints(points, iterations) {
    for (let i = 0; i < iterations; i++) {
      for (let j = 0; j < points.length-1; j++) {
        let delta = points[j] - points[j+1];
        points[j] -= delta/2;
        points[j+1] += delta/2;
      }
      for (let j = points.length-1; j > 0; j--) {
        let delta = points[j] - points[j-1];
        points[j] -= delta/2;
        points[j-1] += delta/2;
      }
    }
  }

  static drawPoints(points, ctx) {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "rgb(255, 255, 255, 0.2)";
    ctx.fillRect(50, 0, 2, height);
    ctx.fillRect(0, height-50, width, 2);
    ctx.fillStyle = "rgb(255, 255, 255, 1.0)";
    for (let i = 0; i < points.length; i++) {
      let x = 50 + 10*i;
      let y = points[i];
      ctx.fillRect(x, height-50-150*y, 5, 5);
    }
  }
}
