import {html, css } from 'lit';
import {InputLong} from './borrey_long';
import {EditorState, EditorView, basicSetup} from "@codemirror/basic-setup"
import {javascript} from "@codemirror/lang-javascript"

export class InputCode extends InputLong {
    constructor(){
        super();
        this.codeLanguage = 'text/javascript';
        this.attemptText = '';
        this.instruction = 'Type in your code below';
    }
    _getInput(){
        return html`<textarea name='attempt'></textarea><input type='submit' @click='${this._submit}' value='${this.actionLabel}'/>`;
    }
    static get title(){
        return 'Code';
    }
    static get is(){
        return 'input-code';
    }
    static get properties() {
        return {
            attemptText : { type : String },
            codeLanguage : { type : String }
        };
    }
    static styles = InputLong.styles;
    firstUpdated(changedProperties){//TODO: NOT working
        if(!this.querySelector('.CodeMirror')){
            let textarea = this.shadowRoot.querySelector('textarea[name=attempt]');
            this.editor = new EditorView({
                state: EditorState.create({
                  extensions: [basicSetup, javascript()]
                }),
                doc: textarea.value
              });
              this.shadowRoot.querySelector('textarea[name=attempt]').style.display = "none";
              textarea.parentNode.insertBefore(this.editor.dom, textarea);
              /*CodeMirror.fromTextArea(this.querySelector('textarea[name=attempt]'),{
                lineNumbers: true,
                mode: this.codeLanguage
            });*/
            //this.editor.getDoc().setValue(this.attemptText);
            /*this.editor.on('renderLine',(cm, line, elt)=>{
                this.attemptText = this.editor.save();
            });*/
        }
    }
    _submit(event){
        event.preventDefault();
        event.stopPropagation();
        /*if(this.editor){
            this.editor.save();
        }
        this.pushAttempt( this.querySelector('textarea[name=attempt]').value.replace(new RegExp('\n', 'g'),'<br/>') );
        */
        this.pushAttempt(this.editor.state.doc.toString());
    }
}
customElements.define(InputCode.is, InputCode);
/*
class InputCodeEdit extends InputLongEdit {
    static get is(){
        return [InputCode.is,'edit'].join('-');
    }
}
customElements.define(InputCodeEdit.is, InputCodeEdit);*/