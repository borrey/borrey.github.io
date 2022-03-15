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
        this.answerType = this.answerTypes[0]['name'];
    }
    _submit(event){
        event.preventDefault();
        event.stopPropagation();
        this.pushAttempt( this.shadowRoot.querySelector('input[name=attempt]').value );
    }
    pushAttempt( attempt ){
        this.history = [...this.history, { display : attempt, max_mark : this.history.length ? 0 : 100 }];
    }
    render() {//${unsafeHTML()}
        return html`
            <label>Choose input type:  
                <select name='answer_type' @change='${this._answerTypeChanged}' value=${this.answerType }}>
                    ${this.answerTypes.map( type=>{ return this.getAnswerTypeOption(type.name) })}
                </select>
            </label>
            <section>
                ${ this.getKeyEntryForm( this.answerType ) }
            </section>
            <details class='attempt_history'>
                <summary>${this.history.length} ${ this.history.length==1?'Answer key':'Answer keys'}</summary>
                <ol >
                    ${ this.history.map( this._historyView.bind(this) ) }
                </ol>
            </details>
        `;
    }
    _submit(event){
        event.preventDefault();
        event.stopPropagation();
        this.pushAttempt( this.shadowRoot.querySelector('input[name=attempt]').value );
    }
    getAnswerTypeOption( type ){
        return html`
        <option value='${type}'>${type}</option>
        `;
    }
    getKeyEntryForm( answerType){
        const typeObj =  this.answerTypes.find( type=>{
            return answerType==type.name;
        } );
        return typeObj.obj.getEditForm( this._submit, "Add Key" );
    }
    _answerTypeChanged(event){
        this.answerType = event.target.value;
    }
    _historyView( attempt, idx ){
        return html`
            <li>
                <div class='attempt'>
                    <input-preview .html='${'<strong>'+attempt.display+'</strong>'}'></input-preview>
                    <label>Max Mark: <input type='number' name='mark_${idx}' min='0' max='100' value=${attempt.max_mark} @change=${ (event)=>{this.attemptUpdateMark( attempt, idx, event )}}></label>
                </div>
            </li>
        `;
    }

    attemptUpdateMark( attempt, idx, event ){
        attempt.max_mark = event.target.value;
    }
}

window.customElements.define(BorreyEditInput.is, BorreyEditInput);