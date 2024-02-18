import { FC, ReactNode } from 'react'
import { ButtonStyle, IconLeft, IconRight } from './styled'

interface ButtonTypes {
  text: string
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  outline?: boolean
  bold?: boolean
  big?: boolean
  disabled?: boolean
  type?: "submit" | "button"
}

const Button: FC<ButtonTypes> = ({
  text,
  onClick,
  icon,
  iconPosition,
  outline,
  bold,
  big,
  disabled,
  type,
}) => {
  return (
    <ButtonStyle
      onClick={onClick}
      outline={outline}
      bold={bold}
      big={big}
      disabled={disabled}
      type={type}
    >
      {icon && iconPosition === 'left' && <IconLeft>{icon}</IconLeft>}
      {text}
      {icon && iconPosition === 'right' && <IconRight>{icon}</IconRight>}
    </ButtonStyle>
  )
}

export default Button
