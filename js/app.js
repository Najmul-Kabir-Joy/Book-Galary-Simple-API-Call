/*------------------------------------------------
                    SEARCHING
-------------------------------------------------*/
const searchResult = () => {
    toogleSpinner('block')
    //getting search input
    const input = document.getElementById('input').value;
    //checking if empty or not. for empty showing error else next
    const row = document.getElementById('row');
    row.textContent = '';
    if (input === '') {
        showError('PLEASE ENTER SOMETHING!!');
    } else {

        const url = `https://openlibrary.org/search.json?q=${input}`;
        //fetching data
        fetch(url)
            .then(res => res.json())
            .then(data => dataValid(data))
    }
    document.getElementById('input').value = '';
};
/*------------------------------------------------
                    DISPLAY
-------------------------------------------------*/
//display data
const displayData = data => {
    let datas = data.docs;
    const row = document.getElementById('row');
    row.textContent = '';
    //getting all the reqired data into variables
    datas.forEach(element => {
        console.log(element)
        //variables for output 
        const bookName = element.title;
        const author_name = ifUndefined(element.author_name);
        const firstPublish = element.first_publish_year;
        const publisher_name = ifUndefined(element.publisher);
        const cover_i = element.cover_i;
        const imgUrl = imgHandler(cover_i);
        //creating html for showing data
        const col = document.createElement('col');
        col.classList.add('col');
        col.innerHTML = `
        <div class="card">
            <img src="${imgUrl}" class="card-img-top w-50 d-block mx-auto" alt="bookimg">
            <div class="card-body">
                <h3 class="card-title text-center">${bookName}</h3>
                <h4 class="card-title text-center">Written by: <span class="fst-italic fw-bold">${author_name}</span></h4>
                <h5 class="card-title text-center">First publish: ${firstPublish}</h5>
                <h6 class="card-title text-center">Publisher: <span class="fst-italic fw-bold">${publisher_name}</span></h6>
            </div>
        </div>
    `;
        row.appendChild(col);
    });
    toogleSpinner('none');

};
/*------------------------------------------------
            VALIDATION AND HANDLING
-------------------------------------------------*/


//validing the fetched data
const dataValid = data => {
    if ((Object.keys(data.docs).length) < 1) {
        showError('NO RESULTS FOUND!');
        toogleSpinner('none');
    } else {
        const resultCount = document.getElementById('error');
        resultCount.innerText = `${data.numFound} results found`;
        displayData(data);
    }
};

//generating error message
const showError = (text) => {
    document.getElementById('error').innerText = text;
    toogleSpinner('none');
};
//image handler
const imgHandler = (cover_i) => {
    if (cover_i === null || cover_i === undefined) {
        return `na.jpg`;
    } else {
        return ` https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`;
    }
};
//handling undefined output
const ifUndefined = (output) => {
    if (output == undefined || output == '') {
        return 'not found';
    } else {
        return output[0];
    }
};
//removing error message when giving input
document.getElementById('input').addEventListener('focus', function () {
    showError('');
});

const toogleSpinner = style => {
    document.getElementById('spinner').style.display = style;
};