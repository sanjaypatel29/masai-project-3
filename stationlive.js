
window.onload = function () {
    var query = document.getElementById("search")
    query.addEventListener('click', handleQuery)
}

function handleQuery() {
    var station = document.getElementById("station").value
    var time = document.getElementById("time").value

    //  alert("i am working")

    var obj = {
        station: station,
        time: time,
    }

    handleApi(obj)
}

function handleApi(obj) {
    var xhr = new XMLHttpRequest()
    xhr.open("GET", 'https://indianrailapi.com/api/v2/LiveStation/apikey/94a9013397538f3c6af6f6f776f50302/StationCode/' + obj.station + '/hours/' + obj.time + '/');
    xhr.send()
    xhr.onload = function () {
        var data = JSON.parse(this.response)
        console.log(data)
        display(data)

    }
}

function display(data) {
    var trains = data.Trains
    var div = document.getElementById("res");
    div.innerHTML = " ";




    var cont = document.createElement("div");
    

    var len = trains.length;
    for (var i = 0; i < len; i++) {
        var row = createRow(trains[i]);
        cont.append(row);
    }

    div.append(cont);
}

function createRow(trains) {
    var number = trains.Number;
    var name = trains.Name;
    var sArrival = trains.ScheduleArrival;
    var sDeparture = trains.ScheduleDeparture;
    var aArrival = trains.ExpectedArrival;


    var div = document.createElement("div");
    div.setAttribute("class", "bg-info d-flex flex-row text-center mt-4");

    var numberElem = document.createElement('p');
    numberElem.textContent = number;
    numberElem.setAttribute("class", "flex-fill")

    var nameElem = document.createElement('p');
    nameElem.textContent = name;
    nameElem.setAttribute("class", "flex-fill")

    var sArrivalElem = document.createElement('p')
    sArrivalElem.textContent = sArrival;
    sArrivalElem.setAttribute("class", "flex-fill")

    var sDepartureElem = document.createElement('p')
    sDepartureElem.textContent = sDeparture;
    sDepartureElem.setAttribute("class", "flex-fill")



    div.append(numberElem, nameElem, sArrivalElem, sDepartureElem);
    return div;
}