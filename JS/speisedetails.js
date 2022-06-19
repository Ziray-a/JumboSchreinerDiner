document.addEventListener('DOMContentLoaded', ()=>{
    let currentID = window.location.search.substring(1).split('=')[1]
    renderHTML(currentID)
})

async function renderHTML(currentID){
    let response = await fetch(`http://localhost:8000/api/gericht/gib/${currentID}`)
    var obj = await response.json()
    let gerichtName = obj.bezeichnung //Gerichtname
    let gerichtArt = obj.gerichtArt //Gerichtart
    let beschreibung = obj.Beschreibung //Beschreibung
    let zutaten = obj.zutaten
    let rezept = obj.rezept
    let bildpfad = obj.bildpfad

    document.getElementById('name').innerHTML = gerichtName
    document.getElementById('art').innerHTML = gerichtArt
    document.getElementById('beschreibung').innerHTML = beschreibung
    document.getElementById('zutaten').innerHTML = zutaten
    document.getElementById('rezept').innerHTML = rezept

    let input = document.getElementById('bild')
    input.setAttribute('type', 'image')
    input.setAttribute('gid', 'Bild')
    input.setAttribute('src', bildpfad)
    input.setAttribute('alt', "Bild des Gerichts von der Speisekarte")
    input.setAttribute('width', '200')
    input.setAttribute('height', '200')
}