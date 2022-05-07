//const speisekarte = require("./menuinteraction.js")



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
    tablerow = document.getElementById("rootrow");
    gerichtart= document.getElementById("Gerichtart_sp");
    gerichtname=document.getElementById("Gerichtname_sp");
    preis=document.getElementById("maxMoney_sp");
    loadfood();
    getGerichtsarten();
    gerichtart.onchange=filterfood;
    gerichtname.onchange=filterfood;
    preis.onchange=filterfood;
    

// alle gerichtarten

//eventlistener hinzufügen; filterfood
//eventlistener hinzufügen; resetfilter

});

async function getbeschreibung(element){
    let response = await fetch("http://localhost:8000/api/gericht/gib/id:"+element.gid);
    beschreibungjson= await response.json();

}
async function renderGerichte(gerichtjson){
    console.log(gerichtjson)
    counter = 0;
    tablecounter=-1;
    $("table tr").remove(); 
    tablerow=table.insertRow(0)
    for(gericht of gerichtjson){
        addCell(gericht,tablerow)

           
           
        counter++;
        if(counter%4 ==0){
            tablerow=table.insertRow(counter/4)
            tablecounter=-1
            
        }

    }
}
async function getGerichtsarten(){
    let response = await fetch("http://localhost:8000/api/speisenart/alle");
    speisenartJSON = await response.json();
    console.log(speisenartJSON);

    for(speisenart of speisenartJSON){
        gerichtart.add(new Option(speisenart.bezeichnung,speisenart.id))
    }
    

}

async function loadfood(loadforedit=false){
    let response = await fetch("http://localhost:8000/api/gericht/alle");
    gerichtjson = await response.json();
    renderGerichte(gerichtjson)

}

async function filterfood(){
    let response = await fetch("http://localhost:8000/api/gericht/alle");
    gerichtjson= await response.json();

    renderGerichte(gerichtjson.filter((gericht) =>{
        if(gerichtart.value=="Gerichtart" || gericht.speisenart.id==gerichtart.value){
            if(gerichtname.value=="Gerichtname"|| gericht.bezeichnung.match("/.*"+gerichtname.value+".*/")){
                
                return gericht;
            }
        }
    }))
        //get methode: mit parametern
    // für ergbniss element
    // DOM element mit ergebnisswerten erstellen
    // DOM element anhängen
    //END for
}

function addCell(gericht,tablerow){
    var toappendgericht=document.createElement("td");
    toappendgericht.setAttribute("gid", gericht.id);
    toappendgericht.setAttribute("class", "element_sp");
    toappendgericht.addEventListener("onhover", getbeschreibung)
    var toappendsection=document.createElement("div");
    toappendsection.setAttribute("class","anzeige_sp")
    var toappendimage= document.createElement("img")
    toappendimage.setAttribute("src",gericht.bildpfad)
    toappendimage.setAttribute("alt","Bild eines Gerichts auf der Speisekarte")
    var toappendanchor=document.createElement("a")
    toappendanchor.setAttribute("href","speisedetails.html?id="+gericht.id)
    var toappendparagraph=document.createElement("p")
    toappendparagraph.setAttribute("class","speise_sp")
    toappendparagraph.innerText=gericht.bezeichnung
    toappendanchor.append(toappendparagraph)
    toappendsection.append(toappendimage)
    toappendsection.append(toappendanchor)
    toappendgericht.append(toappendsection)
    tablerow.append(toappendgericht)
}