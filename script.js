let chosenPlans = [];

let chosenAdventure = "";

let chosenDate = "";

let chosenTime = "";

let noMoves = 0;


// START BUTTON

function startAdventure(){

    document
    .getElementById("opening")
    .classList.add("hidden");

    document
    .getElementById("question")
    .classList.remove("hidden");

}



// YES BUTTON

function yesClicked(){

    document
    .getElementById("question")
    .classList.add("hidden");

    document
    .getElementById("adventure")
    .classList.remove("hidden");

}



// NO BUTTON

document.addEventListener("DOMContentLoaded", function(){

    const noButton =
    document.getElementById("noButton");


    if(noButton){

        noButton.addEventListener(
            "mouseenter",
            moveNo
        );

        noButton.addEventListener(
            "touchstart",
            moveNo
        );

    }

});



function moveNo(){

    const button =
    document.getElementById("noButton");


    noMoves++;


    if(noMoves >= 3){

        button.innerHTML =
        "okay maybe ;) 🌸";


        button.onclick =
        yesClicked;


        return;

    }


    button.style.position = "fixed";


    button.style.left =
    Math.random() *
    (window.innerWidth - 100)
    + "px";


    button.style.top =
    Math.random() *
    (window.innerHeight - 100)
    + "px";

}





// ADVENTURE OPTIONS

const plans = {

food:[
"🍕 order food & relax",
"🥡 pick up food",
"🍜 try somewhere new",
"🍓 picnic snacks",
"🍦 dessert stop"
],

cozy:[
"🎬 movie night",
"🎮 game night",
"🍪 bake together",
"🧸 cuddle & talk",
"☕ cozy night in"
],

ocean:[
"🌅 sunset walk",
"🏖 beach day",
"🍦 ice cream stop",
"🐚 walk by the water"
],

night:[
"🌙 stargazing",
"🚗 night drive",
"🔥 bonfire",
"🎶 music adventure"
]

};





function openPlans(type){

    chosenAdventure = type;


    document
    .getElementById("adventure")
    .classList.add("hidden");


    document
    .getElementById("plans")
    .classList.remove("hidden");


    document
    .getElementById("planTitle")
    .innerHTML =
    type + " adventure ♡";


    let box =
    document.getElementById("planChoices");


    box.innerHTML = "";

    chosenPlans = [];



    plans[type].forEach(function(item){


        let button =
        document.createElement("button");


        button.innerHTML = item;


        button.onclick = function(){


            if(chosenPlans.includes(item)){


                chosenPlans =
                chosenPlans.filter(
                    x => x !== item
                );


                button.classList.remove(
                    "selected"
                );


            } else {


                chosenPlans.push(item);


                button.classList.add(
                    "selected"
                );


            }

        };


        box.appendChild(button);


    });


}






// DATE

function goToDate(){


    if(chosenPlans.length === 0){

        alert("choose your plans ♡");

        return;

    }


    document
    .getElementById("plans")
    .classList.add("hidden");


    document
    .getElementById("datePicker")
    .classList.remove("hidden");

}





function continueToTime(){


    chosenDate =
    document
    .getElementById("realDate")
    .value;


    if(!chosenDate){

        alert("choose a date ♡");

        return;

    }


    document
    .getElementById("datePicker")
    .classList.add("hidden");


    document
    .getElementById("timePicker")
    .classList.remove("hidden");

}






// TIME

function chooseTime(time){


    chosenTime = time;


    document
    .getElementById("timePicker")
    .classList.add("hidden");


    document
    .getElementById("finalPage")
    .classList.remove("hidden");



    document
    .getElementById("finalDetails")
    .innerHTML =

    "📅 " + chosenDate +

    "<br>⏰ " + chosenTime +

    "<br><br>🌿 " +

    chosenPlans.join("<br>");

}






// CALENDAR

function downloadCalendar(){


    let file =

`BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:Our Little Adventure
DESCRIPTION:${chosenPlans.join(",")}
DTSTART:${chosenDate.replaceAll("-","")}T000000
END:VEVENT
END:VCALENDAR`;



    let blob =
    new Blob(
        [file],
        {
            type:"text/calendar"
        }
    );


    let link =
    document.createElement("a");


    link.href =
    URL.createObjectURL(blob);


    link.download =
    "adventure.ics";


    link.click();

}






// ACCEPT

function confirmAdventure(){


    if(window.saveAdventure){

        window.saveAdventure({

            date: chosenDate,

            time: chosenTime,

            plans: chosenPlans.join(", ")

        });

    }



    document
    .getElementById("finalPage")
    .classList.add("hidden");


    document
    .getElementById("acceptedPage")
    .classList.remove("hidden");


}