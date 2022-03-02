import viewer from "@bundled-es-modules/pdfjs-dist/web/pdf_viewer";
import pdfjsLib from "@bundled-es-modules/pdfjs-dist/build/pdf";

pdfjsLib.GlobalWorkerOptions.workerSrc =
  "assets/pdf.worker.js";

import {LitElement, html, css} from 'lit';
import {mainThemes, icons} from '../themes';

export class BorreyPDF extends LitElement {
    
    static styles = [icons,mainThemes];
    static get properties() {
        return {
            scale : { type : Number },
            url : { type : String }
        }
    }
    constructor() {
        super();
        this.url = 'assets/sample.pdf';
        this.scale = 1;
    }
    firstUpdated( changedProps ){
        const canvas = this.shadowRoot.querySelector('#pdf');
        var scale = this.scale;
        //let _page = null;
        var loadingTask = pdfjsLib.getDocument(this.url);//TODO: move to when url is updated
        loadingTask.promise.then(
            function(pdf) {
            // Fetch the first page
            console.log( 'pages:',pdf.numPages);
        var pageNumber = 1;
        pdf.getPage(pageNumber).then(function(page) {
          

          //var scale = 1;
          var viewport = page.getViewport({scale : 1});
          console.log("Page loaded", page,viewport);
          // Prepare canvas using PDF page dimensions
          var context = canvas.getContext("2d");
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          // Render PDF page into canvas context
          var renderContext = {
            canvasContext: context,
            viewport: viewport
          };
          var renderTask = page.render(renderContext);
          console.log("Page rendered", renderTask);
          renderTask.promise
          .then(function() {
            console.log("Page rendered");
          }).catch( error=>{
              console.error(error);
          });

        });
      },
      function(reason) {
        // PDF loading error
        console.error(reason);
      });
    }

    render() {//this.requestUpdate
        return html`<canvas id='pdf'></canvas>`;
    }

    static styles = css`
        :host{
            width : 100%;
        }
    `;


}

window.customElements.define('pdf-view', BorreyPDF);
/*
loadingTask = pdfjsLib.getDocument(url);
*/
