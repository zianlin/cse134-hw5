//req 4: extends htmlelement
class ButtonCount extends HTMLElement {
    //req 2: filename and classname
    constructor() {
        super();

        //init button
        const button = document.createElement('button');
        button.textContent = 'Times Clicked: 0';
        let count = 0;
        
        button.addEventListener('click', () => {
            count++;
            button.textContent = `Times Clicked: ${count}`;
        });

        //req 5: attach to shadow root
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(button);
    }
  }
  
  //req 3: custom element defined
  customElements.define('button-count', ButtonCount);