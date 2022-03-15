import {LitElement, html, css} from 'lit';
import {mainThemes, icons} from '../themes';

import { BorreyBlock } from './block_base';

export class QuestionBlock extends BorreyBlock {
    static get properties() {
        return {
            inputs : { type : Array }
        };            
    }
    constructor() {
        super();
        this.inputs = [];
        this.icon = '?';
    }
}

window.customElements.define('question-block', QuestionBlock);