
const close = document.getElementById('close');
const readbtns = document.querySelectorAll('.rbtn');
const read = document.getElementById('read');

document.addEventListener('DOMContentLoaded', ()=>{
    readbtns.forEach((readbtns, index) => {
        readbtns.addEventListener('click', ()=>{
            read.style.display = 'flex';
        })
    });
    close.addEventListener('click', ()=>{
        read.style.display = 'none';
    });
});