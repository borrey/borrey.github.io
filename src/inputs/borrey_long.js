//tables
//paragraph
//lists
//spell check

//pre-entered answer?

import {html, css} from 'lit';
import {BorreyInput} from './borrey_input';

export class InputLong extends BorreyInput {
    constructor(){
        super();
        this.attemptText = '';
        this.spellCheck = false;
    }
    _getInput(){
        return html`<textarea spellcheck='${this.spellCheck ? 'true' : 'false'}' @input='${this.updateCurrentAttempt}' name='attempt'>${this.attemptText}</textarea><input type='submit' @click='${this._submit}' value='${this.actionLabel}'/>`;
    }
    updateCurrentAttempt( event ){
        const target = event.target;
        this.attemptText = target.value;
        event.preventDefault();
        event.stopPropagation();
    }
    static styles = [
        ...BorreyInput.styles, [css`
            textarea[name=attempt]{
                display:block;
                width : 90%;
            }
        `]
    ];

    static get title(){
        return 'Paragraph Answers';
    }
    static get is(){
        return 'input-long';
    }
    static get properties() {
        return {
            attemptText : { type : String },
            spellCheck : { type : Boolean } 
        };
    }
    _submit(event){
        event.preventDefault();
        event.stopPropagation();
        this.pushAttempt( this.shadowRoot.querySelector('textarea[name=attempt]').value.replace(new RegExp('\n', 'g'),'<br/>') );
    }
}
customElements.define(InputLong.is, InputLong);