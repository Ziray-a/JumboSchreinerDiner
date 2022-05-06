//const speisekarte = require("./menuinteraction.js")
Essenselement={
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
    table = document.getElementById("menu");
    tablerow = document.getElementById("rootrow")
    console.log(table)
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
    counter = 0;
    row = rootrow
    for(gericht of gerichtjson){
           toappendgericht= '<td class="element_sp" id=gericht:' +gericht.id 
           +'><div class="anzeige_sp"><img src="'+gericht.bildpfad
           +'" alt="Bild eines Gerichts auf der Speisekarte"><a href="speisedetails.html?id='
           +gericht.id +'"><p class="speise_sp">'+gericht.bezeichnung+'</p></a></div></td>'
           tablerow.innerHTML+=toappendgericht
        counter++;
        if(counter%4 ==0){
            tablerow=table.insertRow(counter/4)
            
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