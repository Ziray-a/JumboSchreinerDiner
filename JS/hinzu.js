

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
    let submitbtn = document.getElementById("buttonsave");
    submitbtn.addEventListener("click", clicksubmit)
    
})

async function clicksubmit(e){
    e.preventDefault()
    let bezeichnung = document.getElementById("name");
    let beschreibung = document.getElementById("beschreibung");
    let preis = document.getElementById("preis");
    let bild = document.getElementById("bild");
    let form = document.getElementById("uploadFormular")
    let speiseart = document.getElementById("art");
    if(!bezeichnung.value || bezeichnung.value ==""){
        alert("Fehler: keine Bezeichnung")
        return;
    }
    if(!beschreibung.value || beschreibung.value ==""){
        alert("Fehler: keine Beschreibung")
        return;
    }
    if(!preis.value || preis.value ==""){
        alert("Fehler: kein Preis")
        return;
    }
    preis.value = preis.value.replace(",",".");
    if(preis.value.includes(".") == false && preis.value){
        preis.value = preis.value + ".00"
    }
    if(!bild || !bild.files[0]){
        alert("Kein bild")
        return;
    }
    
    var fData = new FormData(form)
    var ldata
    $.ajax({
        type: "POST",
        url: "http://localhost:8000/api/dateiuploadeinzeln",
        data: fData,
        contentType: false,
        processData: false,
        cache: false,
        dataType: "json",
        success: function(r){
            ldata = {
                bezeichnung: bezeichnung.value,
                speisenart: {
                    id: speiseart.value
                },
                beschreibung: beschreibung.value,
                bildpfad: "./API/files/" +r.fileName,
                preis: preis.value
            };
            fetch('http://localhost:8000/api/gericht/', {
                method: 'POST',
                headers:{
                    "content-type": "application/json"
                },
                body: JSON.stringify(ldata)
            }).then(document.location.href = "./menu.html")
        }
    });


}
