
const read = document.getElementById('read');
const closeBtn = document.getElementById('close-preview');
const openBtn = document.getElementById('open-in-new-tab');

const readbtns = document.querySelectorAll('.rbtn');

document.addEventListener('DOMContentLoaded', ()=>{
    readbtns.forEach((readbtn) => {
        readbtn.addEventListener('click', ()=>{
            read.style.display = 'flex';
        })
    });
    closeBtn.addEventListener('click', ()=>{
        read.style.display = 'none';
    });

    openBtn.addEventListener('click', ()=>{
        // read.classList.toggle('max');
        read.style.display = 'none';
    });
});

// const readFile = new Promise((resolve, reject) => {})
