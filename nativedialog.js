var output = document.getElementById("output");

const dialogButtons = document.querySelectorAll('#nativedialogs > input');
dialogButtons.forEach(bt => {
    //console.log(bt.id);
    switch(bt.id) {
        case 'btn_alert':
            bt.addEventListener("click", onAlertPressed);
            break;
        case 'btn_confirm':
            bt.addEventListener("click", onConfirmPressed);
            break;
        case 'btn_prompt':
            bt.addEventListener("click", onPromptPressed);
            break;
        case 'btn_safer_prompt':
            bt.addEventListener("click", onSaferPromptPressed);
            break;
    }
});

function onAlertPressed() {
    alert("Alert pressed!");
    output.style.visibility = "hidden";
}

function onConfirmPressed() {
    if (confirm("Do you confirm this?")) {
        output.textContent = "Confirm result: true";
    }
    else {
        output.textContent = "Confirm result: false";
    }

    output.style.visibility = "visible";
}

function onPromptPressed() {
    let name = prompt("What is your name?");
    if (name == null || name == "") {
        output.textContent = "Prompt result: User didn't enter anything";
    } 
    else {
        output.textContent = "Prompt result: " + name;
    }

    output.style.visibility = "visible";
}

function onSaferPromptPressed() {
    let name = prompt("What is your name?");
    if (name == null || name == "") {
        output.textContent = "Prompt result: User didn't enter anything";
    } 
    else {
        let clean_name = DOMPurify.sanitize(name);
        output.textContent = `Prompt result: ${clean_name}`;
    }

    output.style.visibility = "visible";
}