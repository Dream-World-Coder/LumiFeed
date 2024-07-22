
const read = document.getElementById('read');
const closeBtn = document.getElementById('close-preview');
const openBtn = document.getElementById('open-in-new-tab');

const readbtns = document.querySelectorAll('.rbtn');
const read_here_btns = document.querySelectorAll('.read_here');

document.addEventListener('DOMContentLoaded', ()=>{
    read_here_btns.forEach((readbtn) => {
        readbtn.addEventListener('click', ()=>{
            read.style.display = 'flex';
            readbtn.innerHTML = 'Clicked';
            setTimeout(()=>{
                readbtn.innerHTML = 'Read';
            },2000);
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
