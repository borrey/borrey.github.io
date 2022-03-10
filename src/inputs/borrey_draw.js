import {LitElement, html, css} from 'lit';

import {BorreyInput} from './borrey_input';
import {mainThemes, colourScemes} from '../themes';
import {inputCommon} from './input-themes';

class BaseTool{
    constructor(){}
    static createTmpCanvas(original){
        const tmpCanvas = document.createElement('canvas');
        tmpCanvas.width = original.width;
        tmpCanvas.height = original.height;
        return tmpCanvas;
    }
    static draw( context, startCoordinates, updateCoordinates, endCoordinates ){
        const tmpCanvas = this.createTmpCanvas(context.canvas);
        const tmpContext = tmpCanvas.getContext('2d');
        this.start( tmpContext, startCoordinates);
        updateCoordinates.forEach( coordinates=>{ this.update(tmpContext, coordinates)});
        this.finish( tmpContext, endCoordinates );
        return tmpCanvas;
    }
    static start( context, coordinates ){
        context.beginPath();
        context.moveTo( coordinates.x, coordinates.y );
    }
    static update( context, coordinates){}
    static finish( context, coordinates ){
        this.update(context, coordinates);
        context.closePath();
    }
    static get title(){ return ''; }
}
class PenTool extends BaseTool{
    constructor(){ super(); }
    static update( context, coordinates){
        context.lineTo( coordinates.x, coordinates.y );
        context.stroke();
    }
    static get title(){ return 'pen'; }
}
class LineTool extends PenTool{
    constructor(){ super(); }
    static draw( context, startCoordinates, updateCoordinates, endCoordinates ){
        const tmpCanvas = this.createTmpCanvas(context.canvas);
        const tmpContext = tmpCanvas.getContext('2d');
        this.start( tmpContext, startCoordinates);
        this.finish( tmpContext, endCoordinates );
        return tmpCanvas;
    }
    static get title(){ return 'line'; }
}
class CircleTool extends BaseTool{
    constructor(){ super(); }
    static get startAngle(){ return 0; }
    static get endAngle(){ return 2*Math.PI; }
    static get counterClockwise(){ return false; } 
    static draw( context, startCoordinates, updateCoordinates, endCoordinates ){
        const tmpCanvas = this.createTmpCanvas(context.canvas);
        const tmpContext = tmpCanvas.getContext('2d');

        const a = Math.abs(startCoordinates.x - endCoordinates.x);
        const startX = Math.min(startCoordinates.x, endCoordinates.x) + a/2;
        const b = Math.abs(startCoordinates.y - endCoordinates.y);
        const startY = Math.min(startCoordinates.y, endCoordinates.y) + b/2;

        const radius = Math.round(Math.sqrt( a*a+b*b)/2);
        tmpContext.beginPath();
        tmpContext.arc( startX, startY, radius, this.startAngle, this.endAngle, this.counterClockwise );
        tmpContext.stroke();
        tmpContext.closePath();
        return tmpCanvas;
    }
    static get title(){ return 'circle'; }
}
class RectangleTool extends BaseTool{
    constructor(){ super(); }
    static draw( context, startCoordinates, updateCoordinates, endCoordinates ){
        const tmpCanvas = this.createTmpCanvas(context.canvas);
        const tmpContext = tmpCanvas.getContext('2d');
        if(startCoordinates.x !== endCoordinates.x && startCoordinates.y !== endCoordinates.y){
            tmpContext.strokeRect(
                Math.min( startCoordinates.x, endCoordinates.x ),
                Math.min( startCoordinates.y, endCoordinates.y ),
                Math.abs( startCoordinates.x - endCoordinates.x ),
                Math.abs( startCoordinates.y - endCoordinates.y )
            );
        }
        return tmpCanvas;
    }
    static get title(){ return 'rectangle'; }
}

const tools = [
    PenTool,
    LineTool,
    CircleTool,
    RectangleTool
];
const toolsMap = tools.reduce((_toolsMap, tool) => {
    _toolsMap[tool.title] = tool
    return _toolsMap
  }, {});


export class InputDraw extends BorreyInput {
    constructor(){
        super();
        this.instruction = 'Draw your Answer';
        this.currentActionType = tools[0].title;
        this.currentAction = null;
        this.actionStack = [];
        this.redoStack = [];
        this.width = '300px';
        this.height = '200px';
    }
    static styles = [ mainThemes, inputCommon, css`
        canvas[name=current_layer]{
            border: 1px solid;
            cursor: crosshair;
        }
    `];
    static get is(){ return 'borrey-draw'; }
    static get title(){ return 'Draw'; }
    static get properties() {
        return {
            actionStack : { type : Array },
            width : {type : String},
            height : {type : String}
        }
    }
    undo(event){
        event.preventDefault();
        event.stopPropagation();
        if( this.actionStack.length ){
            this.redoStack = [...this.redoStack, this.actionStack.pop() ];
            this.actionStack = [...this.actionStack ];
            this.clear();
            this.runActionStack();
        }
    }
    redo(event){
        event.preventDefault();
        event.stopPropagation();
        if( this.redoStack.length ){
            this.actionStack = [...this.actionStack, this.redoStack.pop() ];
            this.redoStack = [...this.redoStack ];
            this.clear();
            this.runActionStack();
        }
    }
    clear(){
        const canvas = this.shadowRoot.querySelector('canvas');
        const context = canvas.getContext('2d');
	    context.clearRect(0, 0, canvas.width, canvas.height);        
    }
    _clear( e ){

    }
    runActionStack(){
        this.drawGrid();//TODO
        this.actionStack.forEach( action=>{
            this.runAction(action);
        });
    }
    runAction( action ){
        const canvas = this.shadowRoot.querySelector('canvas[name=attempt]');
        const context = canvas.getContext('2d');
        const actionTool = toolsMap[action.type];
        const tmpCanvas = actionTool.draw( context, action.start, action.update, action.end);
        context.drawImage(tmpCanvas, 0, 0);
    }
    _getInput(){
        return html`
            <section style='position:relative;'>
                <canvas width='${this.width}' height='${this.height}' name='attempt' @touchstart='${this._start }' @touchmove='${this._update}' @touchend='${this._finish}' @mousedown='${this._start }' @mousemove='${this._update}' @mouseup='${this._finish}'></canvas>
                <!--<canvas width='${this.width}' height='${this.height}' style='position:absolute; left:0; top:0' name='current_layer' @mousedown='${this._start }' @mousemove='${this._update}' @mouseup='${this._finish}'></canvas>-->
            </section>    
            <section>
                <button @click='${this.undo}' ?disabled=${this.actionStack.length<=0}>undo</button>
                <button @click='${this.redo}' ?disabled=${this.redoStack.length<=0}>redo</button>
                <!--<button @click='${(e)=>{ e.preventDefault(); e.stopPropagation(); this.clear(); }}' ?disabled=${this.actionStack.length<=0}>Clear</button>-->
                <select @change='${this._changeTool}' name='tool'>${ tools.map(tool=>html`<option value='${tool.title}' >${tool.title}</option>`) }</select>
                <input type='submit' @click='${this._submit}' value='${this.actionLabel}'/>
            </section>
        `;
    }
    getEventCoordinates = function( event, canvas ){

        let clientX = event.offsetX || event.layerX;// || event.touches[0].offsetX || event.touches[0].layerX;
        let clientY = event.offsetY || event.layerY;// event.touches[0].offsetY || event.touches[0].layerY;
        if(!clientX && !clientY && event.touches && event.touches[0] && event.touches[0].clientX && event.touches[0].clientY){
            const { left, top } = event.target.getBoundingClientRect();
            clientX = event.touches[0].clientX - left;
            clientY = event.touches[0].clientY - top;
            event.preventDefault();
        }
        
        return {
            x : event.layerX || clientX,
            y : event.layerY || clientY
        };
    }
    _start(event){
        
        this.currentAction = { 
            type : this.currentActionType, 
            start : this.getEventCoordinates(event, this.shadowRoot.querySelector('canvas[name=attempt]')), 
            update :[], 
            end: null 
        };
    }
    _update(event){
        if( this.currentAction && this.currentAction.update ){
            this.currentAction.update.push( this.getEventCoordinates(event, this.shadowRoot.querySelector('canvas[name=attempt]')));    
        }
    }
    _finish(event){
        this.currentAction.end = this.getEventCoordinates(event, this.shadowRoot.querySelector('canvas[name=attempt]'));
        this.actionStack = [ ...this.actionStack, this.currentAction ];
        this.runAction(this.currentAction);
        this.currentAction=null;
    }
    _changeTool(event){
        this.currentActionType = event.target.value || tool[0].title;
    }
    _getMenu(){
        return html``;
    }
    _submit(event){
        event.preventDefault();
        event.stopPropagation();
        const value = this.shadowRoot.querySelector('canvas[name=attempt]').toDataURL('image/jpg');
        this.pushAttempt(value);
    }
    pushAttempt( attempt ){
        this.history = [...this.history, { display : `<img src='${attempt}'/>`, time : Date.now() }];
    }
    firstUpdated(changedProperties){
        this.drawGrid();//TODO option
    }
    drawGrid() {
        /*var canvas = document.getElementById(id);
        var ctx = canvas.getContext('2d');
        ctx.canvas.width  = w;
        ctx.canvas.height = h;*/
        const canvas = this.shadowRoot.querySelector('canvas[name=attempt]');
        const context = canvas.getContext('2d');

        var data = '<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"> \
            <defs> \
                <pattern id="smallGrid" width="8" height="8" patternUnits="userSpaceOnUse"> \
                    <path d="M 8 0 L 0 0 0 8" fill="none" stroke="gray" stroke-width="0.5" /> \
                </pattern> \
                <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse"> \
                    <rect width="80" height="80" fill="url(#smallGrid)" /> \
                    <path d="M 80 0 L 0 0 0 80" fill="none" stroke="gray" stroke-width="1" /> \
                </pattern> \
            </defs> \
            <rect width="100%" height="100%" fill="url(#smallGrid)" /> \
        </svg>';
    
        var DOMURL = window.URL || window.webkitURL || window;
        
        var img = new Image();
        var svg = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
        var url = DOMURL.createObjectURL(svg);
        
        img.onload = function () {
          context.drawImage(img, 0, 0);
          DOMURL.revokeObjectURL(url);
        }
        img.src = url;
    }
}

customElements.define( InputDraw.is, InputDraw );

/*class InputDrawEdit extends InputEdit {
    static get is(){
        return [InputDraw.is,'edit'].join('-');
    }
}
customElements.define(InputDrawEdit.is, InputDrawEdit);*/