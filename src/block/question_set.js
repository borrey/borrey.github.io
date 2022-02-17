import {LitElement, html, css} from 'lit';

import {BorreyBlock} from './block_base';

export class BorreyQuestionSet extends BorreyBlock {

    constructor() {
        super();

    }
    static get styles(){
        return [BorreyBlock.styles,css`
            table.question-set{
                display: inline-block;
                border-collapse: collapse;
                min-width: 100%;
                table-layout: fixed;
            }

            table.question-set tr:first-child{
                border-top: 1px solid black;
            }
            table.question-set tr {
                border-bottom: 1px solid black;
            }
            table.question-set th {
                text-align: right;
                padding-right: 5px;
                border-right: 1px solid black;
            }
            table.question-set td {
                border-right: 1px solid black;
                padding: 1px;
                text-align: center;
                vertical-align: middle;
                width: 2em;
                min-height: 100%;
            }
        `];
    }
    static get properties() {
        return {
            attribuesRows : { type : Array }
        }
    }

    render() {//this.requestUpdate
        return html`
            <table class='question-set'>
                <!--
                    <caption></caption>
    	            <thead></thead>
                -->
                <tbody>
                    <tr>
                        <th> ${ this.title } </th>
                        ${ this.sections.map( this._getSectionLink ) }
                        <!-- <td></td> -->
                    </tr>
                    ${this.attribuesRows}
                </tbody>
            </table>
        `;
    }

    _getSectionLink( section, idx ){
        return html`<td><a href='${section.url}'>${ idx+1 }</a></td>`;
    }

    _getAttributeRows(){

    }

}

window.customElements.define('borrey-question-set', BorreyQuestionSet );

/*
<table data-id="">
    	<colgroup></colgroup>
    	<!--<caption></caption>
    	    <thead></thead>-->
    	<tbody>
    	  <tr>
    	    <th>
    	      <a class="test_me_link" href="/b/22798?context=%5B%2225842%22%2C%22m7%22%2C%22m7_2%22%2C%2243048%22%5D">Practice Problems</a><br>
                  
    	    </th>
    	    
    	    <td data-id="22798"><a data-id="22798" href="/b/22798?context=%5B%2225842%22%2C%22m7%22%2C%22m7_2%22%2C%2243048%22%5D">1</a></td>
    	    
    	    <td data-id="22805"><a data-id="22805" href="/b/22805?context=%5B%2225842%22%2C%22m7%22%2C%22m7_2%22%2C%2243048%22%5D">2</a></td>
    	    
    	    <td data-id="27330"><a data-id="27330" href="/b/27330?context=%5B%2225842%22%2C%22m7%22%2C%22m7_2%22%2C%2243048%22%5D">3</a></td>
    	    
    	    <td data-id="22813" class="current"><a data-id="22813" href="/b/22813?context=%5B%2225842%22%2C%22m7%22%2C%22m7_2%22%2C%2243048%22%5D" class="current">4</a></td>
    	    
    	    <td data-id="22824"><a data-id="22824" href="/b/22824?context=%5B%2225842%22%2C%22m7%22%2C%22m7_2%22%2C%2243048%22%5D">5</a></td>
    	    
    	    <td data-id="22836"><a data-id="22836" href="/b/22836?context=%5B%2225842%22%2C%22m7%22%2C%22m7_2%22%2C%2243048%22%5D">6</a></td>
    	    
    	    <td data-id="22809"><a data-id="22809" href="/b/22809?context=%5B%2225842%22%2C%22m7%22%2C%22m7_2%22%2C%2243048%22%5D">7</a></td>
    	    
    	    <td data-id="22842"><a data-id="22842" href="/b/22842?context=%5B%2225842%22%2C%22m7%22%2C%22m7_2%22%2C%2243048%22%5D">8</a></td>
    	    
    	    <td data-id="22795"><a data-id="22795" href="/b/22795?context=%5B%2225842%22%2C%22m7%22%2C%22m7_2%22%2C%2243048%22%5D">9</a></td>
    	    
    	    <td data-id="22807"><a data-id="22807" href="/b/22807?context=%5B%2225842%22%2C%22m7%22%2C%22m7_2%22%2C%2243048%22%5D">10</a></td>
    	    
    	    <td data-id="22826"><a data-id="22826" href="/b/22826?context=%5B%2225842%22%2C%22m7%22%2C%22m7_2%22%2C%2243048%22%5D">11</a></td>
    	    
    	    <td data-id="22779"><a data-id="22779" href="/b/22779?context=%5B%2225842%22%2C%22m7%22%2C%22m7_2%22%2C%2243048%22%5D">12</a></td>
    	    
    	    <td data-id="22894"><a data-id="22894" href="/b/22894?context=%5B%2225842%22%2C%22m7%22%2C%22m7_2%22%2C%2243048%22%5D">13</a></td>
    	    
    	    <td data-id="27332"><a data-id="27332" href="/b/27332?context=%5B%2225842%22%2C%22m7%22%2C%22m7_2%22%2C%2243048%22%5D">14</a></td>
    	    
    	    <td data-id="22827"><a data-id="22827" href="/b/22827?context=%5B%2225842%22%2C%22m7%22%2C%22m7_2%22%2C%2243048%22%5D">15</a></td>
    	    
    	  </tr>
    	  <tr>
    	    <th>Difficulty (1-5):</th>
    	    
    	    <td data-id="22798">1</td>
    	    
    	    <td data-id="22805">1.5</td>
    	    
    	    <td data-id="27330">1.5</td>
    	    
    	    <td data-id="22813" class="current">2</td>
    	    
    	    <td data-id="22824">2.5</td>
    	    
    	    <td data-id="22836">4</td>
    	    
    	    <td data-id="22809">2.5</td>
    	    
    	    <td data-id="22842">1</td>
    	    
    	    <td data-id="22795">2</td>
    	    
    	    <td data-id="22807">2</td>
    	    
    	    <td data-id="22826">2.5</td>
    	    
    	    <td data-id="22779">4</td>
    	    
    	    <td data-id="22894">3</td>
    	    
    	    <td data-id="27332">3</td>
    	    
    	    <td data-id="22827">4</td>
    	    
    	  </tr>
          <tr><th>Video Solution:</th>
            
	      <td data-id="22798">
		  
		    </td>
	            
	      <td data-id="22805">
		  
		    </td>
	            
	      <td data-id="27330">
		  
		  <i class="icon-film" aria-hidden="true"> </i>
		  
		    </td>
	            
	      <td data-id="22813" class="current">
		  
		    </td>
	            
	      <td data-id="22824">
		  
		  <i class="icon-film" aria-hidden="true"> </i>
		  
		    </td>
	            
	      <td data-id="22836">
		  
		  <i class="icon-film" aria-hidden="true"> </i>
		  
		    </td>
	            
	      <td data-id="22809">
		  
		    </td>
	            
	      <td data-id="22842">
		  
		    </td>
	            
	      <td data-id="22795">
		  
		    </td>
	            
	      <td data-id="22807">
		  
		    </td>
	            
	      <td data-id="22826">
		  
		    </td>
	            
	      <td data-id="22779">
		  
		    </td>
	            
	      <td data-id="22894">
		  
		    </td>
	            
	      <td data-id="27332">
		  
		  <i class="icon-film" aria-hidden="true"> </i>
		  
		    </td>
	            
	      <td data-id="22827">
		  
		  <i class="icon-film" aria-hidden="true"> </i>
		  
		    </td>
	            
	 </tr>
          <!--<tr>
    	    <th>Time (min):</th>
    	    
    	    <td data-id='22798'  >4</td>
    	    
    	    <td data-id='22805'  >3</td>
    	    
    	    <td data-id='27330'  >4</td>
    	    
    	    <td data-id='22813'  class='current' >7</td>
    	    
    	    <td data-id='22824'  >8</td>
    	    
    	    <td data-id='22836'  >24</td>
    	    
    	    <td data-id='22809'  >16</td>
    	    
    	    <td data-id='22842'  >5</td>
    	    
    	    <td data-id='22795'  >4</td>
    	    
    	    <td data-id='22807'  >8</td>
    	    
    	    <td data-id='22826'  >12</td>
    	    
    	    <td data-id='22779'  >25</td>
    	    
    	    <td data-id='22894'  >12</td>
    	    
    	    <td data-id='27332'  >8</td>
    	    
    	    <td data-id='22827'  >12</td>
    	    
    	  </tr>
    	  -->
    	</tbody>
    	<!--<tfoot></tfoot>-->
          </table>
*/