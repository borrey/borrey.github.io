import {LitElement, html, css} from 'lit';
import {BorreyBlock} from './block_base';

//<borrey-block></borrey-block>

import '../block/block_base';
import '../block/question_set';
import '../inputs/borrey_input';
import '../inputs/borrey_draw';
import '../inputs/borrey_code';
import '../inputs/input-xslx';
import '../inputs/input-math';
import '../inputs/borrey_long';
import '../inputs/borrey_choice';
import './pdf_view';
export function DashboardViewHandler(){
    console.log('Show Dashboard');
}
export function PostsViewHandler(){
    console.log('Show Posts');
}
export function PostViewHandler( id ){
    console.log(`Show Post`, id);
}


let x = 0;
let y = 0;
let mouseMoveReciever = null;
const mouseMoveHandler = function(event) {
    // How far the mouse has been moved
    if(mouseMoveReciever){
        const dx = event.clientX - x;
        const dy = event.clientY - y;
        const h = Math.min(((mouseMoveReciever.section.getBoundingClientRect().height + dy) * 100) / mouseMoveReciever.section.parentNode.getBoundingClientRect().height, 100);
        const assideH = 100-h;
        mouseMoveReciever.section.style.height = `${h}%`;
        //mouseMoveReciever.shadowRoot.querySelector('#main-aside').style.height = `${assideH}%`;
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

export class BorreyMainView extends LitElement{

    static get properties() {
        return {
            fullScreen : { type : Boolean },
            split : { type : Boolean }
        };
    }

    static styles = css`
        :host{
            min-width : 53em;
            max-width: 100vw;
            margin: 0.5em auto;
            overflow: auto;
            transition: max-width 0.2s ease;
            transition: min-width 0.2s ease;
        }
        
        #main-article{
            height : 100%;
            display : flex;
            flex-direction : column;

        }
        
        #main-section, #main-aside{
            border: 1px solid grey;
            border-radius: 10px;
            padding: 1em;
            background: white;
            overflow: auto;
        }

        #main-section{
            border:1px solid orange;
            height : 100%;
            transition: height 0.5s;
        }
        :host(.split) #main-section{
            height : 50%;
            resize : vertical;
            margin-bottom: 0px;
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
        }

        #main-aside{
            border:1px solid green;
            display : none;
        }
        :host(.split) #main-aside{
            flex : 1 0 0px;
            display : block;
            margin-top: 0px;
            border-top-left-radius: 0;
            border-top-right-radius: 0;
            z-index : 1;

        }

        :host(.split) hr#main-split{
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
    `;

    constructor() {
        super();
        this.split = false;
        this.fullScreen = false;
        this.initial_try = true;
        this.addEventListener('fullscreenchange', event => { 
            
            if(this.initial_try && !document.fullscreenElement ){
                alert('warning: should be fullscreen');
                //this.openFullscreen();
            }
            
        });
    }

    render() {
        return html`
        <article id='main-article'>
            <section id='main-section' class="">
                <div>
                    <label>Split View <input type='checkbox' .checked=${this.split} @change=${this._splitOption}></label>
                    <label>Full Screen View <input type='checkbox' .checked=${this.fullScreen} @change=${this._fullScreenOption}></label>
                </div>
                <input-long></input-long>
                <input-short></input-short>
                <input-math></input-math>
                <input-spreadsheet></input-spreadsheet>
                <borrey-draw></borrey-draw>
                <input-choice multiple></input-choice>
            <input-choice></input-choice>
            <input-match></input-match>
                <!--<borrey-question-set></borrey-question-set> -->
            </section>
            <hr id='main-split' tabindex="0" title='resize section' aria-orientation=horizontal role='separator' @dblclick='${ this._splittoggle }' @keydown='${this._splitKeyHandler}' @mousedown='${this._splitmousedown}' @blur='${this._splitblur}' @focus="${this._splitfocus}" />
            <aside id='main-aside' class="">
                Asside:
                <pdf-view></pdf-view>
            </aside>    
        </article>
        `;
    }
    _fullScreenOption( event ){
        this.fullScreen=(event.target.checked);
        if(this.fullScreen){
            this.openFullscreen();
        }else{
            this.closeFullscreen();
        }
    }
    openFullscreen() {
        if (this.requestFullscreen) {
            this.requestFullscreen();
        } else if (this.webkitRequestFullscreen) { /* Safari */
            this.webkitRequestFullscreen();
        } else if (this.msRequestFullscreen) { /* IE11 */
            this.msRequestFullscreen();
        }
    }
    closeFullscreen() {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
          document.msExitFullscreen();
        }
    }

    _splitOption( event ){
        this.split=(event.target.checked);
        this.section = this.shadowRoot.querySelector('#main-section');
        this.section.style.removeProperty('height');
        if( this.split ){
            this.classList.add('split');
        }else{
            this.classList.remove('split');
        }
    }

    _splittoggle( event ){
        console.log('splittoggle');
        this.split = false;
        this.section.style.height = `${100}%`;
        this.classList.remove('split');
      event.preventDefault();
      event.stopPropagation();
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

window.customElements.define('borrey-main-view', BorreyMainView);

export class DashboardView extends BorreyBlock{

}


/** List of Posts */
export class PostsView extends BorreyBlock{
    
}

/** List of Single Post */
export class PostView extends BorreyBlock{
    
}