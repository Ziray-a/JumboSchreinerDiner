let savebtn = document.getElementById("savebtn");

let i;
let bezeichnung;
let speiseart;
let beschreibung;
let preis;
let bild;


savebtn.addEventListener("click", () =>{

    preis.value = preis.value.replace(",",".");
    if(preis.value.includes(".") == false){
        preis.value = preis.value + ".00"
    }

    const data = {
        id: id.value,
        bezeichnung: bezeichnung.value,
        speisenart: {
            id: speiseart.value
        },
        beschreibung: beschreibung.value,
        bildpfad: bild,
        preis: preis.value
    }

    fetch('http://localhost:8000/api/gericht', {
        method: 'PUT',
        headers:{
            "content-type": "application/json"
        },
        body: JSON.stringify(data)
    })
    console.log("hi");
});