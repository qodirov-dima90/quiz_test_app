import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'

import { AppLogo, CheckIcon, Next, TimerIcon } from '../../config/icons'
import { useQuiz } from '../../context/QuizContext'
import { useTimer } from '../../hooks'
import { device } from '../../styles/BreakPoints'
import { PageCenter } from '../../styles/Global'
import { ScreenTypes } from '../../types'

import Button from '../ui/Button'
import ModalWrapper from '../ui/ModalWrapper'
import Question from './Question'
import QuizHeader from './QuizHeader'
import { useLanguage } from '../../hooks/useLanguage'

const QuizContainer = styled.div<{ selectedAnswer: boolean }>`
  width: 900px;
  min-height: 500px;
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 4px;
  padding: 30px 60px 80px 60px;
  margin-bottom: 70px;
  position: relative;
  @media ${device.md} {
    width: 100%;
    padding: 15px 15px 80px 15px;
  }
  button {
    span {
      svg {
        path {
          fill: ${({ selectedAnswer, theme }) =>
            selectedAnswer ? `${theme.colors.buttonText}` : `${theme.colors.darkGray}`};
        }
      }
    }
  }
`

const LogoContainer = styled.div`
  margin-top: 50px;
  margin-bottom: 50px;
  @media ${device.md} {
    margin-top: 10px;
    margin-bottom: 20px;
    svg {
      width: 185px;
      height: 80px;
    }
  }
`

const ButtonWrapper = styled.div`
  position: absolute;
  right: 60px;
  bottom: 30px;
  display: flex;
  gap: 20px;
  @media ${device.sm} {
    justify-content: flex-end;
    width: 90%;
    right: 15px;
  }
`

const QuestionScreen: FC = () => {
  const [activeQuestion, setActiveQuestion] = useState<number>(0)
  const [showTimerModal, setShowTimerModal] = useState<boolean>(false)
  const [showResultModal, setShowResultModal] = useState<boolean>(false)

  const {
    questions,
    quizDetails,
    result,
    setResult,
    setCurrentScreen,
    timer,
    setTimer,
    setEndTime,
  } = useQuiz()

  const currentQuestion = questions[activeQuestion];
  const [selectedAnswer, setSelectedAnswer] = useState<string[]>([]);
  const { question, type, choices, code, image, correctAnswers } = currentQuestion
  const { t } = useLanguage();

  useEffect(() => {
    const currentAnswer = result[activeQuestion];
    setSelectedAnswer(currentAnswer?.selectedAnswer || [])
  }, [activeQuestion]);


  const onClickNext = () => {
    const isMatch =
      selectedAnswer.length === correctAnswers.length &&
      selectedAnswer.every((answer) => correctAnswers.includes(answer));

    // Update result with the current question's index
    const newResult = [...result];
    newResult[activeQuestion] = { ...currentQuestion, selectedAnswer, isMatch };
    setResult(newResult);

    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1)
    } else {
      // how long does it take to finish the quiz
      const timeTaken = quizDetails.totalTime - timer
      setEndTime(timeTaken)
      setShowResultModal(true)
    }
    // setSelectedAnswer([])
  }

  const onClickPrev = () => {
    // Check if there's a change in the selected answer for the active question
    const hasAnswerChanged = arraysEqual(result[activeQuestion]?.selectedAnswer || [], selectedAnswer);

    if (hasAnswerChanged) {
      const isMatch =
        selectedAnswer.length === correctAnswers.length &&
        selectedAnswer.every((answer) => correctAnswers.includes(answer));

      const newResult = [...result];
      newResult[activeQuestion] = { ...currentQuestion, selectedAnswer, isMatch };
      setResult(newResult);
    }
  
    // Navigate to the previous question or handle finishing the quiz
    if (activeQuestion !== 0) {
      setActiveQuestion(prev => prev - 1);
    } else {
      // Calculate the time taken to finish the quiz
      const timeTaken = quizDetails.totalTime - timer;
      setEndTime(timeTaken);
      setShowResultModal(true);
    }
  }
  
  // Helper function to check if two arrays are equal
  function arraysEqual(arr1: string[], arr2: string[]) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  }
  

  const handleAnswerSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target

    if (type === 'MAQs') {
      if (selectedAnswer.includes(name)) {
        setSelectedAnswer((prevSelectedAnswer) =>
          prevSelectedAnswer.filter((element) => element !== name)
        )
      } else {
        setSelectedAnswer((prevSelectedAnswer) => [...prevSelectedAnswer, name])
      }
    }

    if (type === 'MCQs' || type === 'boolean') {
      if (checked) {
        setSelectedAnswer([name])
      }
    }
  }

  const handleModal = () => {
    setCurrentScreen(ScreenTypes.ResultScreen)
    document.body.style.overflow = 'auto'
  }

  // to prevent scrolling when modal is opened
  useEffect(() => {
    if (showTimerModal || showResultModal) {
      document.body.style.overflow = 'hidden'
    }
  }, [showTimerModal, showResultModal])

  // timer hooks, handle conditions related to time
  useTimer(timer, quizDetails, setEndTime, setTimer, setShowTimerModal, showResultModal)

  return (
    <PageCenter>
      <QuizContainer selectedAnswer={selectedAnswer.length > 0}>
        <QuizHeader
          activeQuestion={activeQuestion}
          totalQuestions={quizDetails.totalQuestions}
          timer={timer}
        />
        <Question
          question={question}
          code={code}
          image={image}
          choices={choices}
          type={type}
          handleAnswerSelection={handleAnswerSelection}
          selectedAnswer={selectedAnswer}
        />
        <ButtonWrapper>
          {activeQuestion !== 0 && (
            <Button
              text={'Prev'}
              onClick={onClickPrev}
              icon={<Next style={{ transform: "rotate(180deg)" }}/>}
              iconPosition="left"
              // disabled={selectedAnswer.length === 0}
            />
          )}
          <Button
            text={activeQuestion === questions.length ? 'Finish' : 'Next'}
            onClick={onClickNext}
            icon={<Next />}
            iconPosition="right"
            // disabled={selectedAnswer.length === 0}
          />
        </ButtonWrapper>
      </QuizContainer>
      {/* timer or finish quiz modal*/}
      {(showTimerModal || showResultModal) && (
        <ModalWrapper
          title={showResultModal ? t("testEnd") : t("testTimeEnd")}
          subtitle={``}
          onClick={handleModal}
          icon={showResultModal ? <CheckIcon /> : <TimerIcon />}
          buttonTitle={t("seeAnswers")}
        />
      )}
    </PageCenter>
  )
}

export default QuestionScreen
