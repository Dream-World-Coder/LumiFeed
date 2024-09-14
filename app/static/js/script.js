
document.addEventListener('DOMContentLoaded', ()=>{
    const buttons = document.querySelectorAll('.btn');
    const news_count_input = document.getElementById('news_count');

    if (window.innerWidth < 768){
        buttons.forEach((button, index)=>{
            button.style.width = '60px';
            button.style.height = '27px';
            button.style.fontSize = '0.8rem';
        });
        news_count_input.style.fontSize = '0.8rem';
        news_count_input.style.height = '27px';
        news_count_input.style.width = '40px';
    }
    else{
        buttons.forEach((button, index)=>{
            button.style.width = '90px';
            button.style.height = '40px';
            button.style.fontSize = '1rem';
        });
        news_count_input.style.fontSize = '1rem';
        news_count_input.style.height = '40px';
        news_count_input.style.width = '120px';
    }
});


// document.addEventListener('DOMContentLoaded', (event) => {
//     const searchBtn = document.querySelector('.search-icon');
//     const searchInput = document.querySelector('#search');
//     const searchResults = document.querySelector('.search-results');

//     function search() {
//         const searchTerm = searchInput.value.toLowerCase().trim();
//         const titles = document.querySelectorAll('.td1');
//         const aTags = document.querySelectorAll('.td5 a');
//         const zippedArr = [];
//         const matchesArr = [];

//         titles.forEach((elem, index) => {
//             const title = elem.innerText.toLowerCase();
//             const link = aTags[index].href;
//             const zip = [title, link];
//             zippedArr.push(zip);
//         });

//         zippedArr.forEach(item => {
//             if (item[0].includes(searchTerm)) {
//                 matchesArr.push(item);
//             }
//         });

//         // Clear previous search results
//         searchResults.innerHTML = '';

//         if (matchesArr.length > 0) {
//             // Display top 6 matches
//             matchesArr.slice(0, 6).forEach(match => {
//                 const resultItem = document.createElement('div');
//                 resultItem.classList.add('result-item');
//                 resultItem.innerHTML = `<a href="${match[1]}">${match[0]}</a>`;
//                 searchResults.appendChild(resultItem);
//             });
//         } else {
//             // Display 'No matches found' message
//             const noMatchItem = document.createElement('div');
//             noMatchItem.classList.add('no-match-item');
//             noMatchItem.innerText = 'No matches found';
//             searchResults.appendChild(noMatchItem);
//         }
//     }

//     searchBtn.addEventListener('click', (event) => {
//         event.preventDefault(); // Prevent form submission if inside a form
//         search();
//     });
// });
