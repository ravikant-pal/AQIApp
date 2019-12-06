var city;
var coord_url, AQ_url;
var cityLat = 0, cityLon = 0;
// function getCoordDataAjax() {

//     city = document.getElementById('city-name').value;
//     coord_url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=6ad1c3c821b2af338bf7c817d26454e5';

//     fetch(coord_url)
//         .then(response => response.json())
//         .then(data => {
//             try {

//                 cityLat = data.coord.lat;
//                 cityLon = data.coord.lon;
//                 // console.log(data);
//                 getAQIDataAjax(cityLat, cityLon, city);
//             } catch {
//                 //alert("invalid city name !")
//                 document.getElementById('exception-handling').innerHTML = 'Invalid city name !';
//                 document.getElementById('exception-handling').style.display = 'block';
//                 document.getElementById('1').childNodes[0].innerHTML = '';
//                 document.getElementById('1').childNodes[1].innerHTML = '';
//                 document.getElementById('1').childNodes[2].innerHTML = '';
//                 document.getElementById('1').style.backgroundColor = "#ffffff";
//             }
//         });
// }

function getCoordDataAjax() {
    var city = document.getElementById('city-name').value;
    var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=6ad1c3c821b2af338bf7c817d26454e5';
    var xyz = new XMLHttpRequest();
    xyz.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
            var jsonData = JSON.parse(this.responseText);
            console.log(jsonData.coord.lat);
            cityLat = jsonData.coord.lat;
            cityLon = jsonData.coord.lon;
            getAQIDataAjax(cityLat, cityLon, city);
        }
        else {
            document.getElementById('exception-handling').innerHTML = 'Invalid city name !';
            document.getElementById('exception-handling').style.display = 'block';
            document.getElementById('1').childNodes[0].innerHTML = '';
            document.getElementById('1').childNodes[1].innerHTML = '';
            document.getElementById('1').childNodes[2].innerHTML = '';
            document.getElementById('1').style.backgroundColor = "#ffffff";
        }
    };
    xyz.open("GET", url, true);
    xyz.send();
}
function getAQIDataAjax(cityLat, cityLon, city) {
    AQ_url = 'https://api.openaq.org/v1/latest?coordinates=' + cityLat + ',' + cityLon;
    var xyzAQI = new XMLHttpRequest();

    xyzAQI.onload = function () {
        try {
            if (this.readyState == 4 && this.status == 200) {
                var data = JSON.parse(this.responseText);
                console.log(data);
                if (data.results[0].measurements[0].value < 500) {
                    if (data.results[0].measurements[0].value < 400) {
                        if (data.results[0].measurements[0].value < 300) {
                            if (data.results[0].measurements[0].value < 200) {
                                if (data.results[0].measurements[0].value < 100) {
                                    if (data.results[0].measurements[0].value < 50) {
                                        document.getElementById("1").style.backgroundColor = "#40bf40";
                                        document.getElementById('1').childNodes[2].innerHTML = "<td>Good</td>";
                                    }
                                    else {
                                        document.getElementById("1").style.backgroundColor = "#85e085";
                                        document.getElementById('1').childNodes[2].innerHTML = "<td>Satisfactory</td>";
                                    }
                                }
                                else {
                                    document.getElementById("1").style.backgroundColor = "#ccff66";
                                    document.getElementById('1').childNodes[2].innerHTML = "<td>Moderately polluted</td>";
                                }
                            }
                            else {
                                document.getElementById("1").style.backgroundColor = "#ff704d";
                                document.getElementById('1').childNodes[2].innerHTML = "<td>Poor</td>";
                            }
                        }
                        else {
                            document.getElementById("1").style.backgroundColor = "#ff3300";
                            document.getElementById('1').childNodes[2].innerHTML = "<td>Very Poor</td>";
                        }
                    }
                    else {
                        document.getElementById("1").style.backgroundColor = "#991f00";
                        document.getElementById('1').childNodes[2].innerHTML = "<td>Severe</td>";
                    }
                }
    
                document.getElementById('1').childNodes[0].innerHTML = "<td>" + city + "</td>";
                document.getElementById('1').childNodes[1].innerHTML = "<td>" + data.results[0].measurements[0].value + data.results[0].measurements[0].unit + "</td>";
            }
        }
        catch {
            document.getElementById('1').childNodes[0].innerHTML = '';
            document.getElementById('1').childNodes[1].innerHTML = '';
            document.getElementById('1').childNodes[2].innerHTML = '';
            document.getElementById('1').style.backgroundColor = "#ffffff";
            document.getElementById('exception-handling').innerHTML = 'This city is not found in current record !';
            document.getElementById('exception-handling').style.display = 'block';
        }
    };

    xyzAQI.open("GET", AQ_url, true);
    xyzAQI.send();
}

window.onload = function () {
    document.getElementById("exception-handling").style.display = "none";
}
function hideError() {
    document.getElementById("exception-handling").style.display = "none";
}