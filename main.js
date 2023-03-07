function clearInput(){
    document.querySelector("body > div.container.zone > form > input[type=text]").value = ""
}

function copyUrl(){
    navigator.clipboard.writeText(jsonResponse[element].shared_link.url)
}
function copyUrl2(){
    navigator.clipboard.writeText(jsonResponse[element].sharepoint.FullPath)
}
function copyUrl3(){
    navigator.clipboard.writeText("https://sitecore1.sharepoint.com/_layouts/DocIdRedir.aspx?ID=" + jsonResponse[element].sharepoint.docId)
}

function troubleshoot(){
    if(!jsonResponse[element].success){
        locationJson.innerHTML = jsonResponse[element].message
    }
    if(jsonResponse[element].length === 0){
        locationJson.innerHTML = "Name not found"
    }
    if(!jsonResponse[element].detail == ""){
        locationJson.innerHTML = jsonResponse[element].detail
    }
    rawJson.textContent = "Check the console for detailed error"
}

function visualization(){
        locationJson.innerHTML = ''
        if(jsonResponse[element].id !== null){
            locationJson.innerHTML += 
            "<em>Id: </em>" + jsonResponse[element].id  
        } 
        if(jsonResponse[element].name !== null){
            locationJson.innerHTML += 
            "<br><em>Name: </em>" + jsonResponse[element].name
        }
        if(jsonResponse[element].path !== null){
            locationJson.innerHTML += 
            '<br><em>Path: </em>' + jsonResponse[element].path
        }        
        // if(jsonResponse[element].shared_link !== null){
        //     locationJson.innerHTML += 
        //     // "<br><em>Access: </em>" + jsonResponse[element].shared_link.access +
        //     // "<br><em>Permission: </em>" + jsonResponse[element].shared_link.permission +
        //     // '<br><em>Path: <button class="copyUrl" onclick="copyUrl()">Copy URL</button></em> ' + jsonResponse[element].shared_link.url
        // }
        if(jsonResponse[element].type !== null){
            locationJson.innerHTML += 
            '<br><em>Type: </em>' + jsonResponse[element].type
        } 
        if(jsonResponse[element].sharepoint !== null){
            locationJson.innerHTML += 
            '<br><em>Sharepoint path: <button class="copyUrl" onclick="copyUrl2()">Copy URL</button></em> '+ jsonResponse[element].sharepoint.FullPath
            if(jsonResponse[element].sharepoint.docId !== ""){
                locationJson.innerHTML += '<br><em>Doc ID: <button class="copyUrl" onclick="copyUrl3()">Copy URL</button> https://sitecore1.sharepoint.com/_layouts/DocIdRedir.aspx?ID=</em>'+ jsonResponse[element].sharepoint.docId
            }
        }
        // if(jsonResponse[element].sharepoint !== null){
        //     locationJson.innerHTML += 
        //     '<br><em>Sharepoint path: </em>'+ jsonResponse[element].sharepoint.FullPath +
        //     '<br><em>Doc ID: </em>'+ jsonResponse[element].sharepoint.docId
        // }
        if(jsonResponse[element].shared_link !== null){
            locationJson.innerHTML += 
            '<br><em>Shared Link: <button class="copyUrl" onclick="copyUrl()">Copy URL</button></em> ' + jsonResponse[element].shared_link.url +
            "<br><em>Access: </em>" + jsonResponse[element].shared_link.access +
            "<br><em>Permission: </em>" + jsonResponse[element].shared_link.permission
        }
        if(JSON.stringify(jsonResponse[element].collaborators) !== null){
            locationJson.innerHTML += 
            "<br><em>Collaborators: </em>" + JSON.stringify(jsonResponse[element].collaborators)
        }
        if(JSON.stringify(jsonResponse[element].children) !== null){
            locationJson.innerHTML += 
            "<br><em>Children: </em>" + JSON.stringify(jsonResponse[element].children)
        }

    // locationJson.innerHTML = 
    // "<em>Id: </em>" + jsonResponse[element].id +
    // "<br><em>Name: </em>" + jsonResponse[element].name +
    // "<br><em>Type: </em>" + jsonResponse[element].type +
    // "<br><em>Access: </em>" + jsonResponse[element].shared_link.access +
    // "<br><em>Permission: </em>" + jsonResponse[element].shared_link.permission +
    // "<br><em>Collaborators: </em>" + JSON.stringify(jsonResponse[element].collaborators) +
    // "<br><em>Children: </em>" + JSON.stringify(jsonResponse[element].children) +
    // '<br><em><button class="copyUrl" onclick="copyUrl()">Copy URL</button></em>' + jsonResponse[element].shared_link.url +
    // '<br><em>Sharepoint path: </em>'+ jsonResponse[element].sharepoint.FullPath
    document.getElementById("json").textContent = "JSON in the console - F12:" + JSON.stringify(jsonResponse[element], undefined, 2);
}

function visualizationAndTroubleshoot(){
    console.log("This is the response: ", jsonResponse[element])
    try {
        visualization();
      } catch (error) {
        console.error(error);
        troubleshoot();
      }
}

function display(){
    function displayNone(element){
        element.classList.remove("displayNone");
    }
    Array.from(document.getElementsByClassName("displayNone")).forEach(displayNone)
}

function radioButtons(){
    function radioButtonsSelector(RadioButton){
        // console.log(RadioButton)
        RadioButton.addEventListener("click", function(){
            selected = RadioButton.children[2].innerHTML
            // clearInput()
            // console.log("you have selected: ", selected)
        })
    }
    Array.from(document.querySelector(`body > div.container.zone > div`).children).forEach(radioButtonsSelector)
}

//Variables
let defaultChoice = document.querySelector("body > div.container.zone > div > label:nth-child(1)")
let jsonResponse = []
let element = 0
let locationJson = document.querySelector(".id")
let rawJson = document.getElementById("json")
var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
let button = document.querySelector("#fetch");

// document.querySelector(`body > div.container.zone > div > label:nth-child(1)`).addEventListener("click", function(){
//     selected = document.querySelector(`body > div.container.zone > div > label:nth-child(1)`).children[2].innerHTML
//     clearInput()
//     // console.log("you have selected: ", selected)
// });

// document.querySelector(`body > div.container.zone > div > label:nth-child(2)`).addEventListener("click", function(){
//     selected = document.querySelector(`body > div.container.zone > div > label:nth-child(2)`).children[2].innerHTML
//     clearInput()
//     // console.log("you have selected: ", selected)
// });

// document.querySelector(`body > div.container.zone > div > label:nth-child(3)`).addEventListener("click", function(){
//     selected = document.querySelector(`body > div.container.zone > div > label:nth-child(3)`).children[2].innerHTML
//     clearInput()
//     // console.log("you have selected: ", selected)
// });

//Request being send on button click
button.addEventListener("click", function(){
    let url = ""
    let inputValue = document.querySelector("body > div.container.zone > form > input[type=text]").value
    
    if(selected === "by URL" && inputValue !== ""){
        if(inputValue.includes('sitecore.box.com/s/')){
            console.log("You are searching by SharedLink URL")
            url = "http://51.142.249.3/" + "bySharedLinkID/" + document.querySelector("body > div.container.zone > form > input[type=text]").value.split("/").slice(-1)[0] + "?auth_key=b0xm1gr@710n" //HARDCODING AUTH IS A BAD PRACTICE!!!
        } else if(inputValue.includes('sitecore.app.box.com/')){
            if(inputValue.includes('?')){
                url = "http://51.142.249.3/" + "byID/" + document.querySelector("body > div.container.zone > form > input[type=text]").value.split("/").slice(-1)[0].split("?").slice(0)[0] + "?auth_key=b0xm1gr@710n" //HARDCODING AUTH IS A BAD PRACTICE!!!
            } else{
                url = "http://51.142.249.3/" + "byID/" + document.querySelector("body > div.container.zone > form > input[type=text]").value.split("/").slice(-1)[0] + "?auth_key=b0xm1gr@710n" //HARDCODING AUTH IS A BAD PRACTICE!!!
            }
        }
    } else{
        console.log("you are searching for: ", document.querySelector("body > div.container.zone > form > input[type=text]").value, "---by: ", selected)
        url = "http://51.142.249.3/" + selected + "/" + document.querySelector("body > div.container.zone > form > input[type=text]").value + "?auth_key=b0xm1gr@710n" //HARDCODING AUTH IS A BAD PRACTICE!!!
    // console.log(url)
    }
    fetch(String(url), requestOptions)

    .then(response => response.json())
    .then(result => jsonResponse.push(result))
    .then(element = jsonResponse.length)
    .catch(error => console.log('error', error))


    // console.log(result)

    .then(setTimeout(visualizationAndTroubleshoot, 999))
    // .then(setTimeout(visualization, 1000))
    // .then(setTimeout(clearInput, 1001))
    .then(setTimeout(display, 1002))
});

//Enter key functionality
let searchInput = document.getElementById('searchInput')
searchInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      button.click();
    }
  });

// Default functions executing
radioButtons()
defaultChoice.click()