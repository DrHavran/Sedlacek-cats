let date = new Date();  
let month = date.getMonth() + 1;;
let year = date.getFullYear();
let days = {};

window.onload = function () {
    let calendar = document.getElementById("calendar")
    let currentDate = document.getElementById("currentDate")
    let marekGif = document.getElementById("marekGif")
    let sedlakGif = document.getElementById("sedlakGif")
    let marekTime = document.getElementById("marekTime")
    let sedlakTime = document.getElementById("sedlakTime")
    loadFile();
    currentDate.innerHTML = getMonthName(month) + " " + year
    loadCalendar();
};


let monthNames = [
    "Leden", "Únor", "Březen", "Duben", "Květen", "Červen",
    "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"
];
  
function getMonthName(monthNumber) {
    return monthNames[monthNumber - 1];
}

function left(){
    month--
    if(month == 0){
        month = 12
        year--
    }
    currentDate.innerHTML = getMonthName(month) + " " + year
    calendar.innerHTML = ""
    loadCalendar();
}

function right(){
    month++
    if(month == 13){
        month = 1
        year++
    }
    currentDate.innerHTML = getMonthName(month) + " " + year
    calendar.innerHTML = ""
    loadCalendar();
}

function loadFile(){
    let currentStreak = 0;
    let longestStreak = 0;
    let currentText = document.getElementById("currentStreak")
    let longestText = document.getElementById("longestStreak")

    fetch("https://raw.githubusercontent.com/DrHavran/Sedlacek-cats/refs/heads/main/cats.txt")
        .then(r => r.text())
        .then(text => {
            let lines = text.split(";");
            for (let line of lines) {
                currentStreak++
                line = line.trim();
                let parts = line.split(" ");

                let date = parts[0];
                let mGif = parts[1];
                let mTime = parts[2]
                let sGif = parts[3];
                let sTime = parts[4];

                if(mGif == "null" || sGif == "null"){
                    if(longestStreak < currentStreak - 1){
                        longestStreak = currentStreak - 1;
                    }
                    currentStreak = 0;

                    if(mGif == "null"){
                        mGif = "https://static.vecteezy.com/system/resources/thumbnails/024/382/893/small/empty-no-forbidden-prohibition-sign-icon-symbol-free-png.png"
                        mTime = ""
                    }
                    if(sGif == "null"){
                        sGif = "https://static.vecteezy.com/system/resources/thumbnails/024/382/893/small/empty-no-forbidden-prohibition-sign-icon-symbol-free-png.png"
                        sTime = ""
                    }
                }
                
                days[date] = {marekGif: mGif, marekTime: mTime, sedlakGif: sGif, sedlakTime: sTime}
            }

            if(longestStreak < currentStreak){
                longestStreak = currentStreak;
            }
            currentText.innerHTML = "Current streak: " + currentStreak;
            longestText.innerHTML = "Longest streak: " + longestStreak;
  });
}

function loadCalendar(){
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

            marekGif.src = ""
            sedlakGif.src = ""
            marekTime.innerHTML = ""
            sedlakTime.innerHTML = ""
            
            marekGif.src = days[day]["marekGif"]
            sedlakGif.src = days[day]["sedlakGif"]
            marekTime.innerHTML = days[day]["marekTime"]
            sedlakTime.innerHTML = days[day]["sedlakTime"]
        })

        let number = document.createElement("p")
        number.innerHTML = i;
        div.appendChild(number)

        calendar.appendChild(div)
    }
}