import { ReactNode, useContext, useEffect, useState } from 'react'
import { quiz } from '../data/QuizQuestions'
import { QuizContextTypes, Result, ScreenTypes } from '../types'
import { QuizContext, initialState } from './QuizContext'
import { LanguageContext } from './LanguageProvider'

type QuizProviderProps = {
  children: ReactNode
}

const shuffleArray = (array: any[]): any[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const QuizProvider = ({ children }: QuizProviderProps) => {
  const { language } = useContext(LanguageContext);
  const [timer, setTimer] = useState<number>(initialState.timer)
  const [endTime, setEndTime] = useState<number>(initialState.endTime)
  const [quizTopic, setQuizTopic] = useState<string>(initialState.quizTopic)
  const [result, setResult] = useState<Result[]>(initialState.result)
  const [user, setUser] = useState(initialState.user)
  const [currentScreen, setCurrentScreen] = useState<ScreenTypes>(
    initialState.currentScreen
  )

  const [questions, setQuestions] = useState(quiz[initialState.quizTopic].questions)

  const {
    questions: quizQuestions,
    totalQuestions,
    totalTime,
    totalScore,
  } = quiz[quizTopic]

  const selectQuizTopic = (topic: string) => {
    setQuizTopic(topic)
  }

  useEffect(() => {
    setTimer(totalTime);
    const shuffledQuestions = shuffleArray(quizQuestions.map(question => ({
      ...question,
      choices: shuffleArray(question.choices),
    })));

    setQuestions(shuffledQuestions);
  }, [quizTopic])


  const quizDetails = {
    totalQuestions,
    totalScore,
    totalTime,
    selectedQuizTopic: quizTopic,
  }

  const quizContextValue: QuizContextTypes = {
    currentScreen,
    setCurrentScreen,
    quizTopic,
    selectQuizTopic,
    questions,
    setQuestions,
    result,
    setResult,
    quizDetails,
    timer,
    setTimer,
    endTime,
    setEndTime,
    user,
    setUser
  }

  return <QuizContext.Provider value={quizContextValue}>{children}</QuizContext.Provider>
}

export default QuizProvider
