
window.onload = function () {
    var query = document.getElementById("pnrsearch")
    query.addEventListener('click', handleQuery)
}

function handleQuery() {
    var pnr = document.getElementById("pnr").value

    //   alert("i am working")

    var obj = {
        pnr: pnr,
        
    }

    handleApi(obj)
}

function handleApi(obj) {
    var xhr = new XMLHttpRequest()
    xhr.open("GET", "http://indianrailapi.com/api/v2/PNRCheck/apikey/94a9013397538f3c6af6f6f776f50302/PNRNumber/" + obj.pnr + "/" );
    xhr.send()
    xhr.onload = function () {
        var data = JSON.parse(this.response)
        console.log(data)
        display(data)

    }
}

function display(data) {
    var Passangers = data.Passangers
    var div = document.getElementById("res");
    div.innerHTML = " ";




    var cont = document.createElement("div");

    var len = Passangers.length;
    for (var i = 0; i < len; i++) {
        var row = createRow(trains[i]);
        cont.append(row);
    }

    div.append(cont);
}

function createRow(Passangers) {
    var Passangers = Passangers.Passangers;
    var BookingStatus= Passangers.BookingStatus;
    var CurrentStatus = Passangers.CurrentStatus;
    

    var div = document.createElement("div");
    div.setAttribute("class", "bg-info d-flex flex-row text-center m-4");

    var passengers = document.createElement('p');
    passengers.textContent = Passangers;
    passengers.setAttribute("class", "flex-fill")

    var bookingStatus = document.createElement('p');
    bookingStatus.textContent = BookingStatus;
    bookingStatus.setAttribute("class", "flex-fill")

    var currentstatus = document.createElement('p')
    currentstatus.textContent = CurrentStatus;
    currentstatus.setAttribute("class", "flex-fill")


    div.append(passengers, bookingStatus, currentstatus);
    return div;
}