import {LitElement, html, css} from 'lit';
import {mainThemes, icons} from '../themes';



export class BorreyBlock extends LitElement {
    
    static styles = [icons,mainThemes, css`
    :host{
        display: grid;
        grid-template-areas:
            "top top"
            "side content";
        max-height: 100%;
        overflow : auto;
        grid-template-columns: 10em  auto;
    }
    article.content{
        grid-area: content;
        overflow: auto;     
        margin-bottom : 2em; 
    }
    aside.side-nav{
        grid-area : side;
        display : flex;
        flex-direction : column;
    }
    aside.side-nav .block-nav, aside.side-nav .share{
        border-right: 8px solid transparent;
        border-bottom: 1px solid #aaa;
        border: 1px solid #ccc;
        box-shadow: 0 1px 2px #ccc;
        margin-right: 1em;
        margin-bottom: 1em;
        position : relative;
    }
    aside.side-nav .block-nav{
        background: #f5fffa;
        min-height : 3em;
    }
    aside.side-nav .share{
        background: #f9fbba;
        min-height : 3em;
    }
    
    div.top-bar{
        display : flex;
        align-items : center;
        justify-content:space-between;
        grid-area : top;
        
    }
    .block-nav ul{
        overflow : auto;
    }
    `];

    static get properties() {
        return {
            id : { type : String },
            title : { type : String },
            icon : { type : String },

            content : { type : String },
            sections : { type : Array },
            meta : { type : Array }
        };            
    }

    constructor() {
        super();

        this.title = 'Unknown Title';//label
        this.icon = '?';
        this.content = `default content <borrey-input-edit></borrey-input-edit>
        
        
        <input-math></input-math>
        <input-spreadsheet></input-spreadsheet>
        <borrey-draw></borrey-draw>
        <input-choice multiple></input-choice>
    <input-choice></input-choice>
    <input-match></input-match>`;
        this.sections = [
            {
                url: "/b/22886?context=%5B%2225842%22%2C%22m6%22%2C%22m6_8%22%2C%2225994%22%5D",
                html : `<input-long></input-long>`
            }, 
            {
                url: "/b/22886?context=%5B%2225842%22%2C%22m6%22%2C%22m6_8%22%2C%2225994%22%5D",
                html : `<input-short></input-short>`
            }, 
            {
                url: "/b/22886?context=%5B%2225842%22%2C%22m6%22%2C%22m6_8%22%2C%2225994%22%5D",
                html : ``
            }
        ];
        this.meta = [];
    }

    firstUpdated( changedProps ){
    }

    render() {//this.requestUpdate
        return html`
            <div class='top-bar'>
                <h2>${this.title}</h2>
                <div class='meta'></div>
                <nav>
                    <button>Prev</button><button>Next</button>
                </nav>
            </div>
            <aside class='side-nav'>
                <nav class='block-nav'>

                </nav>
                <section class='share'>
                    some share
                </section>
            </aside>
            <article class='content'>
                <section>
                    <input-preview .html='${this.content}'></input-preview>
                </section>
                ${this.sections.map( this._displaySection )}
            </article>
        `;
    };

    _displaySection( section ){
        return html`
            <section>
            <input-preview .html='${ section.html }'></input-preview>
            <!--<p>
                Lorem ipsum dolor sit amet, <a href='/block/23/32' data-internal-link>Sample section</a>
                </p>
                
    -->

                <!--<borrey-question-set></borrey-question-set> -->

            </section>
        `;
    }

}

window.customElements.define('borrey-block', BorreyBlock);