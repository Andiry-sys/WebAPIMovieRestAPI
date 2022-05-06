let uri = 'api/Movie'
let movies = []

function getItems() {
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayItems(data))
        .catch(error => console.error('Unable to get items.', error));
}

let mongoObjectId = function () {
    var timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
    return (
        timestamp +
        'xxxxxxxxxxxxxxxx'
            .replace(/[x]/g, function () {
                return ((Math.random() * 16) | 0).toString(16);
            })
            .toLowerCase()
    );
};


function addItem() {
    
    const addTitleTextbox = document.getElementById('add-title');
    const addGenreTextbox = document.getElementById('add-genre');
    const addRatingTextbox = document.getElementById('add-ratting');
    const addYearTextbox = document.getElementById('add-year');
    const addPriceTextbox = document.getElementById('add-price');

    const item = {
        id: mongoObjectId(),
        Title: addTitleTextbox.value.trim(),
        Genre: addGenreTextbox.value.trim(),
        Rating: addRatingTextbox.value.trim(),
        Year: addYearTextbox.value.trim(),
        Price: addPriceTextbox.value.trim()
    };

    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
        .then(() => {
            getItems();
            addTitleTextbox.value = '';
            addGenreTextbox.value = '';
            addRatingTextbox.value = '';
            addYearTextbox.value = '';
            addPriceTextbox.value = '';
        })
        .catch(error => console.error('Unable to add item.', error));
}


function displayEditForm(id) {
    const item = movies.find(item => item.id === id);
    
    console.log(item);
    document.getElementById('edit-id').value = item.Id;
    document.getElementById('edit-name').value = item.Title;    
    document.getElementById('edit-price').value = item.Price;
    document.getElementById('edit-year').value = item.Year;
    document.getElementById('edit-genre').value = item.Genre;
    document.getElementById('edit-ratting').value = item.Rating;
    
    document.getElementById('editForm').style.display = 'block';
}

function updateItem() {   
    
    const item = {
        Id: document.getElementById('edit-id').value,
        Title: document.getElementById('edit-title').value.trim(),
        Genre: document.getElementById('edit-genre').value.trim(),
        Rating: document.getElementById('edit-ratting').value.trim(),
        Year: document.getElementById('edit-year').value.trim(),
        Price: document.getElementById('edit-price').value.trim()
    };
    console.log(item);
    fetch(`${uri}/${itemId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to update item.', error));

    closeInput();

    return false;
}

function closeInput() {
    document.getElementById('editForm').style.display = 'none';
}

function _displayItems(data) {
    const tBody = document.getElementById('todos');
    tBody.innerHTML = '';

   

    const button = document.createElement('button');
    console.log(data);
    data.forEach(item => {
        
        let inputTitle = document.createElement('input');
        inputTitle.type = 'text'
        inputTitle.value = item.title;

        let inputGenre = document.createElement('input');
        inputGenre.type = 'text'
        inputGenre.value = item.genre;

        let inputRating = document.createElement('input');
        inputRating.type = 'text'
        inputRating.value = item.rating;

        let inputYear = document.createElement('input');
        inputYear.type = 'text'
        inputYear.value = item.year;

        let inputPrice = document.createElement('input');
        inputPrice.type = 'text'
        inputPrice.value = item.price;        

        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayEditForm(${item.id})`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deleteItem(${item.id})`);

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        td1.appendChild(inputTitle);

        let td2 = tr.insertCell(1);
        
        td2.appendChild(inputPrice);

        let td3 = tr.insertCell(2);
        td3.appendChild(inputGenre);

        let td4 = tr.insertCell(3);
        td4.appendChild(inputYear);

        let td5 = tr.insertCell(4);
        td5.appendChild(inputRating);

        let td6 = tr.insertCell(5);
        td6.appendChild(editButton);

        let td7 = tr.insertCell(6);
        td7.appendChild(deleteButton);
        
    });

    movies = data;
}