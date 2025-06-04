import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 100vh;
    margin: 0;
    padding: 0;
  }
`;

export const colors = {
  primary: "#e0e0e0",
  secondary: "#2ecc71",
  background: "#ecf0f1",
  text: "#2c3e50",
  border: "#e0e0e0",
};

export default GlobalStyle;
