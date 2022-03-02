
/**
 * There is no great way of dynamically injecting html into an element without explicit javascript .html=<>
 * so this is a wrapper for this.
 */
customElements.define(
    'input-preview',
    class extends HTMLElement {
        constructor() {
            super();
            Object.defineProperty(this, "html", {
                get: function() { return this.val; },
                set: function(val) {
                    this.val = val;
                    this.innerHTML = this.val;
                }
            });
            this.html = this.getAttribute('.html') || '';
            this.observer = new MutationObserver(this.mutationCallback.bind(this));
            this.observer.observe(this, { attributes : true });
        }
        mutationCallback(mutationsList, observer){
            mutationsList.forEach( (record => {
                if(record.type==='attributes' && record.attributeName==='.html'){
                    this.html = this.getAttribute('.html');                    
                }
            }).bind(this));
        }
    }
);