import {css} from 'lit';


export const inputCommon = css`
    :host{
        display : block;
        border: 1px solid var(--border-colour);
        margin: 1em;
    }
    div.attempt{
        border: 1px solid var(--border-colour);
    }
    input-preview{
        padding : 1em;
    }
`;