import styled from "styled-components";

export type ColorVariant = 'primary' | 'secondary' | 'danger' | 'success' 

interface ButtonContainerProps{
    variant: ColorVariant
}


export const ButtonContainer = styled.button<ButtonContainerProps>`
    width: 100px;
    height: 40px;
    background-color: ${p => p.theme[p.variant]};
`;