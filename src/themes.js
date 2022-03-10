import {css} from 'lit';


/* Body
    background: #f5faff;
    border: #cedff2 1px solid;
*/
/* Title
    background: #cedff2;
    border: #a3b0bf 1px solid;
    padding-left: 1em;
*/

/* Body
    background: #eeeeee;
    border: #cccccc 1px solid;
*/
/* Title
    background: #cccccc;
    border: #a3b0bf 1px solid;
    padding-left: 1em;
*/

/* Nav
    background: #f5fffa;
*/
/* Share
    background: #f9fbba;
*/
/* Links
    color: #0000ee;
*/

export const colourScemes = {
    main : {
        background : css`#f5faff`,
        highlight : css`#cedff2`,
        highlight_alt : css`#a3b0bf`
    },
    alt : {
        background : css`#eeeeee`,
        highlight : css`#cccccc`,
        highlight_alt : css`#a3b0bf`
    }
};
export const mainThemes = css`
    * {
        box-sizing: border-box;
    }
    a {
        color: #0000ee;
    }
    .visuallyhidden {
        border: 0;
        clip: rect(0 0 0 0);
        height: auto; /* new - was 1px */
        margin: 0; /* new - was -1px */
        overflow: hidden;
        padding: 0;
        position: absolute;
        width: 1px;
        white-space: nowrap; /* 1 */
    }
    input-preview{
        display: inline-block;
    }
    .can_hide{
        position: absolute;
        margin: 0em 0em 1em 0em;
        border: 1px solid var(--border-colour);
        overflow: visible;
        z-index: 3;
    }
`;

export const icons = css`
    
    i.home::before{
        content : url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' style='width:1em;height:1em' viewBox='0 0 24 24'%3E%3Cpath fill='currentColor' d='M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z' /%3E%3C/svg%3E");
        display:block;
    }
    {
        i.move::before{
        /*content : url('data:image/svg+xml; utf8,<svg xmlns="http://www.w3.org/2000/svg" height="1em" width="1em" viewBox="0 0 96 96" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none;"><path d="M73,48.4l-10.4-9.6v4.8H52.4V33.4h4.8L47.6,23l-8.9,10.4h4.8v10.2H33.4v-4.8L23,48.4l10.4,8.9v-4.8h10.2v10.2h-4.8L47.6,73   l9.6-10.4h-4.8V52.4h10.2v4.8L73,48.4z"/></svg>');*/
        content : url('data:image/svg+xml; utf8,<svg xmlns="http://www.w3.org/2000/svg" height="1em" width="1em" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none;"><path d="M20 9H4v2h16V9zM4 15h16v-2H4v2z"></path></svg>');
        display:block;                
    }
    i.add::before{
        content : url('data:image/svg+xml; utf8,<svg xmlns="http://www.w3.org/2000/svg" height="1em" width="1em" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none;"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>');
        display:block;
    }
    i.delete::before{
        content : url('data:image/svg+xml; utf8,<svg xmlns="http://www.w3.org/2000/svg" height="1em" width="1em" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none;"><g><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"></path></g></svg>');
        display:block;
    }
    i.addFolder::before{
        content : url('data:image/svg+xml; utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none;"><g><path d="M20 6h-8l-2-2H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-1 8h-3v3h-2v-3h-3v-2h3V9h2v3h3v2z"></path></g></svg>');
        display: block;
    }

    i.left::before{
        content : url('data:image/svg+xml; utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none;"><g><path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"></path></g></svg>');
        display:block;
    }
    i.right::before{
        content : url('data:image/svg+xml; utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none;"><g><path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"></path></g></svg>');
        display:block;
    }
    i.top::before{
        content : url('data:image/svg+xml; utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none;"><g><path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"></path></g></svg>');
        display: block;
    }
    i.bottom::before{
        content : url('data:image/svg+xml; utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none;"><g><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path></g></svg>');
        display: block;
    }

    i.toggle::before{
        content : url('data:image/svg+xml; utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none;"><g><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path></g></svg>');
        display: block;
    }
    [aria-expanded="true"] > i.toggle::before{
        content : url('data:image/svg+xml; utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none;"><g><path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"></path></g></svg>');
    }`;
