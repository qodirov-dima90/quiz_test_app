import styled from 'styled-components'

import { AppLogo } from '../../config/icons'
import { useQuiz } from '../../context/QuizContext'
import { quizTopics } from '../../data/quizTopics'
import { device } from '../../styles/BreakPoints'
import {
  CenterCardContainer,
  HighlightedText,
  LogoContainer,
  PageCenter
} from '../../styles/Global'
import { ScreenTypes } from '../../types'

import Button from '../ui/Button'
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher'
import { useContext } from 'react'
import { LanguageContext } from '../../context/LanguageProvider'
import { useLanguage } from '../../hooks/useLanguage'

const Heading = styled.h2`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 20px;
  text-align: center;
  color: #64e3ce;
`

const DetailText = styled.p`
  font-weight: 500;
  font-size: 20px;
  line-height: 29px;
  text-align: center;
  color: #64e3ce;
`

const SelectButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 60%;
  gap: 30px;
  margin-top: 40px;
  margin-bottom: 45px;
  @media ${device.md} {
    row-gap: 20px;
    column-gap: 20px;
    max-width: 100%;
  }
`

interface SelectButtonProps {
  active: boolean
  disabled?: boolean
}

const SelectButton = styled.div<SelectButtonProps>`
  background-color: ${({ disabled, theme }) =>
          disabled ? `${theme.colors.disabledCard}` : `${theme.colors.selectTopicBg}`};
  border: ${({ active, theme }) =>
          active
                  ? `2px solid ${theme.colors.themeColor}`
                  : `1px solid ${theme.colors.disabledButton}`};
  transition: background-color 0.4s ease-out;
  border-radius: 10px;
  padding: 14px 10px;
  display: flex;
  align-items: center;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  @media ${device.md} {
    padding: 10px;
    tap-highlight-color: transparent;
    -webkit-tap-highlight-color: transparent;
  }
`

const SelectButtonText = styled.span`
  font-size: 18px;
  font-weight: 600;
  margin-left: 10px;
  @media ${device.md} {
    font-size: 16px;
    font-weight: 500;
  }
`

const Container = styled.div`
  background: ${({ theme }) => theme.colors.cardBackground};
  padding: 30px;
  border-radius: 4px;
`

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const QuizTopicsScreen: React.FC = () => {
  const { quizTopic, selectQuizTopic, setCurrentScreen } = useQuiz();
  const { t } = useLanguage();

  const goToQuizDetailsScreen = () => {
    setCurrentScreen(ScreenTypes.FormScreen)
  }

  const today = new Date()

  return (
    <PageCenter light justifyCenter>
      <Container style={{ maxWidth: '600px', width: '100%' }}>
        <LogoContainer>
          <AppLogo />
        </LogoContainer>
        <Heading>
          {t("enterExam")}
        </Heading>
        <DetailText>{today.getDate()}.{today.getMonth() + 1}.{today.getFullYear()}{t("year")}.</DetailText>
        <SelectButtonContainer>

        </SelectButtonContainer>
        <Flex>
          <LanguageSwitcher/>
          <Button text={t("start")} onClick={goToQuizDetailsScreen} bold />
        </Flex>
      </Container>
    </PageCenter>
  )
}

export default QuizTopicsScreen
