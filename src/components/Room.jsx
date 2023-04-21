import styled from "styled-components";

const SecondaryButtonWrapper = styled.div`
  border: 2px solid #211D42;
  padding: 40px 5em;
  box-sizing: border-box;
  background: ${({available}) => (available  ? "none" : "#e0e0e0")};
  border-radius: 27px;
  font-size: ${({size}) => (size ? size + "px" : "22px")};
  font-style: normal;
  font-weight: 600;
  line-height: 158%;
  color: #211D42;

  &:hover {
    color: ${({available}) => (available ? "#351dff" : "#ff5757")};
    border: ${({available}) => (available ? "2px solid #00db33" : "2px solid #ff5757")}  ;

    //border: 2px solid #351dff;
  }
`;

export function Room(props) {
    const { size, color, available, onClick, width } = props;

    return (
        <SecondaryButtonWrapper
            size={size}
            color={color}
            available={available}
            onClick={onClick }
            width={width}
        >
            {props.children}
        </SecondaryButtonWrapper>

    );
}