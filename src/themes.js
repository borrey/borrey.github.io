import {LitElement, html, css} from 'lit';


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
    a {
        color: #0000ee;
    }
`;
