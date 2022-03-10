//https://bossanova.uk/jspreadsheet/v4/examples/spreadsheet-webcomponent
//https://bossanova.uk/jspreadsheet/v4/docs/programmatically-changes
import jspreadsheet from 'jspreadsheet-ce'
import * as XLSX from 'xlsx';
import {html, css } from 'lit';
import {InputLong} from './borrey_long';

export class InputExcel extends InputLong {
    constructor(){
        super();
        this.instruction = 'Fill out the sheet';
    }
    static styles = [
    ...[css`
    .jexcel_container {
        display:block;
        padding-right:2px;
        box-sizing: border-box;
        overscroll-behavior: contain;
        outline: none;
    }
    .jexcel_container.fullscreen {
        position:fixed;
        top:0px;
        left:0px;
        width:100%;
        height:100%;
        z-index:21;
    }
    
    .jexcel_container.fullscreen .jexcel_content {
        overflow:auto;
        width:100%;
        height:100%;
        background-color:#ffffff;
    }
    
    .jexcel_container.with-toolbar .jexcel > thead > tr > td {
        top: 0;
    }
    
    .jexcel_container.fullscreen.with-toolbar {
        height: calc(100% - 46px);
    }
    
    .jexcel_content {
        display:inline-block;
        box-sizing: border-box;
        padding-right:3px;
        padding-bottom:3px;
        position:relative;
        scrollbar-width: thin;
        scrollbar-color: #666 transparent;
    }
    
    .jexcel_content::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }
    
    .jexcel_content::-webkit-scrollbar-track {
        background: #eee;
    }
     
    .jexcel_content::-webkit-scrollbar-thumb {
      background: #666; 
    }
    
    .jexcel {
        border-collapse: separate;
        table-layout: fixed;
        white-space:  nowrap;
        empty-cells: show;
        border: 0px;
        background-color: #fff;
        width: 0;
    
        border-top: 1px solid transparent;
        border-left: 1px solid transparent;
        border-right: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
    }
    
    .jexcel > thead > tr > td
    {
        border-top: 1px solid #ccc;
        border-left: 1px solid #ccc;
        border-right: 1px solid transparent;
        border-bottom: 1px solid transparent;
        background-color: #f3f3f3;
        padding: 2px;
        cursor: pointer;
        box-sizing: border-box;
        overflow: hidden;
        position: -webkit-sticky;
        position: sticky;
        top: 0;
        z-index:2;
    }
    
    .jexcel_container.with-toolbar .jexcel > thead > tr > td
    {
        top:42px;
    }
    
    .jexcel > thead > tr > td.dragging
    {
        background-color:#fff;
        opacity:0.5;
    }
    
    .jexcel > thead > tr > td.selected
    {
        background-color:#dcdcdc;
    }
    .jexcel > thead > tr > td.arrow-up
    {
        background-repeat:no-repeat;
        background-position:center right 5px;
        background-image: url("data:image/svg+xml,%0A%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='none' d='M0 0h24v24H0V0z'/%3E%3Cpath d='M7 14l5-5 5 5H7z' fill='gray'/%3E%3C/svg%3E");
        text-decoration:underline;
    }
    
    .jexcel > thead > tr > td.arrow-down
    {
        background-repeat:no-repeat;
        background-position:center right 5px;
        background-image: url("data:image/svg+xml,%0A%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='none' d='M0 0h24v24H0V0z'/%3E%3Cpath d='M7 10l5 5 5-5H7z' fill='gray'/%3E%3C/svg%3E");
        text-decoration:underline;
    }
    
    .jexcel > tbody > tr > td:first-child
    {
        position:relative;
        background-color:#f3f3f3;
        text-align:center;
    }
    .jexcel > tbody.resizable > tr > td:first-child::before
{
    content:'\\00a0';
    width:100%;
    height:3px;
    position:absolute;
    bottom:0px;
    left:0px;
    cursor:row-resize;
}

.jexcel > tbody.draggable > tr > td:first-child::after
{
    content:'\\00a0';
    width:3px;
    height:100%;
    position:absolute;
    top:0px;
    right:0px;
    cursor:move;
}

.jexcel > tbody > tr.dragging > td
{
    background-color:#eee;
    opacity:0.5;
}

.jexcel > tbody > tr > td
{
    border-top:1px solid #ccc;
    border-left:1px solid #ccc;
    border-right:1px solid transparent;
    border-bottom:1px solid transparent;
    padding:4px;
    white-space: nowrap;
    box-sizing: border-box;
    line-height:1em;
}

.jexcel_overflow > tbody > tr > td {
    overflow: hidden;
}

.jexcel > tbody > tr > td:last-child
{
    overflow: hidden;
}

.jexcel > tbody > tr > td > img
{
    display:inline-block;
    max-width:100px;
}

.jexcel > tbody > tr > td.readonly
{
    color:rgba(0,0,0,0.3)
}
.jexcel > tbody > tr.selected > td:first-child
{
    background-color:#dcdcdc;
}
.jexcel > tbody > tr > td > select,
.jexcel > tbody > tr > td > input,
.jexcel > tbody > tr > td > textarea
{
    border:0px;
    border-radius:0px;
    outline:0px;
    width:100%;
    margin:0px;
    padding:0px;
    padding-right:2px;
    background-color:transparent;
    box-sizing: border-box;
}

.jexcel > tbody > tr > td > textarea
{
    resize: none;
    padding-top:6px !important;
}

.jexcel > tbody > tr > td > input[type=checkbox]
{
    width:12px;
    margin-top:2px;
}
.jexcel > tbody > tr > td > input[type=radio]
{
    width:12px;
    margin-top:2px;
}

.jexcel > tbody > tr > td > select
{
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-repeat: no-repeat;
    background-position-x: 100%;
    background-position-y: 40%;
    background-image: url(data:image/svg+xml;base64,PHN2ZyBmaWxsPSdibGFjaycgaGVpZ2h0PScyNCcgdmlld0JveD0nMCAwIDI0IDI0JyB3aWR0aD0nMjQnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHBhdGggZD0nTTcgMTBsNSA1IDUtNXonLz48cGF0aCBkPSdNMCAwaDI0djI0SDB6JyBmaWxsPSdub25lJy8+PC9zdmc+);
}

.jexcel > tbody > tr > td.jexcel_dropdown
{
    background-repeat: no-repeat;
    background-position:top 50% right 5px;
    background-image: url("data:image/svg+xml,%0A%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='none' d='M0 0h24v24H0V0z'/%3E%3Cpath d='M7 10l5 5 5-5H7z' fill='lightgray'/%3E%3C/svg%3E");
    text-overflow: ellipsis;
    overflow-x:hidden;
}
    
.jexcel > tbody > tr > td > .color
{
    width:90%;
    height:10px;
    margin:auto;
}

.jexcel > tbody > tr > td > a {
    text-decoration: underline;
}

.jexcel > tbody > tr > td.highlight > a {
    color: blue;
    cursor: pointer;
}

.jexcel > tfoot > tr > td
{
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
    border-right: 1px solid transparent;
    border-bottom: 1px solid transparent;
    background-color: #f3f3f3;
    padding: 2px;
    cursor: pointer;
    box-sizing: border-box;
    overflow: hidden;
}

.jexcel .highlight {
    background-color:rgba(0,0,0,0.05);
}

.jexcel .highlight-top {
    border-top:1px solid #000; /* var(--jexcel-border-color);*/
    box-shadow: 0px -1px #ccc;
}

.jexcel .highlight-left {
    border-left:1px solid #000; /* var(--jexcel-border-color);*/
    box-shadow: -1px 0px #ccc;
}

.jexcel .highlight-right {
    border-right:1px solid #000; /* var(--jexcel-border-color);*/
}

.jexcel .highlight-bottom {
    border-bottom:1px solid #000; /* var(--jexcel-border-color);*/
}

.jexcel .highlight-top.highlight-left {
    box-shadow: -1px -1px #ccc;
    -webkit-box-shadow: -1px -1px #ccc;
    -moz-box-shadow: -1px -1px #ccc;
}

.jexcel .highlight-selected
{
    background-color:rgba(0,0,0,0.0);
}
.jexcel .selection
{
    background-color:rgba(0,0,0,0.05);
}
.jexcel .selection-left
{
    border-left:1px dotted #000;
}
.jexcel .selection-right
{
    border-right:1px dotted #000;
}
.jexcel .selection-top
{
    border-top:1px dotted #000;
}
.jexcel .selection-bottom
{
    border-bottom:1px dotted #000;
}
.jexcel_corner
{
    position:absolute;
    background-color: rgb(0, 0, 0);
    height: 1px;
    width: 1px;
    border: 1px solid rgb(255, 255, 255);
    top:-2000px;
    left:-2000px;
    cursor:crosshair;
    box-sizing: initial;
    z-index:20;
    padding: 2px;
}

.jexcel .editor
{
    outline:0px solid transparent;
    overflow:visible;
    white-space: nowrap;
    text-align:left;
    padding:0px;
    box-sizing: border-box;
    overflow:visible !important;
}

.jexcel .editor > input
{
    padding-left:4px;
}

.jexcel .editor .jupload
{
    position:fixed;
    top:100%;
    z-index:40;
    user-select:none;
    -webkit-font-smoothing: antialiased;
    font-size: .875rem;
    letter-spacing: .2px;
    -webkit-border-radius: 4px;
    border-radius: 4px;
    -webkit-box-shadow: 0 8px 10px 1px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12), 0 5px 5px -3px rgba(0,0,0,0.2);
    box-shadow: 0 8px 10px 1px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12), 0 5px 5px -3px rgba(0,0,0,0.2);
    padding:10px;
    background-color:#fff;
    width:300px;
    min-height:225px;
    margin-top:2px;
}

.jexcel .editor .jupload img
{
    width:100%;
    height:auto;
}

.jexcel .editor .jexcel_richtext
{
    position:fixed;
    top:100%;
    z-index:40;
    user-select:none;
    -webkit-font-smoothing: antialiased;
    font-size: .875rem;
    letter-spacing: .2px;
    -webkit-box-shadow: 0 8px 10px 1px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12), 0 5px 5px -3px rgba(0,0,0,0.2);
    box-shadow: 0 8px 10px 1px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12), 0 5px 5px -3px rgba(0,0,0,0.2);
    padding:10px;
    background-color:#fff;
    min-width:280px;
    max-width:310px;
    margin-top:2px;
    text-align:left;
}

.jexcel .editor .jclose:after
{
    position:absolute;
    top:0;
    right:0;
    margin:10px;
    content:'close';
    font-family:'Material icons';
    font-size:24px;
    width:24px;
    height:24px;
    line-height:24px;
    cursor:pointer;
    text-shadow: 0px 0px 5px #fff;
}

.jexcel, .jexcel td, .jexcel_corner
{
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;
}

.jexcel_textarea
{
    position:absolute;
    top:-999px;
    left:-999px;
    width:1px;
    height:1px;
}
.jexcel .dragline
{
    position:absolute;
}
.jexcel .dragline div
{
    position:relative;
    top:-6px;
    height:5px;
    width:22px;
}
.jexcel .dragline div:hover
{
    cursor:move;
}

.jexcel .onDrag
{
    background-color:rgba(0,0,0,0.6);
}

.jexcel .error
{
    border:1px solid red;
}

.jexcel thead td.resizing
{
    border-right-style:dotted !important;
    border-right-color:red !important;
}

.jexcel tbody tr.resizing > td
{
    border-bottom-style:dotted !important;
    border-bottom-color:red !important;
}

.jexcel tbody td.resizing
{
    border-right-style:dotted !important;
    border-right-color:red !important;
}

.jexcel .jdropdown-header
{
    border:0px !important;
    outline:none !important;
    width:100% !important;
    height:100% !important;
    padding:0px !important;
    padding-left:8px !important;
}

.jexcel .jdropdown-container
{
    margin-top:1px;
}

.jexcel .jdropdown-container-header {
    padding: 0px;
    margin: 0px;
    height: inherit;
}

.jexcel .jdropdown-picker
{
    border:0px !important;
    padding:0px !important;
    width:inherit;
    height:inherit;
}

.jexcel .jexcel_comments
{
    background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFuGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDE5LTAxLTMxVDE4OjU1OjA4WiIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxOS0wMS0zMVQxODo1NTowOFoiIHhtcDpNb2RpZnlEYXRlPSIyMDE5LTAxLTMxVDE4OjU1OjA4WiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDphMTlhZDJmOC1kMDI2LTI1NDItODhjOS1iZTRkYjkyMmQ0MmQiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpkOGI5NDUyMS00ZjEwLWQ5NDktYjUwNC0wZmU1N2I3Nzk1MDEiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDplMzdjYmE1ZS1hYTMwLWNkNDUtYTAyNS1lOWYxZjk2MzUzOGUiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDplMzdjYmE1ZS1hYTMwLWNkNDUtYTAyNS1lOWYxZjk2MzUzOGUiIHN0RXZ0OndoZW49IjIwMTktMDEtMzFUMTg6NTU6MDhaIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmExOWFkMmY4LWQwMjYtMjU0Mi04OGM5LWJlNGRiOTIyZDQyZCIgc3RFdnQ6d2hlbj0iMjAxOS0wMS0zMVQxODo1NTowOFoiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4En6MDAAAAX0lEQVQYlX3KOw6AIBBAwS32RpJADXfx0pTET+ERZJ8F8RODFtONsG0QAoh0CSDM82dqodaBdQXnfoLZQM7gPai+wjNNE8R4pTuAYNZSKZASqL7CMy0LxNgJp30fKYUDi3+vIqb/+rUAAAAASUVORK5CYII=');
    background-repeat: no-repeat;
    background-position: top right;
}

.jexcel .sp-replacer
{
    margin: 2px;
    border:0px;
}

.jexcel > thead > tr.jexcel_filter > td > input
{
    border:0px;
    width:100%;
    outline:none;
}

.jexcel_about {
    float: right;
    font-size: 0.7em;
    padding: 2px;
    text-transform: uppercase;
    letter-spacing: 1px;
    display: none;
}
.jexcel_about a {
    color: #ccc;
    text-decoration: none;
}

.jexcel_about img {
    display: none;
}

.jexcel_filter
{
    display:flex;
    justify-content:space-between;
    margin-bottom:4px;
}

.jexcel_filter > div
{
    padding:8px;
    align-items:center;
}

.jexcel_pagination
{
    display:flex;
    justify-content:space-between;
    align-items:center;
}

.jexcel_pagination > div
{
    display:flex;
    padding:10px;
}

.jexcel_pagination > div:last-child
{
    padding-right:10px;
    padding-top:10px;
}

.jexcel_pagination > div > div
{
    text-align:center;
    width:36px;
    height:36px;
    line-height:34px;
    border:1px solid #ccc;
    box-sizing: border-box;
    margin-left:2px;
    cursor:pointer;
}

.jexcel_page
{
    font-size:0.8em;
}

.jexcel_page_selected
{
    font-weight:bold;
    background-color:#f3f3f3;
}

.jexcel_toolbar
{
    display:flex;
    background-color:#f3f3f3;
    border:1px solid #ccc;
    padding:4px;
    margin:0px 2px 4px 1px;
    position:sticky;
    top:0px;
    z-index:21;
}

.jexcel_toolbar:empty
{
    display:none;
}

.jexcel_toolbar i.jexcel_toolbar_item 
{
    width:24px;
    height:24px;
    padding:4px;
    cursor:pointer;
    display:inline-block;
}

.jexcel_toolbar i.jexcel_toolbar_item:hover 
{
    background-color:#ddd;
}

.jexcel_toolbar select.jexcel_toolbar_item 
{
    margin-left:2px;
    margin-right:2px;
    display:inline-block;
    border:0px;
    background-color:transparent;
    padding-right:10px;
}

.jexcel .dragging-left
{
    background-repeat: no-repeat;
    background-position:top 50% left 0px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M14 7l-5 5 5 5V7z'/%3E%3Cpath fill='none' d='M24 0v24H0V0h24z'/%3E%3C/svg%3E");
}

.jexcel .dragging-right
{
    background-repeat: no-repeat;
    background-position:top 50% right 0px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M10 17l5-5-5-5v10z'/%3E%3Cpath fill='none' d='M0 24V0h24v24H0z'/%3E%3C/svg%3E");
}

.jexcel_tabs .jexcel_tab
{
    display:none;
}

.jexcel_tabs .jexcel_tab_link
{
    display:inline-block;
    padding:10px;
    padding-left:20px;
    padding-right:20px;
    margin-right:5px;
    margin-bottom:5px;
    background-color:#f3f3f3;
    cursor:pointer;
}

.jexcel_tabs .jexcel_tab_link.selected
{
    background-color:#ddd;
}

.jexcel_hidden_index > tbody > tr > td:first-child,
.jexcel_hidden_index > thead > tr > td:first-child,
.jexcel_hidden_index > tfoot > tr > td:first-child,
.jexcel_hidden_index > colgroup > col:first-child
{
    display:none;
}



.jexcel .jrating {
    display: inline-flex;
}
.jexcel .jrating > div {
    zoom: 0.55;
}

.jexcel .copying-top {
    border-top:1px dashed #000;
}

.jexcel .copying-left {
    border-left:1px dashed #000;
}

.jexcel .copying-right {
    border-right:1px dashed #000;
}

.jexcel .copying-bottom {
    border-bottom:1px dashed #000;
}

.jexcel .jexcel_column_filter {
    background-repeat: no-repeat;
    background-position: top 50% right 5px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='gray' width='18px' height='18px'%3E%3Cpath d='M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E");
    text-overflow: ellipsis;
    overflow: hidden;
    padding: 0px;
    padding-left: 6px;
    padding-right: 20px;
}

.jexcel thead .jexcel_freezed, .jexcel tfoot .jexcel_freezed {
    left: 0px;
    z-index: 3 !important;
    box-shadow: 2px 0px 2px 0.2px #ccc !important;
    -webkit-box-shadow: 2px 0px 2px 0.2px #ccc !important;
    -moz-box-shadow: 2px 0px 2px 0.2px #ccc !important;
}

.jexcel tbody .jexcel_freezed {
    position: relative;
    background-color: #fff;
    box-shadow: 1px 1px 1px 1px #ccc !important;
    -webkit-box-shadow: 2px 4px 4px 0.1px #ccc !important;
    -moz-box-shadow: 2px 4px 4px 0.1px #ccc !important;
}

.red {
    color: red;
}

  
    `],...InputLong.styles
    ];
    _getInput(){
        return html`<div id='sheet'></div><input type='submit' @click='${this._submit}' value='${this.actionLabel}'/>`;
    }
    static get title(){
        return 'Spreadsheet';
    }
    static get is(){
        return 'input-spreadsheet';
    }
    firstUpdated(changedProperties){
        const sheet_el = this.shadowRoot.getElementById('sheet'); 
        this.sheet = jspreadsheet(sheet_el, {
            root: this.shadowRoot,
            minDimensions: [10,10]
        });
    }

    _submit(event){
        event.preventDefault();
        event.stopPropagation();
        /*if(this.editor){
            this.editor.save();
        }
        this.pushAttempt( this.querySelector('textarea[name=attempt]').value.replace(new RegExp('\n', 'g'),'<br/>') );
        */
        this.pushAttempt( JSON.stringify(this.sheet.getJson()) );
    }
}
customElements.define(InputExcel.is, InputExcel);

const tmp = css`




`;
/*
{
  mode: 'edit', // edit | read
  showToolbar: true,
  showGrid: true,
  showContextmenu: true,
  view: {
    height: () => document.documentElement.clientHeight,
    width: () => document.documentElement.clientWidth,
  },
  row: {
    len: 100,
    height: 25,
  },
  col: {
    len: 26,
    width: 100,
    indexWidth: 60,
    minWidth: 60,
  },
  style: {
    bgcolor: '#ffffff',
    align: 'left',
    valign: 'middle',
    textwrap: false,
    strike: false,
    underline: false,
    color: '#0a0a0a',
    font: {
      name: 'Helvetica',
      size: 10,
      bold: false,
      italic: false,
    },
  },




  @supports (-moz-appearance:none) {
    .jexcel_content { padding-right:10px; } 
}

}*/