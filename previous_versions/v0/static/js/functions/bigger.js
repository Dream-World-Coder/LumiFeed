// document.addEventListener('DOMContentLoaded', ()=>{
//     let is_bigger = 0;
//     const bigFont = document.querySelector('.bigger-font');
//     console.log(is_bigger);
//     bigFont.addEventListener('click', () => {
//         document.documentElement.style.setProperty('--th-font-size', '2rem');
//         document.documentElement.style.setProperty('--td-font-size', '1.3rem');
//         document.documentElement.style.setProperty('--p', '20px');
//         is_bigger = 1;
//         console.log(is_bigger);
//         if (is_bigger === 1) {
//             bigFont.addEventListener('click', () => {
//                 document.documentElement.style.setProperty('--th-font-size', '1.6rem');
//                 document.documentElement.style.setProperty('--td-font-size', '1.0rem');
//                 document.documentElement.style.setProperty('--p', '10px');
//                 is_bigger = 0;
//                 console.log(is_bigger);
//             })
//         }
//         console.log(is_bigger);
//     })
// })

// gpts>>>

// document.addEventListener('DOMContentLoaded', () => {
//     let is_bigger = 0;
//     const bigFont = document.querySelector('.bigger-font');
//     bigFont.addEventListener('click', () => {
//         if (is_bigger === 0) {
//             document.documentElement.style.setProperty('--th-font-size', '2rem');
//             document.documentElement.style.setProperty('--td-font-size', '1.3rem');
//             document.documentElement.style.setProperty('--p', '20px');
//             is_bigger = 1;
//         } else {
//             document.documentElement.style.setProperty('--th-font-size', '1.6rem');
//             document.documentElement.style.setProperty('--td-font-size', '1.0rem');
//             document.documentElement.style.setProperty('--p', '10px');
//             is_bigger = 0;
//         }
//     });
// });


document.addEventListener('DOMContentLoaded', () => {
    let is_bigger = localStorage.getItem('is_bigger') === '1' ? 1 : 0;

    const applyFontSize = () => {
        if (is_bigger === 1) {
            document.documentElement.style.setProperty('--th-font-size', '2rem');
            document.documentElement.style.setProperty('--td-font-size', '1.3rem');
            document.documentElement.style.setProperty('--p', '20px');
        } else {
            document.documentElement.style.setProperty('--th-font-size', '1.6rem');
            document.documentElement.style.setProperty('--td-font-size', '1.0rem');
            document.documentElement.style.setProperty('--p', '10px');
        }
    };

    const bigFont = document.querySelector('.bigger-font');
    bigFont.addEventListener('click', () => {
        is_bigger = is_bigger === 1 ? 0 : 1;
        localStorage.setItem('is_bigger', is_bigger);
        applyFontSize();
    });

    applyFontSize();
});
