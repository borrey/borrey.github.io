import {LitElement, html, css} from 'lit';
import dialogPolyfill from 'dialog-polyfill';

import {navigateTo} from './menu/menu';
import './users/user';



import {mainThemes, icons} from './themes';

//SuperElement.styles,
//const anchorColor = css`${colourScemes.main.}`;

export class BorreyApp extends LitElement {
    static styles = [icons,mainThemes,css`
        
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
        
        borrey-main-view{
            flex-grow : 1;
        }

        #main-header h1{
            height: 1em;
            margin-block: 0.1em auto;
        }
    `];
    
      static get properties() {
        return {
            rand : { type : Number }
        };
      }
    
      constructor() {
        super();
        this.dialog = null;///close() //show() //showModal() //focusout:https://gist.github.com/samthor/babe9fad4a65625b301ba482dad284d1
        this._init()
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
        <nav id='main-nav'>
            <borrey-menu></borrey-menu>
        </nav>
        <borrey-main-view id='main-article'></borrey-main-view>
        <a href='/block/23/32' data-internal-link>hello world</a>
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

      

      
      

      _init(){
          this.addEventListener('click', ( event )=>{
              const origin = event.composedPath()[0];
              
              
            if(origin.matches('[data-internal-link]')){
                event.preventDefault();  
                navigateTo(origin.href);
            }
          });

          this.addEventListener('content-request', function( event ){
            console.log('content-request:', event.details );
          });
      }

}

window.customElements.define('borrey-app', BorreyApp);