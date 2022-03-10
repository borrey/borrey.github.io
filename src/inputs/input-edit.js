import {LitElement, html, css} from 'lit';

import {unsafeHTML} from 'lit/directives/unsafe-html.js';

import { BorreyInput } from './borrey_input';

import { InputShort } from './borrey_short';
import { InputDraw } from './borrey_draw';
import { InputCode } from './borrey_code';
import { InputExcel } from './input-xslx';
import { InputMath } from './input-math';
import { InputLong } from './borrey_long';
import { InputChoice, InputMatch } from './borrey_choice';

import '../block/input-preview';
import {mainThemes, icons} from '../themes';
import {inputCommon} from './input-themes';


export class BorreyEditInput extends BorreyInput {
    static styles = [mainThemes,inputCommon, icons];
    static get is(){
        return 'borrey-input-edit';
    }
    static get title(){
        return 'Input Editor';
    }
    static get properties() {
        return {
            answerTypes : { type : Array }
        };
    }
    constructor() {
        super();        
        this.instruction = 'Type in your Answer';
        this.actionUrl = 'Add Answer Key';
        this.actionLabel = 'Add Attempt';
        this.history = [];
        this.answerTypes = [
            { name : 'text', obj : InputShort },
            { name : 'long text', obj : InputLong },
            { name : 'multiple choice', obj : InputChoice },
            { name : 'multiple select', obj : InputChoice },//multiple=true
            { name : 'matching', obj : InputMatch },//
            { name : 'math expression', obj : InputMath },
            { name : 'excel sheet', obj : InputExcel },
            { name : 'draw', obj : InputDraw }            
        ];
        this.answerType = this.answerTypes[0];
    }
    _submit(event){
        event.preventDefault();
        event.stopPropagation();
        this.pushAttempt( this.shadowRoot.querySelector('input[name=attempt]').value );
    }
    pushAttempt( attempt ){
        this.history = [...this.history, { display : attempt, mark : this.history.length ? 0 : 1 }];
    }
    render() {//${unsafeHTML()}
        return html`
            <label>Choose input type:  
                <select name='answer_type' @change='${this._answerTypeChanged}' value=${this.answerType }}>
                    ${this.answerTypes.map( type=>{ return this.getAnswerTypeOption(type.name) })}
                </select>
            </label>
            ${ this.getKeyEntryForm( this.answerType ) }
        `;
    }
    getAnswerTypeOption( type ){
        return html`
        <option value='${type}'>${type}</option>
        `;
    }
    getKeyEntryForm( answerType){
        const typeObj =  this.answerTypes.find( type=> answerType==type );
        typeObj.getEditForm();
        console.log('key form:',typeObj);
    }
    _answerTypeChanged(event){
        this.answerType = event.target.value;
        console.log('answer type Changed', this.answerType);
    }
    _historyView( attempt, idx ){
        return html`
            <li>
                <div class='attempt'>
                    <input-preview .html='${'<strong>'+attempt.display+'</strong>'}'></input-preview>
                    <input type='number' name='mark_${idx}' min='0' max='1' @change=${this.attemptUpdateMark}>
                </div>
            </li>
        `;
    }

    attemptUpdateMark( event ){
        console.log('update make', event.target, event.target.value );
    }
}

window.customElements.define(BorreyEditInput.is, BorreyEditInput);