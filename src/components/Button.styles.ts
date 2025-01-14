import styled from "styled-components";

export type ColorVariant = 'primary' | 'secondary' | 'danger' | 'success' 

interface ButtonContainerProps{
    variant: ColorVariant
}

const buttonVariant  ={
    primary: 'purple',
    secondary: 'orange',
    danger:'red',
    success: 'green',
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
    width: 100px;
    height: 40px;
    background-color: ${p => buttonVariant[p.variant]};
`;