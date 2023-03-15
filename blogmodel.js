import {Blog} from './blogobject.js';

export function addPost(post) {
    localStorage.setItem(post.id, JSON.stringify(post));
}

export function getPost(id) {
    //will unintentionally increase id, but has no operational effect
    return JSON.parse(localStorage.getItem(id));
    return Object.assign(new Blog, JSON.parse(localStorage.getItem(id)));
}

export function getAllPosts() {
    let allPosts = [];
    let keys = Object.keys(localStorage);
    keys.sort(function(a, b){return a-b}); //sort ids numerically, not lexicographically
    for (let i = 0; i < keys.length; i++) {
        if (keys[i] == "id") continue;
        allPosts.push(getPost(keys[i]));
    }
    return allPosts;
}

export function editPost(id, post) {
    let postToEdit = getPost(id);
    postToEdit.title = post.title;
    postToEdit.date = post.date;
    postToEdit.summary = post.summary;
    localStorage.setItem(id, JSON.stringify(postToEdit));
}

export function deletePost(id) {
    localStorage.removeItem(id);
}

export function postExists(id) {
    return (localStorage.getItem(id) != null);
}