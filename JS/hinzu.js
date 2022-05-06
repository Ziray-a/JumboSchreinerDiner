
/*
TODO:
POST für hinzufügen
Löschvorgang?

*/
document.onload(initiate())


function initiate(){
let table = document.getElementById("tb");
let submitbtn =document.getElementById("buttonsave");
let namefield = document.getElementById("name");
let beschreibung = document.getElementById("beschreibung");
let zutatenliste = document.getElementById("zutaten");
let rezept = document.getElementById("rezept");
let bild= document.getElementById("bild");

submitbtn.addEventListener("onclick", (clickevent) =>{
clickevent.preventDefault();
fetch('localhost:7000', {
    method: 'POST',
    body: {
        bezeichnung: namefield.value,
        zubereitung: rezept.value,
        bildpfad:   bild.value,
        zutatenliste: zutatenliste.value
    },
    headers:{
        "content-type": "application/json"
    }
})
});

    
}

