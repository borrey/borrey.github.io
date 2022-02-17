import {LitElement, html, css} from 'lit';
import dialogPolyfill from 'dialog-polyfill';
import './block/block_base';
import './block/question_set';
let x = 0;
let y = 0;

//SuperElement.styles,
const anchorColor = css`#0000ee`;
let mouseMoveReciever = null;
const mouseMoveHandler = function(event) {
    // How far the mouse has been moved
    if(mouseMoveReciever){
        const dx = event.clientX - x;
        const dy = event.clientY - y;
        const h = ((mouseMoveReciever.sectionHeight + dy) * 100) / mouseMoveReciever.section.parentNode.getBoundingClientRect().height;
        mouseMoveReciever.section.style.height = `${h}%`;
    }else{
        console.log('error');
    }

}
const mouseUpHandler = function(event){
    if( mouseMoveReciever ){
        mouseMoveReciever = null;
        document.removeEventListener('mousemove', mouseMoveHandler,true);
    }
}

document.addEventListener('mouseup', mouseUpHandler,true);

export class BorreyApp extends LitElement {
    static styles = css`
        a{
            color: ${ anchorColor };
        }
        :host{
            height : 100vh;
            width : 100vw;
            display : flex;
            flex-direction : column;            
            overflow : hidden;
        }
        
        #main-footer, #main-nav, #main-header, #main-article{
            min-width : 53em;
            margin: 0.5em auto;
        }
        #main-article{
            flex-grow : 1;
            display : flex;
            flex-direction : column;
            overflow: auto;
        }
        
        #main-section, #main-aside{
            border: 1px solid grey;
            border-radius: 10px;
            background: white;
        }

        #main-section{
            border:1px solid orange;
            height : 100%;
            transition: height 0.5s;
        }
        #main-article.split #main-section{
            height : 50%;
            resize : vertical;
            margin-bottom: 0px;
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
        }

        #main-aside{
            overflow: auto;
            border:1px solid green;
            display : none;
        }
        #main-article.split #main-aside{
            flex-grow : 1;
            display : block;
            margin-top: 0px;
            border-top-left-radius: 0;
            border-top-right-radius: 0;

        }

        #main-article.split hr#main-split{
            display : block;
            min-width : 43em;
            margin: 0;
            z-index : 1;
        }
        
        hr#main-split{
            display : none;
            cursor: row-resize;
            background-color: white;
            height : 1em;
            border: 1px solid;
            text-align: center;
        }
        hr#main-split:before {
            content: "\\2022 \\2022 \\2022";
        }

        #main-header h1{
            height: 1em;
            margin-block: 0.1em auto;
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
        <header id='main-header'>
            <h1>
                Borrey Kim
            </h1>
        </header>
        <nav id='main-nav'></nav>
        <article id='main-article' class='${this.split ? "split" : "" }'>
            <section id='main-section' class="">
                <div>
                    <label>Split View <input type='checkbox' .checked=${this.split} @change=${this._splitOption}></label>
                </div>
                <borrey-block></borrey-block>
                <!--<borrey-question-set></borrey-question-set> -->
            </section>
            <hr id='main-split' tabindex="0" title='resize section' aria-orientation=horizontal role='separator' @dblclick='${ this._splittoggle }' @keydown='${this._splitKeyHandler}' @mousedown='${this._splitmousedown}' @blur='${this._splitblur}' @focus="${this._splitfocus}" />
            <aside id='main-aside' class="">
                Asside
            </aside>    
        </article>
        <footer id='main-footer'>
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

      _splittoggle( event ){
          console.log('splittoggle');
          this.split = false;
          this.section.style.height = `${100}%`;
        event.preventDefault();
        event.stopPropagation();
      }
      _splitOption( event ){
        this.split=(event.target.checked);
        this.section = this.shadowRoot.querySelector('#main-section');
        this.section.style.removeProperty('height');
      }
      _splitKeyHandler( event ){
        const e = event || window.event;
        this.sectionHeight = this.section.getBoundingClientRect().height;
        let h = 0;
        let dy = 10;
        if (e.keyCode == '38') {// up arrow
            h = ((this.sectionHeight - dy) * 100) / this.section.parentNode.getBoundingClientRect().height;    
        } else if (e.keyCode == '33') {// page up
            h = ((this.sectionHeight - dy*10) * 100) / this.section.parentNode.getBoundingClientRect().height;
        }else if (e.keyCode == '40') {// down arrow
            h = ((this.sectionHeight + dy) * 100) / this.section.parentNode.getBoundingClientRect().height;
        }else if (e.keyCode == '34') {// page down
            h = ((this.sectionHeight + dy*10) * 100) / this.section.parentNode.getBoundingClientRect().height;
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
        mouseMoveReciever = this;
        
        this.sectionHeight = this.section.getBoundingClientRect().height;
        document.addEventListener('mousemove', mouseMoveHandler,true);
        
      }
      
      _splitfocus(event){
        console.log('focus');
      }
      _splitblur( event ){
        console.log('blur');
      }

      

}

window.customElements.define('borrey-app', BorreyApp);