apiKeys = "DYQVR7KYZMC4DA7R,ID5LT36C6SF8FP52,3TG2UJWBYZ0EM116,DY0QVTOTFZJC8W8Z,HYPSTR35N1AWTJQV,Z6SGNSJBR5BZXKFC,LJF3T8CY30C8NYG2,EIMNG7MHLXMJTOMF,3FTAM9R7VXXB8JRL,9UAOLLTO0YEO9DU0".split(",");

class StockDataController {
  constructor() {
    this.changes = [];
  }

  fetchData(callback) {
    return fetch("https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=BTC&market=USD&outputsize=full&apikey=" + apiKeys[Math.floor(Math.random()*apiKeys.length)])
      .then(response => response.json())
      .then(data => callback(this.prepare(data)));
  }

  prepare(dataObject) {
    console.log(dataObject);
    if (dataObject["Note"] != undefined || dataObject["Error Message"] != undefined) {
      return -1;
    }
    console.log("A");

    dataObject = dataObject["Time Series (Digital Currency Daily)"];
    let keys = Object.keys(dataObject);

    let prevPrice;
    for (let i = keys.length-1; i >= 0; i--) {
      let key = keys[i];
      let closePrice = dataObject[key]["4a. close (USD)"];
      if (i < keys.length-1) this.changes.push(closePrice - prevPrice);
      prevPrice = closePrice;
    }

    // Normalization
    let max = Math.max(Math.max(...this.changes), Math.abs(Math.min(...this.changes)));
    for (let i = 0; i < this.changes.length; i++) {
      this.changes[i] /= max/4;
    }
    console.log(this.changes);
    return 1;
  }

}
