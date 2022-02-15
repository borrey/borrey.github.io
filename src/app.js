import {LitElement, html, css} from 'lit';
import dialogPolyfill from 'dialog-polyfill';

let x = 0;
let y = 0;

let mouseMoveHandler = null;
const mouseUpHandler = function(event){
    if( mouseMoveHandler ){
        document.removeEventListener('mousemove', mouseMoveHandler,true);
    }
}
document.addEventListener('mouseup', mouseUpHandler,true);

export class BorreyApp extends LitElement {
    static styles = css`
        :host{
            height : 100vh;
            width : 100vw;
            display : flex;
            flex-direction : column;            
            overflow : none;
        }
        #main-article{
            flex-grow : 1;
            display : flex;
            flex-direction : column;
        }
        #main-section{
            overflow: auto;
            border:1px solid orange;
            resize : vertical;
        }
        #main-aside{
            overflow: auto;
            border:1px solid green;
            flex-grow : 1;
        }
        hr{
            cursor: row-resize;
            height : 1em;
            margin: 0;
            border: 1px solid;
            text-align: center;
        }
        hr:before {
            content: "\\2022 \\2022 \\2022";
        }
    `;
    
      static get properties() {
        return {
            rand : { type : Number }
        };
      }
    
      constructor() {
        super();
        this.dialog = null;///close() //show() //showModal() //focusout:https://gist.github.com/samthor/babe9fad4a65625b301ba482dad284d1
      }
      firstUpdated( changedProps ){
        this.dialog = this.shadowRoot.querySelector('#app-dialog');
        dialogPolyfill.registerDialog(this.dialog);
        this.dialog.addEventListener('cancel', event=>{
            console.log('cancel', this.rand);
            if( this.rand >0.5){
                event.preventDefault();
                event.stopPropagation();
                console.log('prevent esc');
            }
        });
      }

      render() {
        return html`
        <header>
            <h1>
                Borrey Kim
            </h1>
        </header>
        <nav></nav>
        <article id='main-article'>
            <section id='main-section' class="column-1">
                Hello world 
            </section>
            <hr title='resize section' role='separator' @mousedown='${this._splitmousedown}' @blur='${this._splitblur}' @focus="${this._splitfocus}" id='main-split' tabindex="0"/>
            <aside id='main-aside' class="column-3">
                Asside
            </aside>    
        </article>
        <footer>
            <button @click="${this._dialog}">Click Me!</button>
            <button @click="${this._rand}">Random:</button>
            <span>Rand: ${this.rand}</span>
        </footer> 
        <dialog id='app-dialog'>
            hello
        </dialog>
        `;
      }
      _rand( event ){
        this.rand = Math.random();
      }
      _dialog( event ){
          console.log('dialog');
          this.dialog.showModal();
      }

      _splitKeyHandler( event ){
        const e = event || window.event;
        if (e.keyCode == '38') {
            // up arrow
            
        } else if (e.keyCode == '40') {
            // down arrow
        }
     }
      _splitmousedown(event){
        x = event.clientX;
        y = event.clientY;
        this.section = this.shadowRoot.querySelector('#main-section');
        this.shadowRoot.querySelector('#main-split').focus();
        mouseMoveHandler = this.mouseMoveHandler.bind(this);
        
        this.sectionHeight = this.section.getBoundingClientRect().height;
        document.addEventListener('mousemove', mouseMoveHandler,true);
        document.addEventListener('mouseup', this.mouseUpHandler.bind(this),true);
      }
      
      _splitfocus(event){
        console.log('focus');
      }
      _splitblur( event ){
        console.log('blur');
      }

      
      mouseMoveHandler(event) {
        // How far the mouse has been moved
        //this.section = this.shadowRoot.querySelector('#main-section');
        const dx = event.clientX - x;
        const dy = event.clientY - y;
        
        const h = ((this.sectionHeight + dy) * 100) / this.section.parentNode.getBoundingClientRect().height;
        this.section.style.height = `${h}%`;
        //const newLeftWidth = ((leftWidth + dx) * 100) / resizer.parentNode.getBoundingClientRect().width;
        //leftSide.style.width = `${newLeftWidth}%`;
    };
}

window.customElements.define('borrey-app', BorreyApp);