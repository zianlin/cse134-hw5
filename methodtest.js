//Find all relevant elements
const form = document.getElementById('article_form');
const date = document.getElementById('date');
const postBtn = document.getElementById('postBtn');
const getBtn = document.getElementById('getBtn');
const putBtn = document.getElementById('putBtn');
const deleteBtn = document.getElementById('deleteBtn');
const response = document.getElementById('response');    

date.value = new Date().toLocaleString();
postBtn.addEventListener('click', onPostClicked);
getBtn.addEventListener('click', onGetClicked);
putBtn.addEventListener('click', onPutClicked);
deleteBtn.addEventListener('click', onDeleteClicked);

//sends w/XMLHTTPRequest with type 'method' to 'url' with 'data'
function sendRequestXHR(method, url, data) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.responseType = 'json';
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        if (xhr.status >= 400) {
            response.textContent = 'Error: ' + xhr.response.message;
        } else {
            response.textContent = JSON.stringify(xhr.response, null, 4);
        }
    };
    xhr.onerror = function() {
        response.textContent = 'Error: Something was wrong with the request.';
    };
    xhr.send(JSON.stringify(data));
}

//sends w/Fetch API with type 'method' to 'url' with 'data'
function sendRequestFetch(method, url, data) {
    fetch(url, {
        method: method,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) throw new Error('Error: ' + response.statusText);
        return response.json();
    })
    .then(data => {
        response.textContent = JSON.stringify(data, null, 4);
    })
    .catch(error => {
        response.textContent = error.message;
    });
}

function onPostClicked() {
    const id = form.elements['id'].value;
    const article_name = form.elements['article_name'].value;
    const article_body = form.elements['article_body'].value;
    const date = form.elements['date'].value;
    const data = {id: id, article_name: article_name, article_body: article_body, date: date};
    const typeIsXHR = document.querySelector('input[name="requestType"]:checked').value === 'xhr';
    const url = 'https://httpbin.org/post';

    if (typeIsXHR) sendRequestXHR('POST', url, data);
    else sendRequestFetch('POST', url, data);
}

function onGetClicked() {
    const id = form.elements['id'].value;
    const typeIsXHR = document.querySelector('input[name="requestType"]:checked').value === 'xhr';
    const url = 'https://httpbin.org/get?id=' + id;

    if (typeIsXHR) sendRequestXHR('GET', url);
    else sendRequestFetch('GET', url);
}

function onPutClicked() {
    const id = form.elements['id'].value;
    const article_name = form.elements['article_name'].value;
    const article_body = form.elements['article_body'].value;
    const date = form.elements['date'].value;
    const data = {id: id, article_name: article_name, article_body: article_body, date: date};
    const typeIsXHR = document.querySelector('input[name="requestType"]:checked').value === 'xhr';
    const url = 'https://httpbin.org/put';

    if (typeIsXHR) sendRequestXHR('PUT', url, data);
    else sendRequestFetch('PUT', url, data);
}

function onDeleteClicked() {
    const id = form.elements['id'].value;
    const typeIsXHR = document.querySelector('input[name="requestType"]:checked').value === 'xhr';
    const url = 'https://httpbin.org/delete?id=' + id;

    if (typeIsXHR) sendRequestXHR('DELETE', url);
    else sendRequestFetch('DELETE', url);
}
