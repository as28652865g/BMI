let btn = document.querySelector('.submit-btn');
let alert = document.querySelector('.alert');
let data = JSON.parse(localStorage.getItem('BMIdata')) || [];
let list = document.querySelector('.list');
let clear= document.querySelector('.clear');
//運算BMI
btn.addEventListener('click', BMI);
clear.addEventListener('click', deleteList);

var BMIColor = {
    "過輕":{
        class: "result-blue",
        colorBar: "blue"
    },
    "理想":{
        class: "result-green",
        colorBar: "green"
    },
    "過重":{
        class: "result-orange",
        colorBar: "orange"
    },
    "輕度肥胖":{
        class: "result-oranged",
        colorBar: "oranged"     
    },
    "中度肥胖":{
        class: "result-oranged",
        colorBar: "oranged"     
    },
    "重度肥胖":{
        class: "result-red",
        colorBar: "red"
    },                 
}   
updateList(data);
//計算BMI
function BMI() {
    let height = document.getElementById('height').value;
    let weight = document.getElementById('weight').value;
    let m = (height)/100;
    let bmi = (weight/(m*m)).toFixed(2);
    

    //判斷
    if (bmi === NaN) {
        alert.textContent = '請輸入正確數值!';
        return;
    }else if (height === '') {
        alert.textContent = '請輸入身高!';
        return;
    } else if (weight === '') {
        alert.textContent = '請輸入體重!';
        return;
    }else {
        alert.textContent = '';
    }

    //BMI範圍
    let status = '';
    switch (true) {
        case bmi < 18.5:
            status = '過輕';
            break;
        case bmi >= 18.5 && bmi < 24:
            status = '正常';
            break;
        case bmi >= 24 && bmi < 27:
            status = '過重';
            break;
        case bmi >= 27 && bmi < 30:
            status = '輕度肥胖';
            break;
        case bmi >= 30 && bmi < 35:
            status = '中度肥胖';
            break;
        case bmi >= 35:
            status = '重度肥胖';
            break;
        default:
        break;
    }
    console.log(bmi,status);

    //日期
    let date = new Date();
    let day  = date.getDate();
    let month= date.getMonth()+1;
    let year = date.getFullYear();

    //存bmidata
    let bmidata ={
        height : height,
        weight : weight,
        bmi    : bmi,
        status : status,
        time   : month + '-' + day + '-' + year
    }
    data.unshift(bmidata);
    localStorage.setItem('bmidata', JSON.stringify(data));
    updateList(data);
}
//結果
function updateList(data) {
    let str = '';
    let len = data.length;
    for (let i = 0; i < len; i++) {
        let content = data[i].status;
        str +=
        `
        <div class="record-row record-row-${BMIColor[content].colorBar}">
            <div class="record-title">${data[i].status}</div>
            <div class="record-bmi">
                <span class="s-title">BMI</span>
                <span class="content-bmi">${data[i].bmi}</span>
            </div>
            <div class="record-weight">
                <span class="s-title">weight</span>
                <span class="content-weight">${data[i].weight}</span>
            </div>
            <div class="record-height">
                <span class="s-title">height</span>
                <span class="content-weight">${data[i].height}</span>
            </div>
            <div class="record-date">
                <span class="s-title content-date">${data[i].time}</span>
            </div>
        </div>
        `;
    }
    list.innerHTML = str;
}

//清除全部
function deleteList(e) {
    e.preventDefault();
    data = [];
    localStorage.setItem('bmidata', JSON.stringify(data));
    updateList(data);
}