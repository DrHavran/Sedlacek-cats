let month = 12;
let year = 2025;
let days = {};

days["25.12.2025"] = {marekGif: "https://media.tenor.com/_WZy7E7hoTcAAAAM/cat-smile.gif", marekTime: "3:30", sedlakGif: "CAT2", sedlakTime: "10:00"}

window.onload = function () {
    loadFile();
    let calendar = document.getElementById("calendar")
    let marekGif = document.getElementById("marekGif")
    let sedlakGif = document.getElementById("sedlakGif")

    let emptyDays = new Date(year, month-1, 1).getDay()
    if(emptyDays == 0){
        emptyDays = 7;
    }

    for(let i = 1; i < emptyDays; i++){
        let div = document.createElement("div")
        div.className = "emptyDay"

        calendar.appendChild(div)
    }

    for(let i = 1; i <= new Date(year, month, 0).getDate(); i++){
        let div = document.createElement("div")
        div.className = "day"

        div.addEventListener("click", function(){
            let day = i+"."+month+"."+year
            
            marekGif.src = days[day]["marekGif"]
            sedlakGif.src = days[day]["sedlakGif"]
        })

        let number = document.createElement("p")
        number.innerHTML = i;
        div.appendChild(number)

        calendar.appendChild(div)
    }
};

function loadFile(){
    fetch("cats.txt")
        .then(r => r.text())
        .then(text => {
            console.log(text);
    });
}