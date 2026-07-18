let chosenPlans = [];
let chosenDate = "";
let chosenTime = "";

let noCount = 0;



window.startAdventure = function(){

    document
    .getElementById("opening")
    .classList.add("hidden");

    document
    .getElementById("question")
    .classList.remove("hidden");

};



window.yesClicked = function(){

    document
    .getElementById("question")
    .classList.add("hidden");

    document
    .getElementById("adventure")
    .classList.remove("hidden");

};





// NO BUTTON

let noCount = 0;


document.addEventListener("DOMContentLoaded", function(){

    const noButton = document.getElementById("noButton");


    if(noButton){


        noButton.addEventListener("click", function(){


            noCount++;


            if(noCount < 3){


                noButton.style.position = "fixed";


                noButton.style.left =
                Math.random() *
                (window.innerWidth - 150)
                + "px";


                noButton.style.top =
                Math.random() *
                (window.innerHeight - 100)
                + "px";


            } else {


                noButton.innerHTML =
                "okay maybe ;) 🌸";


                noButton.style.position =
                "static";


                noButton.onclick =
                window.yesClicked;


            }


        });


    }


});






// ADVENTURE PLANS


const plans = {


food:[

"🍪 bake together",

"🍕 food adventure",

"🍦 dessert stop"

],


cozy:[

"🎬 movie night",

"☕ cozy night",

"🧸 cuddle time"

],


ocean:[

"🌊 beach day",

"🌅 sunset walk",

"🍦 ice cream"

],


night:[

"🌙 night drive",

"✨ stargazing",

"🎶 music adventure"

]


};







window.openPlans = function(type){


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



    const box =
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


};







window.goToDate = function(){


    document
    .getElementById("plans")
    .classList.add("hidden");


    document
    .getElementById("datePicker")
    .classList.remove("hidden");


};







window.continueToTime = function(){


    chosenDate =
    document
    .getElementById("realDate")
    .value;



    if(!chosenDate){


        alert("Choose a date ♡");

        return;

    }



    document
    .getElementById("datePicker")
    .classList.add("hidden");


    document
    .getElementById("timePicker")
    .classList.remove("hidden");


};







window.chooseTime = function(time){


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


    "📅 " +
    chosenDate +

    "<br>⏰ " +
    chosenTime +

    "<br><br>🌿 " +

    chosenPlans.join("<br>");

};








window.downloadCalendar = function(){


    alert("Calendar saved ♡");


};








window.confirmAdventure = function(){


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


};