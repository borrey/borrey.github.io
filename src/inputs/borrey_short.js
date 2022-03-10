import {html, css } from 'lit';
import {BorreyInput} from './borrey_input';

export class InputShort extends BorreyInput {
    constructor(){
        super();
        this.answerType = 'text';
    }
    _getInput(){
        return html`<input type='${this.answerType}' name='attempt'/>
        <br/>
        <input type='submit' @click='${this._submit}' value='${this.actionLabel}'/>`;
    }
    static get is(){
        return 'input-short';
    }
    static get title(){
        return 'Text';
    }
    static get properties() {
        return {
            answerType : { type : String}
        };
    }
    static styles = [BorreyInput.styles, css`
        input[name="attempt"]{
            width : 100%;

        }
    `];
    static getEditForm( submit, actionLabel ){
        return html`<input type='text' name='attempt'/>
        <br/>
        <input type='submit' @click='${submit}' value='${actionLabel}'/>`;
    }
}
customElements.define(InputShort.is, InputShort);

/*export class InputShortEdit extends InputEdit {
    static get is(){
        return [InputShort.is,'edit'].join('-');
    }
}
customElements.define(InputShortEdit.is, InputShortEdit);*/
//text
    //language

//Math
    //numeric
    //expression
    //interval or set
    //vector
    //matrix
    //anti-derivative
    //factored
    //polynomial expression