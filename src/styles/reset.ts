import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  @font-face {
      font-family: 'Pretendard-Regular';
      src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
      font-weight: 400;
      font-style: normal;
  }

  html {
    font-size: 16px;
    font-family: 'Pretendard', sans-serif;
  }
  body {
    padding: 0 5rem;
    box-sizing: border-box;
  }
`