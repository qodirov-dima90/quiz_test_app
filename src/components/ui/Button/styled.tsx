import styled from 'styled-components'
import { device } from '../../../styles/BreakPoints'
interface ButtonType {
  outline?: boolean
  bold?: boolean
  big?: boolean
}

export const ButtonStyle = styled.button.attrs(({ outline, bold, big }: ButtonType) => ({
  outline,
  bold,
  big,
}))`
  min-width: 5.375rem;
  min-height: 2.5rem;
  padding: 0px 1.25rem;
  color: ${({ theme, outline }) =>
    outline ? theme.colors.outlineButtonText : theme.colors.buttonText};
  background: ${({ theme, outline }) =>
    outline ? theme.colors.cardBackground : theme.colors.buttonBackground};
  font-size: 0.875rem;
  border: 1px solid
    ${({ theme, outline }) => (!outline ? 'none' : theme.colors.themeColor)};
  font-weight: ${({ bold }) => (bold ? '600' : '400')};
  border-radius: 0.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  @media ${device.md} {
    width: ${({ big }) => (big ? '180px' : '150px')};
    min-height: 40px;
    tap-highlight-color: transparent;
    -webkit-tap-highlight-color: transparent;
  }

  &:active {
    transform: scale(0.98);
    box-shadow: ${({ theme }) => theme.shadows.activeButton};
    transition: 0.2s all;
  }
  &:disabled {
    background: ${({ theme }) => theme.colors.disabledButton};
    color: ${({ theme }) => theme.colors.darkGray};
    cursor: not-allowed;
    transform: unset;
    box-shadow: unset;
  }
`

export const IconLeft = styled.span`
  margin-right: 10px;
  display: flex;
  svg {
    path {
      fill: ${({ theme }) => theme.colors.buttonText};
    }
  }
`

export const IconRight = styled.span`
  margin-left: 20px;
  display: flex;
  svg {
    path {
      fill: ${({ theme }) => theme.colors.buttonText};
    }
  }
`
