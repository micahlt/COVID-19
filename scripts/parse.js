let parser = new DOMParser
let totalCasesRender = document.getElementById("totalCases");
let deathsRender = document.getElementById('deaths');
let url = "https://cors-anywhere.herokuapp.com/www.cdc.gov/coronavirus/2019-ncov/cases-updates/cases-in-us.html";
$.get(url,renderTheStuff);
function renderTheStuff(data) {

  // Find total cases
  let totalCasesIndex = data.indexOf("Total cases:");
  let i = 0;
  let totalCases = "";
  while (!(data[totalCasesIndex + i] == '<')) {
  let res = data[totalCasesIndex + i];
  totalCases = totalCases + res;
  console.log(totalCases);
  i++;
}
  totalCases = totalCases.slice(13, totalCases.length);
  totalCasesRender.innerText = totalCases;
  totalCases = parseFloat(totalCases.replace(/,/g, ''));

  // Find deaths
  let deathsIndex = data.indexOf("Total deaths:");
  i = 0;
  let deaths = "";
  while (!(data[deathsIndex + i] == '<')) {
  let resTwo = data[deathsIndex + i];
  deaths = deaths + resTwo;
  console.log(deaths);
  i++;
}
  deaths = deaths.slice(14, deaths.length);
  deathsRender.innerText = deaths;
  deaths = parseFloat(deaths.replace(/,/g, ''));

  // Find mortality rate
  let percentDeaths = (deaths / totalCases) * 100;
  percentDeaths = percentDeaths.toFixed(2);
  document.getElementById("percentage").innerText = percentDeaths + '%';

  // Render chart
  new Chart(document.getElementById("doughnut-chart"), {
    type: 'doughnut',
    data: {
      labels: ["Total Cases", "Deaths"],
      datasets: [
        {
          label: "People",
          backgroundColor: ["cornflowerblue", "coral"],
          data: [totalCases, deaths]
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Deaths to Total Cases'
      }
    }
});
}

// Handle sidebar
function slide() {
  document.getElementsByClassName("slide-out")[0].classList.add("slidden");
}
function closeSlide() {
document.getElementsByClassName("slide-out")[0].classList.remove("slidden");
}
