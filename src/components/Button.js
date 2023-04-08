import styled from "styled-components";

const ButtonWrapper = styled.button`
  display: block;
  margin: 15px auto;
  outline: none;
  color: ${({ color }) => (color ? color : "#FFFFFF")};
  padding: 6px 3em;
  font-size: ${({ size }) => (size ? size + "px" : "16px")};
  font-weight: 500;
  border-radius: 4.94533px;
  border: ${({ border }) => (border ? `1px solid ${border}` : "none")};
  box-shadow: 0px 4.94533px 7.41799px rgba(0, 26, 255, 0.3);
  background: ${({ background }) => (background ? background : "#211D42")};
  font-family: "Poppins";
  cursor: pointer;
  transition: all 200ms ease-in-out;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  z-index: 1;
  height: ${({ height }) => (height ? height + "px" : "auto")};
  &:hover {
    color: #FFF4E6;
    background-color: #FD35BD;
    box-shadow: 0px 0px 0px rgba(160, 160, 160, 0.25);    
  }
  &:focus {
    outline: none;
  }
`;

export function Button(props) {
  const { size, color, background, onClick, width, height, border } = props;

  return (
    <ButtonWrapper
      size={size}
      color={color}
      background={background}
      border={border}
      onClick={onClick}
      width={width}
      height={height}
    >
      {props.children}
    </ButtonWrapper>
  );
}
