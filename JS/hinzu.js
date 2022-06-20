let submitbtn = document.getElementById("buttonsave");

async function getGerichtsarten(){
    let response = await fetch("http://localhost:8000/api/speisenart/alle");
    speisenartJSON = await response.json();
    
    let speiseart = document.getElementById("art");

    for(spart of speisenartJSON){
        speiseart.add(new Option(spart.bezeichnung,spart.id))
    }  
}

document.addEventListener("DOMContentLoaded", () =>{
    getGerichtsarten();
})

submitbtn.addEventListener("click", () =>{
    let bezeichnung = document.getElementById("name");
    let beschreibung = document.getElementById("beschreibung");
    let preis = document.getElementById("preis");
    let bild = document.getElementById("bild");
    let speiseart = document.getElementById("art");
    if(!bezeichnung.value || bezeichnung.value ==""){
        alert("Fehler: keine Bezeichnung")
    }
    if(!beschreibung.value || beschreibung.value ==""){
        alert("Fehler: keine Beschreibung")
    }
    if(!preis.value || preis.value ==""){
        alert("Fehler: kein Preis")
    }
    preis.value = preis.value.replace(",",".");
    if(preis.value.includes(".") == false && preis.value){
        preis.value = preis.value + ".00"
    }

    const data = {
        bezeichnung: bezeichnung.value,
        speisenart: {
            id: speiseart.value
        },
        beschreibung: beschreibung.value,
        bildpfad: bild,
        preis: preis.value
    };
    
    fetch('http://localhost:8000/api/gericht/', {
        method: 'POST',
        headers:{
            "content-type": "application/json"
        },
        body: JSON.stringify(data)
    })
});


