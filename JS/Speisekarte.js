/*
!! WICHTIG !!
mögliche redundanz ..> Speisekarte & Menu für editieren, vielleicht mit mehreren übergeordneten
JS arbeiten und auf menu/speisekarte mit parametern unterscheiden
*/
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
function resetfilter(){
    gerichtart= document.getElementById("Gerichtart_sp");
    gerichtname=document.getElementById("Gerichtname_sp");
    preis=document.getElementById("maxMoney_sp");
    gerichtart.value="Gerichtart"
    gerichtname.value="Gerichtname"
    preis.value=0,00;
    loadfood()

}

async function getbeschreibung(){
    let response = await fetch("http://localhost:8000/api/gericht/gib/"+this.attributes.gid.value);
    beschreibungjson= await response.json();


}
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
async function getGerichtsarten(){
    let response = await fetch("http://localhost:8000/api/speisenart/alle");
    speisenartJSON = await response.json();

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
            if(gerichtname.value=="Gerichtname"|| gericht.bezeichnung.match(".*"+gerichtname.value+".*")){
                
                return gericht;
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
    toappendparagraph.innerText=gericht.bezeichnung
    toappendanchor.append(toappendparagraph)
    toappendsection.append(toappendimage)
    toappendsection.append(toappendanchor)
    toappendgericht.append(toappendsection)
    tablerow.append(toappendgericht)
}