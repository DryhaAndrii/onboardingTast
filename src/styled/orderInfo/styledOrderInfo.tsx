import styled from "styled-components";

import { colors } from "../../styledComponentsGlobals";

export const ContainerOrderInfoStyled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  > div {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 400px;
    gap: 1rem;
    border: 1px solid ${colors.border};
    border-radius: 1rem;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    p {
      margin: 0;
    }
    button {
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
      padding: 1rem;
      border: none;
      font-weight: bold;
      font-size: 1rem;
      border-radius: 1rem;
      transition: all 0.1s ease-in-out;
      &:hover {
        cursor: pointer;
        background-color: ${colors.border};
        scale: 1.05;
      }
      &:active {
        scale: 0.95;
      }
    }
    .centeredText {
      text-align: center;
    }
  }
`;
