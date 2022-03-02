import Spreadsheet from "x-data-spreadsheet";//https://bossanova.uk/jspreadsheet/v4/examples/spreadsheet-webcomponent
import * as XLSX from 'xlsx';
import {html, css } from 'lit-element';
import {InputLong} from './borrey_long';

export class InputExcel extends InputLong {
    constructor(){
        super();
        this.instruction = 'Fill out the sheet';
    }
    static styles = [...InputLong.styles,
    ...[css`
    body {
        margin: 0;
      }
      .x-spreadsheet {
        font-size: 13px;
        line-height: normal;
        user-select: none;
        -moz-user-select: none;
        font-family: 'Lato', 'Source Sans Pro', Roboto, Helvetica, Arial, sans-serif;
        box-sizing: content-box;
        background: #fff;
        -webkit-font-smoothing: antialiased;
      }
      .x-spreadsheet textarea {
        font: 400 13px Arial, 'Lato', 'Source Sans Pro', Roboto, Helvetica, sans-serif;
      }
      .x-spreadsheet-sheet {
        position: relative;
        overflow: hidden;
      }
      .x-spreadsheet-table {
        vertical-align: bottom;
      }
      .x-spreadsheet-tooltip {
        font-family: inherit;
        position: absolute;
        padding: 5px 10px;
        color: #fff;
        border-radius: 1px;
        background: #000000;
        font-size: 12px;
        z-index: 201;
      }
      .x-spreadsheet-tooltip:before {
        pointer-events: none;
        position: absolute;
        left: calc(50% - 4px);
        top: -4px;
        content: "";
        width: 8px;
        height: 8px;
        background: inherit;
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
        z-index: 1;
        box-shadow: 1px 1px 3px -1px rgba(0, 0, 0, 0.3);
      }
      .x-spreadsheet-color-palette {
        padding: 5px;
      }
      .x-spreadsheet-color-palette table {
        margin: 0;
        padding: 0;
        border-collapse: separate;
        border-spacing: 2;
        background: #fff;
      }
      .x-spreadsheet-color-palette table td {
        margin: 0;
        cursor: pointer;
        border: 1px solid transparent;
      }
      .x-spreadsheet-color-palette table td:hover {
        border-color: #ddd;
      }
      .x-spreadsheet-color-palette table td .x-spreadsheet-color-palette-cell {
        width: 16px;
        height: 16px;
      }
      .x-spreadsheet-border-palette {
        padding: 6px;
      }
      .x-spreadsheet-border-palette table {
        margin: 0;
        padding: 0;
        border-collapse: separate;
        border-spacing: 0;
        background: #fff;
        table-layout: fixed;
      }
      .x-spreadsheet-border-palette table td {
        margin: 0;
      }
      .x-spreadsheet-border-palette .x-spreadsheet-border-palette-left {
        border-right: 1px solid #eee;
        padding-right: 6px;
      }
      .x-spreadsheet-border-palette .x-spreadsheet-border-palette-left .x-spreadsheet-border-palette-cell {
        width: 30px;
        height: 30px;
        cursor: pointer;
        text-align: center;
      }
      .x-spreadsheet-border-palette .x-spreadsheet-border-palette-left .x-spreadsheet-border-palette-cell .x-spreadsheet-icon-img {
        opacity: 0.8;
      }
      .x-spreadsheet-border-palette .x-spreadsheet-border-palette-left .x-spreadsheet-border-palette-cell:hover {
        background-color: #eee;
      }
      .x-spreadsheet-border-palette .x-spreadsheet-border-palette-right {
        padding-left: 6px;
      }
      .x-spreadsheet-border-palette .x-spreadsheet-border-palette-right .x-spreadsheet-toolbar-btn {
        margin-top: 0;
        margin-bottom: 3px;
      }
      .x-spreadsheet-border-palette .x-spreadsheet-border-palette-right .x-spreadsheet-line-type {
        position: relative;
        left: 0;
        top: -3px;
      }
      .x-spreadsheet-dropdown {
        position: relative;
      }
      .x-spreadsheet-dropdown .x-spreadsheet-dropdown-content {
        position: absolute;
        z-index: 200;
        background: #fff;
        box-shadow: 1px 2px 5px 2px rgba(51, 51, 51, 0.15);
      }
      .x-spreadsheet-dropdown.bottom-left .x-spreadsheet-dropdown-content {
        top: calc(100% + 5px);
        left: 0;
      }
      .x-spreadsheet-dropdown.bottom-right .x-spreadsheet-dropdown-content {
        top: calc(100% + 5px);
        right: 0;
      }
      .x-spreadsheet-dropdown .x-spreadsheet-dropdown-title {
        padding: 0 5px;
        display: inline-block;
      }
      .x-spreadsheet-dropdown .x-spreadsheet-dropdown-header .x-spreadsheet-icon.arrow-left {
        margin-left: 4px;
      }
      .x-spreadsheet-dropdown .x-spreadsheet-dropdown-header .x-spreadsheet-icon.arrow-right {
        width: 10px;
        margin-right: 4px;
      }
      .x-spreadsheet-dropdown .x-spreadsheet-dropdown-header .x-spreadsheet-icon.arrow-right .arrow-down {
        left: -130px;
      }
      /* resizer **/
      .x-spreadsheet-resizer {
        position: absolute;
        z-index: 11;
      }
      .x-spreadsheet-resizer .x-spreadsheet-resizer-hover {
        background-color: rgba(75, 137, 255, 0.25);
      }
      .x-spreadsheet-resizer .x-spreadsheet-resizer-line {
        position: absolute;
      }
      .x-spreadsheet-resizer.horizontal {
        cursor: row-resize;
      }
      .x-spreadsheet-resizer.horizontal .x-spreadsheet-resizer-line {
        border-bottom: 2px dashed #4b89ff;
        left: 0;
        bottom: 0;
      }
      .x-spreadsheet-resizer.vertical {
        cursor: col-resize;
      }
      .x-spreadsheet-resizer.vertical .x-spreadsheet-resizer-line {
        border-right: 2px dashed #4b89ff;
        top: 0;
        right: 0;
      }
      /* scrollbar */
      .x-spreadsheet-scrollbar {
        position: absolute;
        bottom: 0;
        right: 0;
        background-color: #f4f5f8;
        opacity: 0.9;
        z-index: 12;
      }
      .x-spreadsheet-scrollbar.horizontal {
        right: 15px;
        overflow-x: scroll;
        overflow-y: hidden;
      }
      .x-spreadsheet-scrollbar.horizontal > div {
        height: 1px;
        background: #ddd;
      }
      .x-spreadsheet-scrollbar.vertical {
        bottom: 15px;
        overflow-x: hidden;
        overflow-y: scroll;
      }
      .x-spreadsheet-scrollbar.vertical > div {
        width: 1px;
        background: #ddd;
      }
      /* @{css-prefix}-overlayer */
      .x-spreadsheet-overlayer {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 10;
      }
      .x-spreadsheet-overlayer .x-spreadsheet-overlayer-content {
        position: absolute;
        overflow: hidden;
        pointer-events: none;
        width: 100%;
        height: 100%;
      }
      .x-spreadsheet-editor,
      .x-spreadsheet-selector {
        position: absolute;
        overflow: hidden;
        pointer-events: none;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      /* @{css-prefix}-selector */
      .x-spreadsheet-selector .x-spreadsheet-selector-area {
        position: absolute;
        border: 2px solid #4b89ff;
        background: rgba(75, 137, 255, 0.1);
      }
      .x-spreadsheet-selector .x-spreadsheet-selector-clipboard,
      .x-spreadsheet-selector .x-spreadsheet-selector-autofill {
        position: absolute;
        background: transparent;
        z-index: 100;
      }
      .x-spreadsheet-selector .x-spreadsheet-selector-clipboard {
        border: 2px dashed #4b89ff;
      }
      .x-spreadsheet-selector .x-spreadsheet-selector-autofill {
        border: 1px dashed rgba(0, 0, 0, 0.45);
      }
      .x-spreadsheet-selector .x-spreadsheet-selector-corner {
        pointer-events: auto;
        position: absolute;
        cursor: crosshair;
        font-size: 0;
        height: 5px;
        width: 5px;
        right: -5px;
        bottom: -5px;
        border: 2px solid #ffffff;
        background: #4b89ff;
      }
      .x-spreadsheet-editor {
        z-index: 20;
      }
      .x-spreadsheet-editor .x-spreadsheet-editor-area {
        position: absolute;
        text-align: left;
        border: 2px solid #4b89ff;
        line-height: 0;
        z-index: 100;
        pointer-events: auto;
      }
      .x-spreadsheet-editor .x-spreadsheet-editor-area textarea {
        box-sizing: content-box;
        border: none;
        padding: 0 3px;
        outline-width: 0;
        resize: none;
        text-align: start;
        overflow-y: hidden;
        font: 400 13px Arial, 'Lato', 'Source Sans Pro', Roboto, Helvetica, sans-serif;
        color: inherit;
        white-space: normal;
        word-wrap: break-word;
        line-height: 22px;
        margin: 0;
      }
      .x-spreadsheet-editor .x-spreadsheet-editor-area .textline {
        overflow: hidden;
        visibility: hidden;
        position: fixed;
        top: 0;
        left: 0;
      }
      .x-spreadsheet-item {
        user-select: none;
        background: 0;
        border: 1px solid transparent;
        outline: none;
        height: 26px;
        color: rgba(0, 0, 0, 0.9);
        line-height: 26px;
        list-style: none;
        padding: 2px 10px;
        cursor: default;
        text-align: left;
      }
      .x-spreadsheet-item.disabled {
        pointer-events: none;
        opacity: 0.5;
      }
      .x-spreadsheet-item:hover,
      .x-spreadsheet-item.active {
        background: rgba(0, 0, 0, 0.05);
      }
      .x-spreadsheet-item.divider {
        height: 0;
        padding: 0;
        margin: 5px 0;
        border: none;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      }
      .x-spreadsheet-item .label {
        float: right;
        opacity: 0.65;
        font-size: 1em;
      }
      .x-spreadsheet-item.state,
      .x-spreadsheet-header.state {
        padding-left: 35px!important;
        position: relative;
      }
      .x-spreadsheet-item.state:before,
      .x-spreadsheet-header.state:before {
        content: '';
        position: absolute;
        width: 10px;
        height: 10px;
        left: 12px;
        top: calc(50% - 5px);
        background: rgba(0, 0, 0, 0.08);
        border-radius: 2px;
      }
      .x-spreadsheet-item.state.checked:before,
      .x-spreadsheet-header.state.checked:before {
        background: #4b89ff;
      }
      .x-spreadsheet-checkbox {
        position: relative;
        display: inline-block;
        backface-visibility: hidden;
        outline: 0;
        vertical-align: baseline;
        font-style: normal;
        font-size: 1rem;
        line-height: 1em;
      }
      .x-spreadsheet-checkbox > input {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0!important;
        outline: 0;
        z-index: -1;
      }
      .x-spreadsheet-suggest,
      .x-spreadsheet-contextmenu,
      .x-spreadsheet-sort-filter {
        position: absolute;
        box-shadow: 1px 2px 5px 2px rgba(51, 51, 51, 0.15);
        background: #fff;
        z-index: 100;
        width: 260px;
        pointer-events: auto;
        overflow: auto;
      }
      .x-spreadsheet-suggest {
        width: 200px;
      }
      .x-spreadsheet-filter {
        border: 1px solid #e9e9e9;
        font-size: 12px;
        margin: 10px;
      }
      .x-spreadsheet-filter .x-spreadsheet-header {
        padding: 0.5em 0.75em;
        background: #f8f8f9;
        border-bottom: 1px solid #e9e9e9;
        border-left: 1px solid transparent;
      }
      .x-spreadsheet-filter .x-spreadsheet-body {
        height: 200px;
        overflow-y: auto;
      }
      .x-spreadsheet-filter .x-spreadsheet-body .x-spreadsheet-item {
        height: 20px;
        line-height: 20px;
      }
      .x-spreadsheet-sort-filter .x-spreadsheet-buttons {
        margin: 10px;
      }
      .x-spreadsheet-toolbar,
      .x-spreadsheet-bottombar {
        height: 40px;
        padding: 0 30px;
        text-align: left;
        background: #f5f6f7;
        display: flex;
      }
      .x-spreadsheet-bottombar {
        border-top: 1px solid #e0e2e4;
      }
      .x-spreadsheet-toolbar {
        border-bottom: 1px solid #e0e2e4;
      }
      .x-spreadsheet-toolbar .x-spreadsheet-toolbar-btns {
        display: inline-flex;
      }
      .x-spreadsheet-toolbar .x-spreadsheet-toolbar-more {
        padding: 0 6px 6px;
        text-align: left;
      }
      .x-spreadsheet-toolbar .x-spreadsheet-toolbar-more .x-spreadsheet-toolbar-divider {
        margin-top: 0;
      }
      .x-spreadsheet-toolbar .x-spreadsheet-toolbar-btn {
        flex: 0 0 auto;
        display: inline-block;
        border: 1px solid transparent;
        height: 26px;
        line-height: 26px;
        min-width: 26px;
        margin: 6px 1px 0;
        padding: 0;
        text-align: center;
        border-radius: 2px;
      }
      .x-spreadsheet-toolbar .x-spreadsheet-toolbar-btn.disabled {
        pointer-events: none;
        opacity: 0.5;
      }
      `]
    ];
    _getInput(){
        return html`<div style='overflow:auto;' id='x-spreadsheet'></div><input type='submit' @click='${this._submit}' value='${this.actionLabel}'/>`;
    }
    static get title(){
        return 'Spreadsheet';
    }
    static get is(){
        return 'input-spreadsheet';
    }
    firstUpdated(changedProperties){
        this.spreadsheet = new Spreadsheet(this.shadowRoot.querySelector('#x-spreadsheet'),{
            mode: 'edit'/*,
            view: {
                height: () => 100,
                width: () => this.shadowRoot.width,
            }*/
        }).loadData({}).change(data => {
            console.log('update data?', data);
          });
        this.spreadsheet.validate();
    }

    _submit(event){
        event.preventDefault();
        event.stopPropagation();
        /*if(this.editor){
            this.editor.save();
        }
        this.pushAttempt( this.querySelector('textarea[name=attempt]').value.replace(new RegExp('\n', 'g'),'<br/>') );
        */
        this.pushAttempt( JSON.stringify(XLSX.utils.sheet_to_json( this.spreadsheet.getData())) );
    }
}
customElements.define(InputExcel.is, InputExcel);
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
}*/