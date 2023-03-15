import {Blog} from './blogobject.js';
import {addPost, getPost, getAllPosts, editPost, deletePost, postExists} from './blogmodel.js';

//dialogs
const postDialog = document.getElementById('post_dialog');
const postDialogForm = document.getElementById('post_dialog_form');
const deleteDialog = document.getElementById('delete_dialog');
const deleteDialogForm = document.getElementById('delete_dialog_form');

//dialog buttons
const postDialogSaveButton = document.getElementById('btn_save');
const deleteDialogOkButton = document.getElementById('btn_ok_delete');

//user interface elements
const blogPostList = document.getElementById('blog_post_list');
const createButton = document.getElementById('btn_create');
createButton.addEventListener('click', onCreatePressed);

//load from local storage upon start
updateList();

function onCreatePressed() {
    //console.log('pressed');
    postDialogForm.reset();
    postDialog.showModal();

    postDialogSaveButton.onclick = function() {
        let title = document.getElementById('title_input').value;
        let date = document.getElementById('date_input').value;
        let summary = document.getElementById('summary_input').value;

        if (!title.trim().length || !date || !summary.trim().length == null) {
            alert("Fill out all fields.");
        }
        else {
            let newPost = new Blog(
                DOMPurify.sanitize(title),
                DOMPurify.sanitize(date),
                DOMPurify.sanitize(summary)
            );
        
            addPost(newPost);
            updateList();
        }
    }
}

function onEditPressed(id) {
    let oldPost = getPost(id);

    postDialogForm.reset();
    document.getElementById('title_input').value = oldPost.title;
    document.getElementById('date_input').value = oldPost.date;
    document.getElementById('summary_input').value = oldPost.summary;
    postDialog.showModal();

    postDialogSaveButton.onclick = function() {
        oldPost.title = DOMPurify.sanitize(document.getElementById('title_input').value);
        oldPost.date = DOMPurify.sanitize(document.getElementById('date_input').value);
        oldPost.summary = DOMPurify.sanitize(document.getElementById('summary_input').value);

        if (!oldPost.title.trim().length || !oldPost.date || !oldPost.summary.trim().length == null) {
            alert("Fill out all fields.");
        }
        else {
            let newPost = new Blog(
                DOMPurify.sanitize(oldPost.title),
                DOMPurify.sanitize(oldPost.date),
                DOMPurify.sanitize(oldPost.summary)
            );
        
            editPost(id, newPost);
            updateList();
        }
    }
}

function onDeletePressed(id) {
    deleteDialog.showModal();
    deleteDialogOkButton.onclick = function() {
        deletePost(id);
        updateList();
    }
}

function updateList() {
    //clear old data
    while (blogPostList.firstChild){
        blogPostList.removeChild(blogPostList.firstChild);
    }

    //get new data
    let blogPosts = getAllPosts();
    //console.log(blogPosts);

    for (let i = 0; i < blogPosts.length; i++) {
        let li = document.createElement('li');
        li.setAttribute("id", blogPosts[i].id);
 
        //add data
        li.appendChild(document.createTextNode(
            blogPosts[i].title + ' ' +
            blogPosts[i].date + ' ' +
            blogPosts[i].summary + ' '
        ));

        //add buttons
        let editButton = document.createElement('button');
        editButton.appendChild(document.createTextNode('Edit'));
        editButton.addEventListener('click', () => onEditPressed(blogPosts[i].id));

        let deleteButton = document.createElement('button');
        deleteButton.appendChild(document.createTextNode('Delete'));
        deleteButton.addEventListener('click', () => onDeletePressed(blogPosts[i].id));

        li.appendChild(editButton);
        li.appendChild(deleteButton);

        blogPostList.appendChild(li);
    }
}