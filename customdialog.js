var output = document.getElementById("output");
var dialogAlert = document.getElementById("dialog_alert");
var dialogConfirm = document.getElementById("dialog_confirm");
var dialogPrompt = document.getElementById("dialog_prompt");

const dialogButtons = document.querySelectorAll('#customdialogs > input');
dialogButtons.forEach(bt => {
    console.log(bt.id);
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
    dialogAlert.showModal();
    output.style.visibility = "hidden";
}

function onConfirmPressed() {
    dialogConfirm.showModal();

    dialogConfirm.querySelector('#btn_cancel').addEventListener('click', () => {
        output.textContent = `Confirm result: false`;
        output.style.visibility = "visible";
    });
    dialogConfirm.querySelector('#btn_ok').addEventListener('click', () => {
        output.textContent = `Confirm result: true`;
        output.style.visibility = "visible";
    });
}

function onPromptPressed() {
    let input = document.getElementById('name_input');
    input.value = ""; //clear input

    dialogPrompt.showModal();
    
    dialogPrompt.addEventListener('close', () => {
        if (input.value == null || input.value == "") {
            output.textContent = "Prompt result: User didn't enter anything";
        }
        else{
            output.textContent = `Prompt result: ${input.value}.`;
        }
        output.style.visibility = "visible";
    });
}

function onSaferPromptPressed() {
    let input = document.getElementById('name_input');
    input.value = ""; //clear input

    dialogPrompt.showModal();
    
    dialogPrompt.addEventListener('close', () => {
        if (input.value == null || input.value == "") {
            output.textContent = "Prompt result: User didn't enter anything";
        }
        else{
            let clean_name = DOMPurify.sanitize(input.value);
            output.textContent = `Prompt result: ${clean_name}`;
        }
        output.style.visibility = "visible";
    });
}