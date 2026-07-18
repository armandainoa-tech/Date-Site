import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import {
  getFirestore,
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";


const firebaseConfig = {

  apiKey: "AIzaSyBBzTwMmhD1t-gZeX5W35K1aG2okrUo91o",

  authDomain: "date-site-bfb53.firebaseapp.com",

  projectId: "date-site-bfb53",

  storageBucket: "date-site-bfb53.firebasestorage.app",

  messagingSenderId: "305849379339",

  appId: "1:305849379339:web:ded141e65eae95ec31f50e"

};



const app = initializeApp(firebaseConfig);

const db = getFirestore(app);



export async function saveAdventure(details){


  await setDoc(

    doc(db,"adventures","latest"),

    {

      accepted: true,

      message:
      "Your little adventure was accepted ♡",

      date:
      details.date,

      adventureTime:
      details.time,

      plans:
      details.plans,

      time:
      new Date().toISOString()

    }

  );


  console.log("saved ♡");

}