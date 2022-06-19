
/*
TODO:
POST für hinzufügen
Löschvorgang?

*/

let submitbtn = document.getElementById("buttonsave");
let bezeichnung = document.getElementById("name");
let beschreibung = document.getElementById("beschreibung");
let preis = document.getElementById("preis");
let bild = document.getElementById("bild");
let speiseart = document.getElementById("art");



const data = {
    bezeichnung: bezeichnung.value,
    speisenart: {
        id: 3,
        bezeichnung: "Deutsch",
        beschreibung: "Deftig und meißtens mit viel Kartoffeln",
        bildpfad: "none"
    },
    beschreibung: beschreibung.value,
    bildpfad: bild.value,
    preis: preis.value
}

submitbtn.addEventListener("click", () =>{
    
    fetch('http://localhost:8000/api/gericht/', {
        method: 'POST',
        headers:{
            "content-type": "application/json"
        },
        body: JSON.stringify(data)
    })
});


