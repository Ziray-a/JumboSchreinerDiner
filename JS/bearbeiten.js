let savebtn = document.getElementById("savebtn");
let deletebtn = document.getElementById("deletebtn")
let bildpfd;
let id;

async function getGerichtsarten(){
    let response = await fetch("http://localhost:8000/api/speisenart/alle");
    speisenartJSON = await response.json();
    
    let speiseart = document.getElementById("art");

    for(spart of speisenartJSON){
        speiseart.add(new Option(spart.bezeichnung,spart.id))
    }  
}

async function renderHTML(currentID){
    let response = await fetch(`http://localhost:8000/api/gericht/gib/${currentID}`)
    var obj = await response.json()
    let bezeichnung = obj.bezeichnung //Gerichtname
    let speiseart = obj.speisenart //Gerichtart
    let beschreibung = obj.Beschreibung //Beschreibung
    bildpfd = obj.bildpfad
    let preis = obj.preis

    document.getElementById('name').value = bezeichnung
    document.getElementById('art').value = speiseart.id
    document.getElementById('beschreibung').value = beschreibung
    document.getElementById('preis').value = preis
    document.getElementById('bild').setAttribute("src", bildpfd)
    return obj;
}

document.addEventListener("DOMContentLoaded", () =>{
    getGerichtsarten();
    id = window.location.search.substring(1).split('=')[1]
    objjson = renderHTML(id)
});


savebtn.addEventListener("click", () =>{

    let id = window.location.search.substring(1).split('=')[1]
    let bezeichnung = document.getElementById("name");
    let beschreibung = document.getElementById("beschreibung");
    let preis = document.getElementById("preis");
    let bild = document.getElementById("bild");
    let speiseart = document.getElementById("art");

    preis.value = preis.value.replace(",",".");
    if(preis.value.includes(".") == false){
        preis.value = preis.value + ".00"
    }
    console.log(objjson)
    const data = {
        id: id,
        bezeichnung: bezeichnung.value,
        speisenart: {
            id: speiseart.value
        },
        beschreibung: beschreibung.value,
        bildpfad: bildpfd,
        preis: preis.value
    }

    fetch('http://localhost:8000/api/gericht', {
        method: 'PUT',
        headers:{
            "content-type": "application/json"
        },
        body: JSON.stringify(data)
    })
    document.location.href = "speisedetails.html?id=" +id
});

deletebtn.addEventListener("click", () =>{
    let id = window.location.search.substring(1).split('=')[1]

    const data = {
        id: id
    }

    fetch(`http://localhost:8000/api/gericht/${id}`, {
        method: 'DELETE',
        headers:{
            "content-type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(()=>{document.location.href = "./menu.html"})
});