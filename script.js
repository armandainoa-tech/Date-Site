let chosenPlans = [];
let chosenDate = "";
let chosenTime = "";

let noCount = 0;


// START ADVENTURE

window.startAdventure = function(){

    document
    .getElementById("opening")
    .classList.add("hidden");


    document
    .getElementById("question")
    .classList.remove("hidden");

};




// YES BUTTON

window.yesClicked = function(){

    document
    .getElementById("question")
    .classList.add("hidden");


    document
    .getElementById("adventure")
    .classList.remove("hidden");

};





// NO BUTTON

document.addEventListener("DOMContentLoaded", function(){


    const noButton =
    document.getElementById("noButton");


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








// CALENDAR

window.downloadCalendar = function(){


    if(!chosenDate || !chosenTime){

        alert("Please choose a date and time first ♡");

        return;

    }


    const match =
    chosenTime.match(/(\d+):(\d+)\s(AM|PM)/);



    let hour =
    parseInt(match[1],10);



    const minute =
    parseInt(match[2],10);



    if(match[3] === "PM" && hour !== 12){

        hour += 12;

    }


    if(match[3] === "AM" && hour === 12){

        hour = 0;

    }



    const start =
    new Date(chosenDate);


    start.setHours(
        hour,
        minute,
        0
    );



    const end =
    new Date(start);



    end.setHours(
        end.getHours()+1
    );





    function formatDate(date){

        return date.toISOString()
        .replace(/[-:]/g,"")
        .split(".")[0]+"Z";

    }






    const ics =
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Date Site//EN
BEGIN:VEVENT
UID:${Date.now()}@datesite
DTSTAMP:${formatDate(new Date())}
DTSTART:${formatDate(start)}
DTEND:${formatDate(end)}
SUMMARY:💗 Our Little Adventure
DESCRIPTION:${chosenPlans.join(", ")}
END:VEVENT
END:VCALENDAR`;




    const blob =
    new Blob(
        [ics],
        {
            type:"text/calendar;charset=utf-8"
        }
    );



    const url =
    URL.createObjectURL(blob);



    const link =
    document.createElement("a");



    link.href = url;


    link.download =
    "Our-Little-Adventure.ics";



    document.body.appendChild(link);


    link.click();


    document.body.removeChild(link);



    URL.revokeObjectURL(url);

};








// CONFIRM ADVENTURE + EMAILJS

window.confirmAdventure = function(){


    const adventureData = {


        message:
        "HE SAID YES!! 🌸",


        date:
        chosenDate,


        time:
        chosenTime,


        adventureTime:
        chosenTime,


        plans:
        chosenPlans.join(", ")


    };




    // FIREBASE SAVE

    if(window.saveAdventure){


        window.saveAdventure(adventureData);


    }





    // EMAILJS SEND

    emailjs.send(

        "service_msyya77",

        "template_z217jfy",

        adventureData

    )


    .then(function(){


        console.log(
            "Email sent successfully 💗"
        );


    })


    .catch(function(error){


        console.log(
            "Email failed:",
            error
        );


    });






    document
    .getElementById("finalPage")
    .classList.add("hidden");



    document
    .getElementById("acceptedPage")
    .classList.remove("hidden");

};





console.log("Date Site script running 💗");