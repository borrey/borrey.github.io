import {LitElement, html, css} from 'lit';

import '../block/input-preview';
import {mainThemes, icons} from '../themes';
import {inputCommon} from './input-themes'

export class BorreyInput extends LitElement {
    static styles = [mainThemes,inputCommon, icons];
    static get is(){
        return 'borrey-input';
    }
    static get title(){
        return 'Generic';
    }
    static get properties() {
        return {
            instruction : { type : String },
            answerType : { type : String },
            actionUrl : { type : String },
            actionLabel : { type : String },
            history : { type : Array }
        };
    }
    constructor() {
        super();        
        this.instruction = 'Type in your Answer';
        this.answerType = 'text';
        this.actionUrl = '';
        this.actionLabel = 'Add Attempt';
        this.history = [];    
    }
    _getMenu(){
        return '';
    }
    _getInput(){
        return html`<input name='attempt'/><input type='submit' @click='${this._submit}' value='${this.actionLabel}'/>`;
    }
    _historyView( attempt ){
        const datetime = new Date(attempt.time);
        const datetimeString = datetime.toLocaleDateString('us-EN',{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })+' '+datetime.toLocaleTimeString();
        return html`
            <li>
                <div class='attempt'>
                    <input-preview .html='${'<strong>'+attempt.display+'</strong>'}'></input-preview>
                    <time datetime='${datetimeString}'>${datetimeString}</time>
                </div>
            </li>
        `;
    }
    _submit(event){
        event.preventDefault();
        event.stopPropagation();
        this.pushAttempt( this.shadowRoot.querySelector('input[name=attempt]').value );
    }
    pushAttempt( attempt ){
        this.history = [...this.history, { display : attempt, time : Date.now() }];
    }
    render() {
        return html`
            <strong>${this.instruction}</strong>
            <section class='menu'>${this._getMenu()}</section>
            <form action='${this.actionUrl}'>
                ${this._getInput()}
            </form>
            <details class='attempt_history'>
                <summary>${this.history.length} ${ this.history.length==1?'attempt':'attempts'}</summary>
                <ol >
                    ${ this.history.map( this._historyView ) }
                </ol>
            </details>
        `;
    }
}


window.customElements.define(BorreyInput.is, BorreyInput);