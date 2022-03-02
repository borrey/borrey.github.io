import {html, css } from 'lit';
import {BorreyInput} from './borrey_input';
import {mainThemes, colourScemes} from '../themes';
import {inputCommon} from './input-themes';

export class InputChoice extends BorreyInput {
    constructor(){
        super();
        this.inputId = 'choice1234';
        this.multiple = false;
        this.choices = [
            { display : '<p>This is an option</p>', value : 'option1' },
            { display : '<p>Another option</p>', value : 'option2' }
        ];
        this.instruction = 'Choose the best Answer';
    }
    _getInput(){
        return html`
            <section class='choices'>
                ${this.choices.map( choice=>{
                    return html`
                        <label>
                            <input type='${ this.multiple ? 'checkbox' : 'radio'}' name='${this.inputId}'/>
                            <input-preview .html='${choice.display}'></input-preview>
                        </label>
                    `;
                })}
            </section>
            <section><input type='submit' @click='${this._submit}' value='${this.actionLabel}'/></section>
        `;
    }
    static get is(){
        return 'input-choice';
    }
    static get title(){
        return 'Choices';
    }
    static get properties() {
        return {
            choices : { type : Array},
            inputId : { type : String },
            multiple : { type : Boolean }
        };
    }
    static styles = [ mainThemes, inputCommon, css`
        .choices label{
            display : grid;
            grid-template-columns: 1em auto;
            align-items: center;
        }
        .match_row{
            display : grid;
            
            grid-template-columns: auto;
            align-items: center;
        }
    ` ]
    multipleAttempt(){
        const choices = Array.from(this.shadowRoot.querySelectorAll('.choices input[type=checkbox]:checked'));
        console
        return { display : `<section>${ choices.map( choice=>{
            
            return choice.nextElementSibling.html;
        }).join('</br>')}</section>`, value : choices.map( choice=> choice.value ) }
    }
    choiceAttempt(){
        const choice = this.shadowRoot.querySelector('.choices input[type=radio]:checked');
        console.log(choice);
        return { display : choice.nextElementSibling.html, value : choice.value }
    }
    _submit(event){
        event.preventDefault();
        event.stopPropagation();
        this.pushAttempt( this.multiple ? this.multipleAttempt() : this.choiceAttempt() );
    }
    pushAttempt( attempt ){
        this.history = [...this.history, { display : attempt.display, time : Date.now() }];
    }
}
customElements.define(InputChoice.is, InputChoice);


//multiple choice
//multiple select

export class InputMatch extends BorreyInput {
    constructor(){
        super();
        this.inputId = 'choice1234';
        this.multiple = false;
        this.choices = [
            { display : '<stong>This is an option</stong>', value : 'choice1' },
            { display : '<img src="https://via.placeholder.com/350x150"/>', value : 'choice2' }
        ];
        this.options = [{ display : 'option 1', value : 'option1'},{ display : 'option 2', value : 'option2'}];
        this.instruction = 'Match the rows and columns';
    }
    _getInput(){
        return html`
            <table class='choices'>
                <thead>
                    <tr>
                        <th></th>
                        ${this.options.map( option=>html`<th>
                            <input-preview .html='${option.display}'></input-preview>
                        </th>`)}
                    </tr>
                </thead>
                <tbody>
                    ${this.choices.map( choice=>html`
                        <tr>
                            <th>
                                <input-preview .html='${choice.display}'></input-preview>
                            </th>
                            ${this.options.map( option=>html`
                                <td>
                                    <input @change='${this.chooseOption}' type='radio' name='${choice.value}' value='${option.value}' />
                                </td>`
                            )}
                        </tr>`)}
                </tbody>
            </table>
            <section><input type='submit' @click='${this._submit}' value='${this.actionLabel}'/></section>
        `;
    }
    static get is(){
        return 'input-match';
    }
    static get title(){
        return 'Matching';
    }
    static get properties() {
        return {
            choices : { type : Array},
            options : { type : Array }
        };
    }
    static styles = [ mainThemes, inputCommon ]
    chooseOption(event){
        event.preventDefault();
        event.stopPropagation();
        const target = event.target || event.srcElement;
        if(target.checked){
            const needToClean = Array.from(this.shadowRoot.querySelectorAll(`table.choices input[value=${target.value}]:checked`)).filter( input=>input.getAttribute('name')!==target.getAttribute('name'));
            needToClean.forEach( input=>{
                input.checked = false;
            });
        }
    }
    
    _submit(event){
        event.preventDefault();
        event.stopPropagation();
        const attempt = Array.from(this.shadowRoot.querySelectorAll(`table.choices input[type=radio]:checked`)).map( chosen=>{ return { choice : chosen.getAttribute('name'), option : chosen.value };});
        const display = this.choices.map( choice=>`
            <section class='match_row'>
                <input-preview .html='${choice.display}'></input-preview><input-preview .html='${this.findAttemptOption( attempt, choice.value )}'></input-preview>
            </section>
        `).join('');
        console.log('submit: ', attempt);
        this.pushAttempt( { display : display } );
    }
    findAttemptOption( attempt, choice ){
        const choiceAttempt = attempt.find( attemptRow=>attemptRow.choice===choice );
        if(!choiceAttempt){
            console.warn(attempt,choice);
            return '<section>Not Selected</section>';
        }
        const option = this.options.find( option=>option.value===choiceAttempt.option );
        if(!option){
            console.error(choiceAttempt,this.options);
            return '<section>ERROR</section>';
        }
        return option.display;
    }
    pushAttempt( attempt ){
        this.history = [...this.history, { display : attempt.display, time : Date.now() }];
    }
}
customElements.define(InputMatch.is, InputMatch);
//matching
//map ( multiple choice but on an image )


/*
class InputChoiceEdit extends InputEdit {
    static get is(){
        return [InputChoice.is,'edit'].join('-');
    }
}
customElements.define(InputChoiceEdit.is, InputChoiceEdit);

class InputMatchEdit extends InputEdit {
    static get is(){
        return [InputMatch.is,'edit'].join('-');
    }
}
customElements.define(InputMatchEdit.is, InputMatchEdit);
*/