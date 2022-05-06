//const speisekarte = require("./menuinteraction.js")
const Essenselemt={
    id:undefined,
    class:"anzeige_sp",
    img:{
        src: undefined,
        alt: undefined
    },
    p:{
        class: "speise_sp",
        innerHTML: undefined
    }

};
let table = undefined;
/*
TODO: 
ELEMENT FÜR ESSEN definieren
verbindung mit server herstellen
get request senden
!! WICHTIG !!
mögliche redundanz ..> Speisekarte & Menu für editieren, vielleicht mit mehreren übergeordneten
JS arbeiten und auf menu/speisekarte mit parametern unterscheiden
GET für Speieskarte
*/
document.addEventListener("DOMContentLoaded", ()=>{
    table = document.getElementsByTagName("table");
    loadfood();
// alle gerichtarten
//eventlistener hinzufügen; filterfood
//eventlistener hinzufügen; resetfilter

});

async function getbeschreibung(){

}

async function loadfood(loadforedit=false){
    let response = await fetch("http://localhost:8000/api/gericht/alle");
    gerichtjson = await response.json();
    console.log(gerichtjson)
    counter = 1;
    for(gericht of gerichtjson.body){
        toappendgericht = Essenselemt;
        toappendgericht.img.src=gerichtjson
        toappendgericht.id=""
        toappendgericht.p.innerHTML=""
        tablerow.append(gerichtelement)
    if(counter%4==0){
        table.append("tr")

    }

    }
    //get methode: alles
    // für ergbniss element
    // DOM element mit ergebnisswerten erstellen
    // DOM element anhängen
    //END for

}

function filterfood(){
        //get methode: mit parametern
    // für ergbniss element
    // DOM element mit ergebnisswerten erstellen
    // DOM element anhängen
    //END for
}