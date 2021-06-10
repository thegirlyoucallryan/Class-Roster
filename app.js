



// const url = 'http://www.7timer.info/bin/api.pl?lon=113.17&lat=23.09&product=astro&output=json';

// window.addEventListener('DOMContentLoaded', () => {
//     output.textContent = 'Loading...';
//     fetch(url)
//     .then(resp => resp.json())
//     .then((data) => {
//         console.log(data);
//         output.innerHTML = '';
//         data.dataseries.forEach(el => {
//             makeList(el);
//         })
        
        
//     })
// })


// function makeList (item) {
//     const div = document.createElement('div');
//     div.innerHTML = `Time : ${item.timepoint}  Cloudcover = ${item.cloudcover},   Wind Direction = ${item.wind10m.speed}MPH  ${item.wind10m.direction}`;
//     output.append(div);
//     if(item.cloudcover > 7){
//         div.classList.add('rainy')
//         div.style.color = 'white';
//     }

// }


const output = document.querySelector('.output');
const url = 'j.json';
let myList = [];
let localData = localStorage.getItem('myList');

const input1 = document.createElement('input');
const input2 = document.createElement('input');
const addBtn = document.createElement('button');
const div1 = document.createElement('div');
div1.append(input1);
div1.append(input2);
div1.append(addBtn);

addBtn.textContent = 'Add Student';
addBtn.addEventListener('click', addStudent)
input1.setAttribute('placeholder', 'Name')
input2.setAttribute('placeholder', 'Class Type');



document.body.append(div1);
document.body.append(addBtn)


const reloadBtn = document.createElement('button');
reloadBtn.textContent = 'Full List';
reloadBtn.addEventListener('click', reload);
document.body.append(reloadBtn)



window.addEventListener('DOMContentLoaded', () => {
    output.textContent = 'Loading...';

    if(localData){
    myList = JSON.parse(localStorage.getItem('myList'));
    maker();
} else {
       reload();
  

}
});


function addStudent(){
    if(input1.value.length > 3){
    myObj = {
        "name" : input1.value,
        "classType" : input2.value,
        "rsvp" : true
    }

    const val = myList.length;
    myList.push(myObj, val);
    save();
    makeList(myObj, val)
}
input1.value = '';
let input1span =createElement('span');
input1span.textContent = 'please add a name';
document.input1.append('span')



    

}

function reload(){
    fetch(url)
    .then(resp => resp.json())
    .then((data) => {
      myList = data;
      maker();
      save();
    });
}

function maker(){
    output.innerHTML = '';
    myList.forEach((el, index) => {
        makeList(el,index);
})
}
 



function makeList (item, index) {
    console.log(item)
    const div = document.createElement('div');
    div.classList.add('box')
    div.innerHTML = ` ${item.name}  : ${item.classType}`
    output.append(div);

   

    if(item.rsvp){
        div.classList.add('rsvp')
       
    }
    div.addEventListener('click', (e) => {
        div.classList.toggle('rsvp');
        div.classList.toggle('noRSVP');

    if(div.classList.contains('rsvp') ){
            myList[index].rsvp = true;

    }else {
            myList[index].rsvp = false;
        }
        
    })
    const span = document.createElement('span');
    span.textContent = 'x';
    div.append(span);
    span.addEventListener('click', (e) => {
        console.log(e);
        e.stopPropagation();
        div.remove();
        myList.splice(index, 1);
        console.log(myList)
        save();
    })
    

}

function save(){
    localStorage.setItem('myList', JSON.stringify(myList));

}