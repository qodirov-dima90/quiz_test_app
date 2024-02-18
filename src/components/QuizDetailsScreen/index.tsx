import styled from 'styled-components'

import { AppLogo, StartIcon } from '../../config/icons'
import { useQuiz } from '../../context/QuizContext'
import {
  CenterCardContainer,
  Flex,
  HighlightedText,
  LogoContainer,
  PageCenter
} from '../../styles/Global'
import { ScreenTypes } from '../../types'
import { convertSeconds } from '../../utils/helpers'

import Button from '../ui/Button'
import { useLanguage } from '../../hooks/useLanguage'

const AppTitle = styled.h2`
  font-weight: 400;
  font-size: 32px;
  color: #fff;
  background-color: #20243d;
  padding: 1rem 3.125rem;
`

const DetailTextContainer = styled.div`
  font-size: 20px;
  font-weight: 500;
  margin-top: 15px;
  margin-bottom: 40px;
  max-width: 500px;
`

const DetailText = styled.p`
  font-size: 20px;
  font-weight: 500;
  margin-top: 15px;
  line-height: 1.3;
`

const Container = styled.div`
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 4px;
  padding: 2.5rem 3.125rem;
`

const Content = styled.p`
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 4px;
  overflow: hidden;
`

const QuizDetailsScreen = () => {
  const { setCurrentScreen, quizDetails, user } = useQuiz()
  const { t } = useLanguage()
  const { totalTime } = quizDetails

  const goToQuestionScreen = () => {
    setCurrentScreen(ScreenTypes.QuestionScreen)
  }

  const goToFormScreen = () => {
    setCurrentScreen(ScreenTypes.FormScreen)
  }

  return (
    <PageCenter light>
      <Content>
        <AppTitle style={{ textAlign: 'center' }}>{t('enterExam')}</AppTitle>
        <LogoContainer style={{ marginBottom: '0', marginTop: '20px' }}>
          <AppLogo />
        </LogoContainer>
        <Container style={{ paddingTop: '1rem' }}>
          <DetailTextContainer>
            <DetailText style={{ color: '#64e3ce' }}>
              {t('firstName')}: <HighlightedText>{user.firstName}</HighlightedText>
            </DetailText>
            <DetailText style={{ color: '#64e3ce' }}>
              {t('lastName')}: <HighlightedText>{user.lastName}</HighlightedText>
            </DetailText>
            <DetailText style={{ color: '#64e3ce' }}>
              {t('surName')}: <HighlightedText>{user.surName}</HighlightedText>
            </DetailText>
            <DetailText style={{ color: '#64e3ce' }}>
              {t('dateOfBirth')}: <HighlightedText>{user.dateOfBirth}</HighlightedText>
            </DetailText>
            <DetailText style={{ color: '#64e3ce' }}>
              {t('phone')}: <HighlightedText>{user.phoneNumber}</HighlightedText>
            </DetailText>
            <DetailText style={{ color: '#64e3ce' }}>
              {t('lodging')}: <HighlightedText>{user.comeFrom === 'otherComeFrom' ? user.otherComeFrom : user.comeFrom}</HighlightedText>
            </DetailText>
            <DetailText style={{ color: '#64e3ce', textAlign: 'center' }}>
              {t('totalTime')}: <HighlightedText>{convertSeconds(totalTime)}</HighlightedText>
            </DetailText>
            <DetailText style={{ color: '#d968a8', textAlign: 'center' }}>
              {t('quizRules')}
            </DetailText>
          </DetailTextContainer>
          <Flex style={{ flexWrap: 'wrap', gap: '10px', justifyContent: 'flex-end' }}>
            <Button
              text={t('back')}
              onClick={goToFormScreen}
              bold
            />
            <Button
              text={t('start')}
              onClick={goToQuestionScreen}
              bold
            />
          </Flex>
        </Container>
      </Content>
    </PageCenter>
  )
}

export default QuizDetailsScreen
