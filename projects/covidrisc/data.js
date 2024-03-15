// Altersverteilung Deutschland
// https://www.populationpyramid.net/de/deutschland/2021/
let totalPopulation = 83900470;
let demography = [
  {from: 0, to: 4, area: 4.9},
  {from: 5, to: 9, area: 4.6},
  {from: 10, to: 14, area: 4.5},
  {from: 15, to: 19, area: 4.8},
  {from: 20, to: 24, area: 5.4},
  {from: 25, to: 29, area: 5.7},
  {from: 30, to: 34, area: 6.4},
  {from: 35, to: 39, area: 6.6},
  {from: 40, to: 44, area: 6.1},
  {from: 45, to: 49, area: 6.0},
  {from: 50, to: 54, area: 7.6},
  {from: 55, to: 59, area: 8.2},
  {from: 60, to: 64, area: 7.1},
  {from: 65, to: 69, area: 5.9},
  {from: 70, to: 74, area: 4.7},
  {from: 75, to: 79, area: 4.2},
  {from: 80, to: 84, area: 3.8},
  {from: 85, to: 89, area: 2.1},
  {from: 90, to: 94, area: 0.9},
  {from: 95, to: 99, area: 0.3},
  {from: 100, to: 105, area: 0.0},
];

function getPopulation(age) {
  let smoothGraph = Graph.smoothenBarGraph(demography, 2, true, ctx);
  return Math.floor(totalPopulation*smoothGraph[age]/100);
}




// Inzidenz Geimpfte / Ungeimpfte / Total Bayern
// https://www.lgl.bayern.de/gesundheit/infektionsschutz/infektionskrankheiten_a_z/coronavirus/karte_coronavirus/index.htm
let incidenceUnvaxxed = 1726.3;
let incidenceVaxxed = 112.7;
let totalIncidence = 630.5;




// Indizenz nach Altersgruppen Rosenheim
// https://interaktiv.morgenpost.de/corona-inzidenz-kinder-alter-kita-schule/
let incidence = [
  {from: 0, to: 4, area: 716},
  {from: 5, to: 14, area: 2650},
  {from: 15, to: 34, area: 1560},
  {from: 35, to: 59, area: 1522},
  {from: 60, to: 79, area: 868},
  {from: 80, to: 99, area: 573},
];

function getIncidence(age) {
  let smoothGraph = Graph.smoothenBarGraph(incidence, 5, false, ctx);
  return smoothGraph[age];
}




// Corona Todesfälle nach Alter in Woche 44 2021
// https://www.rki.de/DE/Content/InfAZ/N/Neuartiges_Coronavirus/Projekte_RKI/COVID-19_Todesfaelle.html

// Zahlen sind in Woche 48 um 134% höher (08.11 - 30.11)
// https://interaktiv.morgenpost.de/corona-vierte-welle-deutschland-zeitvergleich/
let deathsAjustingFactor = 1.34;
let deathsPerWeek = [
  {from: 0, to: 9, area: 1},
  {from: 10, to: 19, area: 2},
  {from: 20, to: 29, area: 3},
  {from: 30, to: 39, area: 3},
  {from: 40, to: 49, area: 18},
  {from: 50, to: 59, area: 42},
  {from: 60, to: 69, area: 98},
  {from: 70, to: 79, area: 171},
  {from: 80, to: 89, area: 438},
  {from: 90, to: 99, area: 215},
];

function getWeeklyDeaths(age) {
  let smoothGraph = Graph.smoothenBarGraph(deathsPerWeek, 2, true, ctx);
  let val = smoothGraph[age];
  return (val+(val*deathsAjustingFactor));
}




// Anteil Todesfälle Impfdurchbrüche nach Alter
// https://www.rki.de/DE/Content/InfAZ/N/Neuartiges_Coronavirus/Situationsberichte/Wochenbericht/Wochenbericht_2021-11-25.pdf?__blob=publicationFile
let vaxxBreakthroughDeaths = [
  {from: 0, to: 11, area: 0},
  {from: 12, to: 17, area: 0},
  {from: 18, to: 59, area: 16.2},
  {from: 60, to: 99, area: 52.5},
];

function getVaxxBreakthroughDeaths(age) {
  let smoothGraph = Graph.smoothenBarGraph(vaxxBreakthroughDeaths, 30, false, ctx);
  return smoothGraph[age];
}




// Impfrate nach Alter Bayern
// https://www.zeit.de/wissen/gesundheit/corona-impfungen-deutschland-impffortschritt-aktuelle-zahlen-karte
let vaxxRateAge = [
  {from: 0, to: 11, area: 0},
  {from: 12, to: 17, area: 51.9},
  {from: 18, to: 59, area: 72.5},
  {from: 60, to: 99, area: 85.2},
];

function getVaxxRate(age) {
  let smoothGraph = Graph.smoothenBarGraph(vaxxRateAge, 15, false, ctx);
  return smoothGraph[age];
}




// Tägliche ITS-Erstaufnahmen Deutschland
// https://www.intensivregister.de/#/aktuelle-lage/zeitreihen
let dailyNewITS = 351;

let intenseCareAge = [
  {from: 0, to: 17, area: 0.6},
  {from: 18, to: 29, area: 1.4},
  {from: 30, to: 39, area: 4.6},
  {from: 40, to: 49, area: 9.6},
  {from: 50, to: 59, area: 20.8},
  {from: 60, to: 69, area: 28.4},
  {from: 70, to: 79, area: 23.2},
  {from: 80, to: 89, area: 11.5},
  {from: 90, to: 99, area: 7.5},
];

function getNewITS(age) {
  let smoothGraph = Graph.smoothenBarGraph(intenseCareAge, 5, true, ctx);
  return smoothGraph[age];
}
