import { ButtonContainer, } from "./Button.styles"
import type { ColorVariant } from './Button.styles'

interface ButtonProps {
    variant?: ColorVariant
}

export function Button({variant = 'primary'}: ButtonProps){
    return <ButtonContainer variant={variant}>Enviar</ButtonContainer>
}