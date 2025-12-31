let month = 12;
let year = 2025;
let days = {};

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
            
            if(days[day]["marekGif"] == "null"){
                marekGif.src = "https://freepngimg.com/thumb/red_cross_mark/3-2-red-cross-mark-png-thumb.png"
            }else{
                marekGif.src = days[day]["marekGif"]
            }

            if(days[day]["sedlakGif"] == "null"){
                sedlakGif.src = "https://freepngimg.com/thumb/red_cross_mark/3-2-red-cross-mark-png-thumb.png"
            }else{
               sedlakGif.src = days[day]["sedlakGif"]
            }
        })

        let number = document.createElement("p")
        number.innerHTML = i;
        div.appendChild(number)

        calendar.appendChild(div)
    }
};

function loadFile(){
    fetch("https://raw.githubusercontent.com/DrHavran/Sedlacek-cats/refs/heads/main/cats.txt")
        .then(r => r.text())
        .then(text => {
            let lines = text.split(";");
            for (let line of lines) {
                line = line.trim();
                let parts = line.split(" ");

                let date = parts[0];
                let mGif = parts[1];
                let mTime = parts[2]
                let sGif = parts[3];
                let sTime = parts[4];

                days[date] = {marekGif: mGif, marekTime: mTime, sedlakGif: sGif, sedlakTime: sTime}
            }
  });
}