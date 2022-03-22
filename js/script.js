'use strict'

let swtich;
let input;
let label;
let option;
let selectID;
let jakyPole;
let parametry;
let paz;
let par;
let switchVal = "Ne";
let submitButtonClick = false;

function xhr(coPoslat){  
    let xhr = new XMLHttpRequest();

    if(submitButtonClick){        
        xhr.open("POST", "send.php", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                console.log('ready')
                document.getElementById("error").innerHTML = xhr.responseText;
            }
        }
        xhr.send(coPoslat);  
    }
    else{
        xhr.open("GET", "parametry.json", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var obj= this.responseText;
                parametry = JSON.parse(obj)
            }
        }
        xhr.send();
    }

}

window.onload = () => {
    xhr();

    document.forms["zelena"].addEventListener("submit", function (event) {
        event.preventDefault();

        submitButtonClick = true;  

        let phoneVal = encodeURIComponent(document.getElementById("num").value);
        let emailVal = encodeURIComponent(document.getElementById("email").value);
        let params = "&telefon=" + phoneVal +"&email=" + emailVal+ "&Podrobny_formular=" + switchVal;
       
        if (swtich.checked) {
            params = params +
                "&Podrobny_formular=" + switchVal;

            for (const key in paz.checkbox) {
                if (paz.checkbox[key].value=='Ano') {
                    params = params + "&" + paz.checkbox[key].id + "=" + paz.checkbox[key].value;
                }                
            };
            for (const key in paz.inputy) {
                params = params + "&" + paz.inputy[key].id + "=" + encodeURIComponent(document.getElementById(paz.inputy[key].id).value);
            };
            
            for (const i in paz.checkbox) {
                if (paz.checkbox[i].value == 'Ano') {
                    if (par[i].hasOwnProperty('input')) {
                        for (const key in par[i].input) {
                            params = params + "&" + par[i].input[key].id + "=" + encodeURIComponent(document.getElementById(par[i].input[key].id).value);
                        }
                    }
                    if (par[i].hasOwnProperty('select')) {
                        selectID = par[i].selectID;
                        let selectedVal = document.getElementById('Moznost_'+selectID).value;
                        let selectedKey = document.getElementById('Moznost_'+selectID).id;
                        params = params + "&" + selectedKey + "=" + selectedVal;                       
                    }
                    if (par[i].hasOwnProperty('checkbox')) {
                        for (const key in par[i].checkbox) {
                            params = params + "&" + par[i].checkbox[key].id + "=" + encodeURIComponent(document.getElementById(par[i].checkbox[key].id).value);                                       
                        }
                    }
                }
            }
            
        }

        xhr(params);

    });

    swtich = document.querySelector("input[name=mainCheckbox]");
    swtich.addEventListener('change', function () {
        if (this.checked) {
            switchVal = "Ano";
            const div = document.getElementById('firstDet');
            paz = parametry.zakladni;
            par = parametry.rozsireny;
            for (const indexObj in paz.checkbox) {
                vytvorCheckbox(indexObj, paz.checkbox);
                div.appendChild(input);
                div.appendChild(label);

                input.addEventListener('change', function () {                    
                    for (const i in paz.checkbox) {                                                   
                        
                        if (this.id == paz.checkbox[i].id && this.checked) {                                           
                            paz.checkbox[i].value = "Ano"; 
                            if (par[i].hasOwnProperty('checkbox')) {
                                jakyPole = par[i].checkbox;
                                for (const indexObj in jakyPole) {
                                    vytvorCheckbox(indexObj, jakyPole);

                                    input.addEventListener('change', function () {
                                        if(this.checked){
                                            this.value = "Ano";
                                        }
                                        else{
                                            this.value = "Ne";
                                        }
                                    });
                                    div.appendChild(input);
                                    div.appendChild(label);
                                } 
                            }
                            if (par[i].hasOwnProperty('input')) {
                                jakyPole = par[i].input;
                                for (const indexObj in jakyPole) {
                                    vytorInput(indexObj, jakyPole);
                                    div.appendChild(input);
                                }
                            }
                            if (par[i].hasOwnProperty('select')) {
                                jakyPole = par[i].select;
                                input = document.createElement("select");
                                input.setAttribute('form', "zelena");
                                selectID = par[i].selectID
                                input.setAttribute('id', 'Moznost_' + selectID)
                                for (const indexObj in jakyPole) {
                                    vytorSelect(indexObj, jakyPole);
                                    div.appendChild(input);   
                                } 
                            }
                        }                        
                        if (this.id == paz.checkbox[i].id && !this.checked) {                                                
                            paz.checkbox[i].value = "Ne";
                            if (par[i].hasOwnProperty('checkbox')) {
                                jakyPole = par[i].checkbox;                                                     
                                for (const indexObj in jakyPole) {
                                    vymazPodrobnosti(jakyPole[indexObj].id)
                                }
                            }
                            if (par[i].hasOwnProperty('input')) {
                                jakyPole = par[i].input;
                                for (const indexObj in jakyPole) {
                                    vymazPodrobnosti2(jakyPole[indexObj].id)
                                }
                            }
                            if (par[i].hasOwnProperty('select')) {
                                jakyPole = par[i].select;
                                for (const indexObj in jakyPole) {
                                    vymazPodrobnosti2(jakyPole[indexObj].id)
                                }
                                selectID = par[i].selectID;
                                vymazPodrobnosti2('Moznost_' + selectID)
                                
                            }
                        } 


                    }
                });

            }

            for (const indexObj in paz.inputy) {
                vytorInput(indexObj, paz.inputy);
                div.appendChild(input);
            }
        } else {
            switchVal = "Ne";
            vymazVse()
        }
    });

    function vytorSelect(i, pole) {
        option = document.createElement("option");
        option.addEventListener('chenge', function(){ pole[i].value = "Ano" });
        input.appendChild(option);
        option.setAttribute('id', pole[i].id);
        option.innerText = pole[i].placeholder;
    }

    function vytvorCheckbox(i, pole) {
        input = document.createElement("input");
        input.setAttribute('type', "checkbox");
        for (const key in pole[i]) {
            input.setAttribute(key, pole[i][key])
        }
        label = document.createElement("label");
        label.setAttribute('for', pole[i].id);
        label.setAttribute('id', pole[i].id + 'label');
        label.innerText = pole[i].name;
    }

    function vytorInput(i, pole) {
        input = document.createElement("input");
        input.setAttribute('type', "text");
        for (const key in pole[i]) {
            input.setAttribute(key, pole[i][key])
        }
    }
    
    function vymazVse() {
        const firstDet = document.getElementById("firstDet");
        while (firstDet.firstChild) {
            firstDet.removeChild(firstDet.lastChild);
        }
    }

    function vymazPodrobnosti(id) {
        document.getElementById(id).remove()
        
        document.getElementById(id + 'label').remove()
    }

    function vymazPodrobnosti2(id) {
        document.getElementById(id).remove()
    }

};
