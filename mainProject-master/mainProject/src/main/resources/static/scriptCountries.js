// Script for my ESB project, where I call webMethod service wich returns data from 5 differnet API's. 
// NEED TO IMPROVE USER EXPERIENCE A LOT.
// But the at this stage main focus is on a working application
// Also having problems with API that returns the flights, the json is nor formated correctly for some responses and I`m getting errors, need to sort this in webMethods

var app = document.getElementById('root');
var parameters = "";
var keyword = "";
const endpoint = {
    webMethods: 'http://dev.tip.corp.tele2.com:3402/rest/T2_Sandbox/_2019/raitkras/api/getDataFromTwoOrMoreApis'
}


const countriesApp = {



    show: function show(submitEvent) {
        parameters = $("#select").val();
        keyword = $("#keyword").val();
        departureDate = $("#departureDate").val();
        var request = new Request(endpoint.webMethods + '?parameters=' + parameters + '&keyword=' + keyword + '&departureDate=' + departureDate, {
            method: 'GET'
        });


        submitEvent.preventDefault();
        if (keyword != "") {
            fetch(request)
                .then(response => response.json())
                .then((data) => {
                        console.log(data);
                        var country = data.countryData[0];
                        var weatherData = data.weatherData;
                        var iconcode = weatherData.weather[0].icon;
                        var airportData = data.airportDocRef;
                        var flightInfo = data.allFlights.flightData;
                        var validationError = flightInfo[0].ValidationErrors;
                        var price = "";
                        var placeFrom = "";
                        var placeTo = "";
                        var priceArr = [];
                        flightInfo.forEach(elem => {

                            if (elem.Quotes == 0) {
                                $("#nearestAirport").html(`Sorry, try another date!`)
                            } else if (validationError) {
                                $("#nearestAirport").html(`Sorry, can't display any flights! Please try again later! `)

                            } else if (elem.Quotes != null || elem.Quotes != 0) {
                                price = elem.Quotes[0];
                                placeTo = elem.Places[0];
                                placeFrom = elem.Places[1];
                                priceArr.push(price.MinPrice);
                                priceArr.sort();
                                cheapestTicket = priceArr[0];
                                $("#nearestAirport").html(`Cheapest flight on the ${departureDate} from ${placeFrom.Name} to ${placeTo.Name}: ${cheapestTicket}$ `)
                            }
                        });
                        $("#content").show();
                        $("#flag").html(`<img src="${data.countryFlagUrl}">`)
                        $("#countryName").html(`Country name is ${country.name} and the capital is ${country.capital}.`);
                        $("#weather").html(`Weather report in ${country.capital}:`);
                        $("#icon").html(`<img id="wicon" src="http://openweathermap.org/img/w/${iconcode}.png" alt="Weather icon">`)
                        $("#weatherReport").html(`Today it is ${weatherData.weather[0].description} and max temperature is going to be ${weatherData.main.temp_max} &#x2103;`);
                        $("#tickets").html(`Get flight tickets to ${country.capital}:`);


                    },
                    (error) => console.error(error));
        } else {
            $("#myAlert").show();
            $('#alertButton').on('click', function() {
                $('#myAlert').hide();
            })
        }
    }
}

document.getElementById('departureDate').valueAsDate = new Date();
document.forms["get"].addEventListener("submit", countriesApp.show);