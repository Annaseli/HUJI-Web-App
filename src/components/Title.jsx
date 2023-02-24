import styled from "styled-components";

/**** TITLES ****/
export const StandAloneTitle = styled.h6`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 700;
  font-size: ${({ size }) => (size ? size + "px" : "16px")};
  color: ${({ color }) => (color ? color : "#333331")};
`;

export const SemiTitle = styled.h2`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 48px;
  color: ${({ color }) => (color ? color : "#000000")};
`;

export const Title = styled.h1`
  font-family: "Poppins";
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  // line-height: 50px;
  text-transform: uppercase;
  color: #333331;
  text-shadow: -3px 0px 0px #e993b1;
`;

export const SubTitle = styled.h6`
  font-family: "Poppins";
  font-style: normal;
  font-size: ${({ size }) => (size ? size + "px" : "18px")};
  color: ${({ color }) => (color ? color : "#333331")};
  margin-bottom: 16px;
`;

export const TextInPage = styled.div`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: ${({ size }) => (size ? size + "px" : "16px")};
  line-height: 160%;
  text-decoration: ${({ decoration }) => (decoration ? decoration : "none")};
  color: ${({ color }) => (color ? color : "#333331")};
`;