


/*
!! WICHTIG !!
mögliche redundanz ..> Speisekarte & Menu für editieren, vielleicht mit mehreren übergeordneten
JS arbeiten und auf menu/speisekarte mit parametern unterscheiden
*/

//initiale events und benögtigte elemente sammeln
document.addEventListener("DOMContentLoaded", ()=>{
    table = document.getElementById("menu");
    tablerow = document.getElementById("rootrow");
    gerichtart= document.getElementById("Gerichtart_sp");
    gerichtname=document.getElementById("Gerichtname_sp");
    preis=document.getElementById("maxMoney_sp");
    loadfood();
    getGerichtsarten();
    gerichtart.addEventListener("change",filterfood);
    gerichtname.addEventListener("change",filterfood);
    gerichtname.addEventListener("click",()=>gerichtname.value="");
    preis.addEventListener("change",filterfood);
    filterresetbutton= document.getElementById("resetFilter_sp");
    filterresetbutton.addEventListener("click",resetfilter)
    


});
//fiter auf standart zurücksetzen und gerichte ungefiltert laden
function resetfilter(){
    gerichtart= document.getElementById("Gerichtart_sp");
    gerichtname=document.getElementById("Gerichtname_sp");
    preis=document.getElementById("maxMoney_sp");
    gerichtart.value="Gerichtart"
    gerichtname.value="Gerichtname"
    preis.value=0,00;
    loadfood()

}

//mouseoverfunktion für beschreibungen
async function getbeschreibung(){
    this.removeEventListener("mouseover",getbeschreibung);
    this.children[2].style.display="initial"
    
    this.addEventListener("mouseout", removebeschreibung)


}
//mouseoutfunktion für beschreibungen
function removebeschreibung(){
    this.removeEventListener("mouseout",removebeschreibung);
    this.children[2].style.display="none"
    this.addEventListener("mouseover",getbeschreibung);
}
//Gerichte itterativ einfügen
async function renderGerichte(gerichtjson){
    counter = 0;
    tablecounter=-1;
    $("table tr").remove(); 
    tablerow= document.createElement("tr")
    tablerow.setAttribute("class","tablerow_sp")
    table.append(tablerow)
    for(gericht of gerichtjson){
        addCell(gericht,tablerow)

           
           
        counter++;
        if(counter%4 ==0){
            tablerow= document.createElement("tr")
            tablerow.setAttribute("class","tablerow_sp")
            table.append(tablerow)
            
            
        }

    }
}
//wird initial gemacht um gerichtsarten als Options in select einzufügen
async function getGerichtsarten(){
    let response = await fetch("http://localhost:8000/api/speisenart/alle");
    speisenartJSON = await response.json();

    for(speisenart of speisenartJSON){
        gerichtart.add(new Option(speisenart.bezeichnung,speisenart.id))
    }
    

}
//Comm mit API und food loaden
async function loadfood(loadforedit=false){
    let response = await fetch("http://localhost:8000/api/gericht/alle");
    gerichtjson = await response.json();
    renderGerichte(gerichtjson)

}
//filterfunktion für food
async function filterfood(){
    let response = await fetch("http://localhost:8000/api/gericht/alle");
    gerichtjson= await response.json();
    //Filter Arrow function, return = durch den filter durch, kein return=rausgefallen
    renderGerichte(gerichtjson.filter((gericht) =>{
        if(gerichtart.value=="Gerichtart" || gericht.speisenart.id==gerichtart.value){
            if(gerichtname.value=="Gerichtname"|| gericht.bezeichnung.toLowerCase().match(".*"+gerichtname.value.toLowerCase()+".*")){
                if(preis.value==0 || gericht.preis <=preis.value){
                return gericht;
                }
            }
        }
    }))
        
}

function addCell(gericht,tablerow){
    var toappendgericht=document.createElement("td");
    toappendgericht.setAttribute("gid", gericht.id);
    toappendgericht.setAttribute("class", "element_sp");
    var toappendsection=document.createElement("div");
    toappendsection.setAttribute("class","anzeige_sp")
    var toappendimage= document.createElement("img")
    toappendimage.setAttribute("src",gericht.bildpfad)
    toappendimage.setAttribute("alt","Bild eines Gerichts auf der Speisekarte")
    var toappendanchor=document.createElement("a")
    toappendanchor.setAttribute("href","speisedetails.html?id="+gericht.id)
    toappendanchor.addEventListener("mouseover", getbeschreibung)
    toappendanchor.setAttribute("gid", gericht.id);
    var toappendparagraph=document.createElement("p")
    toappendparagraph.setAttribute("class","speise_sp")
    toappendparagraphprize =document.createElement("p") 
    toappendparagraphprize.setAttribute("class","speise_sp")
    toappendparagraphprize.innerText=gericht.preis.toFixed(2) +"€"
    var responseouterwindow= document.createElement("span");
    responseouterwindow.setAttribute("class","beschreibung_sp");
    var parabeschreibung= document.createElement("p")
    parabeschreibung.innerText=gericht.Beschreibung.replace("\\n","\n")
    toappendparagraph.innerText=gericht.bezeichnung
    toappendanchor.append(toappendparagraph)
    toappendanchor.append(toappendparagraphprize)

    toappendanchor.append(responseouterwindow)
    toappendsection.append(toappendimage)
    toappendsection.append(toappendanchor)
    toappendgericht.append(toappendsection)
    responseouterwindow.append(toappendimage.cloneNode())
    responseouterwindow.append(responseanchor=toappendanchor.cloneNode())
    responseanchor.append(responsepara=toappendparagraph.cloneNode())
    responsepara.innerText=gericht.bezeichnung
    responseouterwindow.append(parabeschreibung)
    responseouterwindow.animate({top:"+=150"},1000);
    tablerow.append(toappendgericht)
}