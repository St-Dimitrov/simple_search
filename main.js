let button = document.querySelector("#fetch");
button.addEventListener("click", function(){
    // console.log("you are searching for: ", document.querySelector("body > div.container.zone > form > input[type=text]").value, "---by: ", selected)
    var url = "http://51.142.249.3/" + selected + "/" + document.querySelector("body > div.container.zone > form > input[type=text]").value + "?auth_key=b0xm1gr@710n"
    // console.log(url)
    fetch(String(url), requestOptions)
  
    .then(response => response.json())
  
    .then(result => jsonResponse.push(result))
    .then(element = jsonResponse.length)
    .catch(error => console.log('error', error))
    

    // console.log(result)

    .then(setTimeout(visualization, 1000))
    
});
function visualization(){
    console.log(jsonResponse[element])
    locationJson.innerHTML = 
    "Id: " + jsonResponse[element].id +
    "<br>Name: " + jsonResponse[element].name +
    "<br>Type: " + jsonResponse[element].type +
    "<br>Access: " + jsonResponse[element].shared_link.access +
    "<br>Permission: " + jsonResponse[element].shared_link.permission +
    "<br>Collaborators: " + JSON.stringify(jsonResponse[element].collaborators) +
    // "<br>Children: " + JSON.stringify(jsonResponse[element].children) +
    '<br><button class="copyUrl" onclick="copyUrl()">Copy URL</button><br>' + jsonResponse[element].shared_link.url
    document.getElementById("json").textContent = "JSON in the console - F12: " + JSON.stringify(jsonResponse[element], undefined, 2);
}

function copyUrl(){
    navigator.clipboard.writeText(jsonResponse[element].shared_link.url)
}

let defaultChoice = document.querySelector("body > div.container.zone > div > label:nth-child(1)")
defaultChoice.click()
let jsonResponse = []
let element = 0
let locationJson = document.querySelector(".id")


let selected = "byID"
document.querySelector(`body > div.container.zone > div > label:nth-child(1)`).addEventListener("click", function(){
    selected = document.querySelector(`body > div.container.zone > div > label:nth-child(1)`).children[2].innerHTML
    console.log("you have selected: ", selected)
});

document.querySelector(`body > div.container.zone > div > label:nth-child(2)`).addEventListener("click", function(){
    selected = document.querySelector(`body > div.container.zone > div > label:nth-child(2)`).children[2].innerHTML
    console.log("you have selected: ", selected)
});

document.querySelector(`body > div.container.zone > div > label:nth-child(3)`).addEventListener("click", function(){
    selected = document.querySelector(`body > div.container.zone > div > label:nth-child(3)`).children[2].innerHTML
    console.log("you have selected: ", selected)
});

var requestOptions = {

    method: 'GET',
  
    redirect: 'follow'
  
  };
  