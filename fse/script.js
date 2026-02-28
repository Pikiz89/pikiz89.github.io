document.addEventListener("DOMContentLoaded", ()=>{
    fetchNextFlights();
})

function fetchNextFlights() {
    let userkey = "2C0EC8C145477A02";
    let flightsListDiv = document.getElementById("flightsListDiv");

    fetch(`https://server.fseconomy.net/data?userkey=${userkey}&format=xml&query=assignments&search=key&readaccesskey=${userkey}`)
    .then(response => response.text())
    .then(xmlText => {
    
    // Parser le XML
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "application/xml");

    // Convertir en objet JS
    const jsonData = xmlToJson(xmlDoc);

    console.log(jsonData);

    // handle json datas and making a flight list div..
    let assignmentsArray = jsonData.AssignmentItems.Assignment;
    for (let i = 0; i < assignmentsArray.length; i++){
        let data = assignmentsArray[i];
      console.log(`assignement : ${i}\n`);
      console.log(`${data.From["#text"]} -> ${data.Destination["#text"]}`);
      
      let div = document.createElement("div");
      flightsListDiv.appendChild(div);
      div.className = "flight";
      let p = document.createElement("p") ;
      p.textContent = `${data.Location["#text"]} -> ${data.Destination["#text"]}\n\t\tOriginal Location: ${data.From["#text"]}\n\tPay: ${data.Pay["#text"]}\n\tFlight status: ${data.Status["#text"]}`;
      div.appendChild(p);
  
      let br = document.createElement("br");
      div.appendChild(br);
    }

  })
  .catch(error => console.error("Erreur :", error));

}


// Fonction pour convertir XML → JSON
function xmlToJson(xml) {
  let obj = {};

  if (xml.nodeType === 1) { // élément
    if (xml.attributes.length > 0) {
      obj["@attributes"] = {};
      for (let attr of xml.attributes) {
        obj["@attributes"][attr.nodeName] = attr.nodeValue;
      }
    }
  } else if (xml.nodeType === 3) { // texte
    return xml.nodeValue.trim();
  }

  if (xml.hasChildNodes()) {
    for (let node of xml.childNodes) {
      const nodeName = node.nodeName;
      const value = xmlToJson(node);

      if (value !== "") {
        if (obj[nodeName] === undefined) {
          obj[nodeName] = value;
        } else {
          if (!Array.isArray(obj[nodeName])) {
            obj[nodeName] = [obj[nodeName]];
          }
          obj[nodeName].push(value);
        }
      }
    }
  }

  return obj;
}