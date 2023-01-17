let butto = document.querySelector("#fetch");
butto.addEventListener("click", function(){
    console.log("you are searching for: ", document.querySelector("body > div.container.zone > form > input[type=text]").value, "---by: ", selected)
    
});


let selected = "id"

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