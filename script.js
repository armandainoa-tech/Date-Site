let chosenPlans = [];
let chosenDate = "";
let chosenTime = "";

window.startAdventure = function(){

    document.getElementById("opening").classList.add("hidden");

    document.getElementById("question").classList.remove("hidden");

};



window.yesClicked = function(){

    document.getElementById("question").classList.add("hidden");

    document.getElementById("adventure").classList.remove("hidden");

};



const adventurePlans = {

food:[
"🍕 Food stop",
"🍦 Dessert",
"🥡 Try somewhere new"
],

cozy:[
"🎬 Movie night",
"☕ Cozy night",
"🧸 Relax together"
],

ocean:[
"🌊 Beach walk",
"🌅 Sunset",
"🍦 Ice cream"
],

night:[
"🌙 Night drive",
"✨ Stargazing",
"🎶 Music"
]

};



window.openPlans = function(type){


    document.getElementById("adventure").classList.add("hidden");

    document.getElementById("plans").classList.remove("hidden");


    document.getElementById("planTitle").innerHTML =
    type + " adventure ♡";


    let box =
    document.getElementById("planChoices");


    box.innerHTML="";


    chosenPlans=[];


    adventurePlans[type].forEach(function(plan){


        let button =
        document.createElement("button");


        button.innerHTML = plan;


        button.onclick=function(){


            if(chosenPlans.includes(plan)){

                chosenPlans =
                chosenPlans.filter(
                    x=>x !== plan
                );

                button.classList.remove("selected");


            } else {


                chosenPlans.push(plan);

                button.classList.add("selected");

            }


        };


        box.appendChild(button);


    });


};





window.goToDate = function(){


    document.getElementById("plans").classList.add("hidden");

    document.getElementById("datePicker").classList.remove("hidden");


};





window.continueToTime = function(){


    chosenDate =
    document.getElementById("realDate").value;


    if(!chosenDate){

        alert("Pick a date ♡");

        return;

    }


    document.getElementById("datePicker").classList.add("hidden");

    document.getElementById("timePicker").classList.remove("hidden");


};





window.chooseTime = function(time){


    chosenTime = time;


    document.getElementById("timePicker").classList.add("hidden");

    document.getElementById("finalPage").classList.remove("hidden");


    document.getElementById("finalDetails").innerHTML =

    "📅 " + chosenDate +

    "<br>⏰ " + chosenTime +

    "<br><br>🌿 " +

    chosenPlans.join("<br>");

};





window.downloadCalendar = function(){

    // Convert date YYYY-MM-DD into YYYYMMDD
    let calendarDate = chosenDate.replaceAll("-", "");


    // Convert time like 8:00 PM into 24 hour time
    let hour = 0;
    let minute = 0;

    let timeParts = chosenTime.match(/(\d+):(\d+)\s(AM|PM)/);


    if(timeParts){

        hour = parseInt(timeParts[1]);
        minute = parseInt(timeParts[2]);

        let period = timeParts[3];


        if(period === "PM" && hour !== 12){

            hour += 12;

        }


        if(period === "AM" && hour === 12){

            hour = 0;

        }

    }


    let calendarTime =
    String(hour).padStart(2,"0") +
    String(minute).padStart(2,"0") +
    "00";



    let event =

`BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:Our Little Adventure ♡
DESCRIPTION:${chosenPlans.join(", ")}
DTSTART:${calendarDate}T${calendarTime}
DTEND:${calendarDate}T${calendarTime}
END:VEVENT
END:VCALENDAR`;



    let blob = new Blob(
        [event],
        {
            type:"text/calendar"
        }
    );


    let link =
    document.createElement("a");


    link.href =
    URL.createObjectURL(blob);


    link.download =
    "little-adventure.ics";


    link.click();

};





window.confirmAdventure = function(){


    if(window.saveAdventure){


        window.saveAdventure({

            date: chosenDate,

            time: chosenTime,

            plans: chosenPlans.join(", ")

        });


    }


    document.getElementById("finalPage").classList.add("hidden");

    document.getElementById("acceptedPage").classList.remove("hidden");


};