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
            height : 100%;
        }
        #main-article.split #main-section{
            height : 50%;
            resize : vertical;
        }

        #main-aside{
            overflow: auto;
            border:1px solid green;
            display : none;
        }
        #main-article.split #main-aside{
            flex-grow : 1;
        }

        #main-article.split hr#main-split{
            display : block;
        }
        hr#main-split{
            display : none;
            cursor: row-resize;
            background-color: white;
            height : 1em;
            margin: 0;
            border: 1px solid;
            text-align: center;
        }
        hr#main-split:before {
            content: "\\2022 \\2022 \\2022";
        }
    `;
    
      static get properties() {
        return {
            rand : { type : Number },
            split : { type : Boolean }
        };
      }
    
      constructor() {
        super();
        this.split = false;
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
        <article id='main-article' class='${this.split ? "split" : "" }'>
            <section id='main-section' class="column-1">
                <div>
                    <label>Split View <input type='checkbox' .checked=${this.split} @change=${this._splitOption}></label>

                </div>
                Hello world 
            </section>
            <hr id='main-split' tabindex="0" title='resize section' role='separator' @keydown='${this._splitKeyHandler}' @mousedown='${this._splitmousedown}' @blur='${this._splitblur}' @focus="${this._splitfocus}" />
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
          this.dialog.showModal();
      }

      _splitOption( event ){
        this.split=(event.target.checked);
        this.section = this.shadowRoot.querySelector('#main-section');
        this.section.style.removeProperty('height');;
      }
      _splitKeyHandler( event ){
        const e = event || window.event;
        this.sectionHeight = this.section.getBoundingClientRect().height;
        let h = 0;
        let dy = 10;
        if (e.keyCode == '38') {// up arrow
            h = ((this.sectionHeight - dy) * 100) / this.section.parentNode.getBoundingClientRect().height;    
        } else if (e.keyCode == '40') {// down arrow
            h = ((this.sectionHeight + dy) * 100) / this.section.parentNode.getBoundingClientRect().height;
        }else{
            return;
        }
        this.section.style.height = `${h}%`;
     }
      _splitmousedown(event){
        x = event.clientX;
        y = event.clientY;
        this.section = this.shadowRoot.querySelector('#main-section');
        this.shadowRoot.querySelector('#main-split').focus();
        mouseMoveHandler = this.mouseMoveHandler.bind(this);
        
        this.sectionHeight = this.section.getBoundingClientRect().height;
        document.addEventListener('mousemove', mouseMoveHandler,true);
        
      }
      
      _splitfocus(event){
        console.log('focus');
      }
      _splitblur( event ){
        console.log('blur');
      }

      
      mouseMoveHandler(event) {
        // How far the mouse has been moved
        const dx = event.clientX - x;
        const dy = event.clientY - y;
        const h = ((this.sectionHeight + dy) * 100) / this.section.parentNode.getBoundingClientRect().height;
        this.section.style.height = `${h}%`;
    };
}

window.customElements.define('borrey-app', BorreyApp);