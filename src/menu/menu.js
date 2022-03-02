import {LitElement, html, css} from 'lit';
import { DashboardViewHandler, PostsViewHandler, PostViewHandler } from '../block/main_view';
import { SettingsViewHandler } from '../settings/settings_view';

const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
};

const router = async () => {
    const routes = [
        { path: "/", view: DashboardViewHandler },
        { path: "/blocks", view: PostsViewHandler },
        { path: "/block/:id", view: PostViewHandler },
        { path: "/settings", view: SettingsViewHandler }
    ];

    // Test each route for potential match
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

    if (!match) {
        match = {
            route: routes[0],
            result: [location.pathname]
        };
    }

    const view = new match.route.view(getParams(match));
};

window.addEventListener("popstate", router);

export function navigateTo( href ){
    history.pushState(null, null, href );
    router();
}

document.addEventListener('DOMContentLoaded',()=>{
    //find location.pathname
    navigateTo(location.pathname);
});

export class BorreyMenu extends LitElement {
    static styles = css`
      ul[role="tree"] {
        margin: 0;
        padding: 0;
        list-style: none;
        font-size: 120%;
      }

    `;
    static get properties() {
        return {
            title : { type : String },
            sections : { type : Array }
        }
    }
    constructor() {
        super();
        this.title = 'Menu Example';
        this.sections = [];
        //this.addEventListener('borrey_selected',);
    }
    render() {
        return html`
            <label id="tree_label">${this._displayTitle( this.title )}</label>
            <div role="tree" aria-labelledby="tree_label">
                ${ this.sections.map( ( section )=>{this._treeItem(section) } ) }
            </div>
        `;
    }

    _displayTitle( title ){
        return html`${title}`;
    }
    _treeItem( item ){
        switch(item.type){
            case 'menu':
            case 'menu_item':
                return html`<borrey-folder role="group" type='${item.type}' title='${item.title}' sections='${ item.items || item.sections }'></borrey-folder>`;
                break;
            case 'link':
                return html``;
                break;
            case 'question_set':
                return html``;
                break;
            case 'menu_content':
                return html``;
                break;
            default:
                return html``;
        }
    }
}

export class BorreyFolder extends LitElement {
    static styles = css`
      
    `;
    static get properties() {
        return {
            type : { type : String },
            title : { type : String },
            sections : { type : Array }
        }
    }
    createRenderRoot() {
        return this;
    }
    constructor() {
        super();
        this.title = 'Menu Example';
        this.sections = [];
        //this.addEventListener('borrey_selected',);
    }
    render() {
        return html`
            <label id="tree_label">${this._displayTitle( this.title )}</label>
            
        `;
    }

    _displayTitle( title ){
        return html`${title}`;
    }
    _treeItem( item ){
        switch(item.type){
            case 'menu':
            case 'menu_item':
                return html`<borrey-folder role="group" type='${item.type}' title='${item.title}' sections='${ item.items || item.sections }'></borrey-folder>`;
                break;
            case 'link':
                return html``;
                break;
            case 'question_set':
                return html``;
                break;
            case 'menu_content':
                return html``;
                break;
            default:
                return html``;
        }
    }
} 

export class BorreyLink extends LitElement {
    static styles = css`
      
    `;
    static get properties() {
        return {
            title : { type : String },
            sections : { type : Array }
        }
    }
    constructor() {
        super();
        this.title = 'Menu Example';
        this.sections = [];
        //this.addEventListener('borrey_selected',);
    }
    render() {
        return html`
            <label id="tree_label">${this._displayTitle( this.title )}</label>
            
        `;
    }

    _displayTitle( title ){
        return html`${title}`;
    }
    _treeItem( item ){
        switch(item.type){
            case 'menu':
            case 'menu_item':
                return html``;
                break;
            case 'link':
                return html``;
                break;
            case 'question_set':
                return html``;
                break;
            case 'menu_content':
                return html``;
                break;
            default:
                return html``;
        }
    }
} 

window.customElements.define('borrey-menu', BorreyMenu);
window.customElements.define('borrey-folder', BorreyFolder);
window.customElements.define('borrey-link', BorreyLink);