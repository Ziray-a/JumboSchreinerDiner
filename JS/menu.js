
document.addEventListener("DOMContentLoaded", ()=>{
    table = document.getElementById("menu");
    tablerow = document.getElementById("rootrow");
    loadfood();
    


});




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
    toappendanchor.setAttribute("class","anzeige_sp")
    toappendanchor.setAttribute("href","bearbeiten.html?id="+gericht.id)
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
//hi
//Comm mit API und food loaden
async function loadfood(loadforedit=false){
    let response = await fetch("http://localhost:8000/api/gericht/alle");
    gerichtjson = await response.json();
    renderGerichte(gerichtjson)
}