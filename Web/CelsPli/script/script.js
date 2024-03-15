let countRec = 0;
let error_messages = {
    valueIsPresent : "Значение уже было внесено в таблицу",
    notCorrect : "Значение является некоректным",
    absoluteZero : "Значение ниже абсолютного нуля температуры"
}
generateResult();

/*
 *
 */
function findInTable(degree){
    let table = document.getElementById("savedValues");

    for(let i = 1; i < table.rows.length; i++){
        if(degree==table.rows[i].cells[1].innerHTML){
            return true;
        }
    }
    return false;
}

function convert(degree, format){
    return format==="fahrenheit"?((degree*(5/9))+32):((degree-32)*(5/9));
}

function getValueContainer(){
    let radioGroup = document.getElementsByName("degree_format");
    let inputDegreeValue = document.getElementById("val_degree").value.replace(/\s+/g, '');
    let valueContainer = {};

    for(let radio of radioGroup){
        if(radio.checked){
            valueContainer[radio.value] = convert(inputDegreeValue, radio.value).toFixed(2);
        }else{

            valueContainer[radio.value] = inputDegreeValue==""?0:inputDegreeValue*1;
        }
    }

    return valueContainer
}

function generateResult(){
    let radioGroup = document.getElementsByName("degree_format");
    let resultDiv = document.getElementById("result");
    let valueContainer = getValueContainer();

    for(let radio of radioGroup){
        if(radio.checked){
            resultDiv.innerText = valueContainer[radio.value];
        }
    }
}

function saveInTable() {
    let valueContainer = getValueContainer();
    let msgContainer = "";
    document.getElementById("val_degree").classList.remove("inputError");
    document.getElementById("err_val_degree").innerText = "";
    if(findInTable(valueContainer.fahrenheit)) msgContainer += error_messages.valueIsPresent+"\n";
    console.log(valueContainer.fahrenheit == "NaN" || valueContainer.celsius == "NaN");
    if(valueContainer.fahrenheit == "NaN" || valueContainer.celsius == "NaN") msgContainer += error_messages.notCorrect+"\n";
    if(valueContainer.fahrenheit < -459.67) msgContainer += error_messages.absoluteZero+"\n";
    if(msgContainer !== ""){
        document.getElementById("val_degree").classList.add("inputError");
        document.getElementById("err_val_degree").innerText = msgContainer;
        return;
    }
    document.querySelector("#savedValues>tbody").innerHTML += `
        <tr>
            <td>${++countRec}</td>
            <td>${valueContainer.fahrenheit}</td>
            <td>${valueContainer.celsius}</td>
        </tr>`;
}
