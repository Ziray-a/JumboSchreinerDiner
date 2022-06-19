document.addEventListener('DOMContentLoaded', ()=>{
    let currentID = window.location.search.substring(1).split('=')[1]
    console.log(currentID);
    renderHTML(currentID)
})

async function renderHTML(currentID){
    let response = await fetch(`http://localhost:8000/api/gericht/gib/${currentID}`)
    var obj = await response.json()
    console.log(obj);
    console.log(obj.id);
    let gerichtName = obj.bezeichnung
    let gerichtArt = obj.gerichtArt
    let beschreibung = obj.beschreibung
    let zutaten = obj.zutaten
    let bildpfad = obj.bildpfad

    document.getElementById('GerichtName').setAttribute('value', gerichtName)
    document.getElementById('GerichtArt').value = gerichtArt
    document.getElementById('Beschreibung').value = beschreibung
    document.getElementById('Zutaten').value = zutaten
    let ImageField = document.getElementById('Bild')
    ImageField.parentNode.removeChild(ImageField)
    var input = document.createElement('input')
    input.setAttribute('type', 'image')
    input.setAttribute('gid', 'Bild')
    input.setAttribute('src', bildpfad)
    input.setAttribute('alt', "Bild des Gerichts von der Speisekarte")
    input.setAttribute('width', '200')
    input.setAttribute('height', '200')
}