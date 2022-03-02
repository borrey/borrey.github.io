import {LitElement, html, css} from 'lit';

//goals : 
/*
SAML service provider (https://www.npmjs.com/package/saml2-js#ServiceProvider)
Gmail ( https://cloud.google.com/nodejs/docs/reference/google-auth-library/latest )
Apple (https://www.npmjs.com/package/apple-signin)
JWT

*/

export class BorreyUser extends LitElement {
    static styles = css`
      
    `;
    static get properties() {
        return {
            username : { type : String }
        }
    }
    createRenderRoot() {
        return this;
    }
    constructor() {
        super();
        this.username = undefined;
        
    }
    render() {
        return 
        this.username ? this._showUserOptions(this.username) : this._showLogin()
    }
    _showLogin(){
        return html`<borrey-showlogin></borrey-showlogin>`;
    }
    _showUserOptions(username){
        html`<button>logout</button>`;
    }
} 

export class BorreyLocalLogin extends LitElement {
    static styles = css`
      
    `;
    static get properties() {
        return {
            username : { type : String },
            showPassword : { type : Boolean }
        }
    }
    createRenderRoot() {
        return this;
    }
    constructor() {
        super();
        this.username = undefined;
        this.showPassword = false;
    }
    render() {
        return 
        this.username ? this._showUserOptions(this.username) : this._showLogin()
    }
    _showLogin(){
        html`
            <input type='text'/>
            <input type='${ this.showPassword ? 'text' : 'password' }'/>
            <label>Show Password<input type='checkbox' .checked=${this.showPassword} @change=${this._showPasswordtoggle}/></label>
        `;
    }
    _showPasswordtoggle( event ){
        this.showPassword=(event.target.checked);
    }
} 

window.customElements.define('borrey-showlogin', BorreyLocalLogin);
window.customElements.define('borrey-user', BorreyUser);
