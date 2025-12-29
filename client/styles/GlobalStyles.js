import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: rgba(0, 0, 0, 1);
    padding-bottom: 5%;
  }
  
  body,
  a,
  h2,
  h3,
  p,
  button,
  span,
  input,
  textarea {
    color: ghostwhite;
    font-family: ${props => props.theme.fontFamily};
  }

  a {
    text-decoration: none;
    position: relative;
  }

  &*:focus {
    outline: none;
  }

  .grecaptcha-badge {
    opacity: 0;
    left: 0;
  }
`
