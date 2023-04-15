

var obj = document.querySelector('div.container');
var list = document.querySelector('body > div.container > ol');
var input = document.getElementById('input');
var addBtn = document.getElementById('add');
var clearBtn = document.getElementById('clear');

addBtn.onclick = () => {
    if (input.value == '') return;
    var newTask = document.createElement('li');
    newTask.textContent = input.value;
    newTask.draggable = true;
    newTask.className = 'tasks__item';
    var res = list.insertBefore( newTask, list.firstChild);
    input.value = null;
    addListenerDrop(res);
    addListenerAdd(addBtn);
}


for (let i = 0; i < list.children.length; i++) {
    let element = list.children[i];
    addListenerDrop(element);
}

function addListenerDrop(element) {
    element.addEventListener('dragend', (e) => {
        console.log('end ' + e.screenX);
        if (e.screenX > 1400) {
            list.removeChild(element);
        }
    });
}

function addListenerAdd(btn){
    btn.addEventListener('click', (e) => {
        let dropHolder = document.getElementById('dropHolder');
        dropHolder.style.opacity = 1;
        dropHolder.classList.add('slowHide');
        setTimeout(() => { dropHolder.classList.remove('slowHide'); dropHolder.style.opacity = 0}, 2000);
    });
}

function sum(x, y){ 
    return new Promise(((resolve, reject) => {
        let xx = parseInt(x);
        let yy = parseInt(y);
        if(isNaN(xx) || isNaN(yy)){
            reject('error x is not a number ' + x)
        }
        resolve(x+y);
    }))
}

let apiKey  = '4e31d1e63458390a9d5c39c56c683094';
let url = `https://api.openweathermap.org/data/2.5/find?q=Kazan&type=dayli&APPID=${apiKey}`

fetch(url).then((response) => {
    response.json().then((data) => {
        let days = data.list;
        let divs = document.getElementsByClassName('day')
        for (let i = 0; i < days.length; i++) {
            const div = divs[i];
            const day = days[i];
            div.textContent = 'Среднее: ' + Math.round(day.main.temp_min - 273) + ' C';
            div.textContent += '\n Макс: ' + Math.round(day.main.temp_max-273) + ' C';
        }

    });
})

