//very primitive blog id
if (localStorage.getItem("id") == null) {
    localStorage.setItem("id", 0);
}

export class Blog {
    constructor(title, date, summary) {
        this.id = localStorage.getItem("id");
        this.title = title;
        this.date = date;
        this.summary = summary;
        localStorage.setItem("id", localStorage.getItem("id") + 1);
    }
}