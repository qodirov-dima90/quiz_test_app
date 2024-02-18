import { Dispatch, SetStateAction } from 'react'
import { Question } from '../data/QuizQuestions'

export enum ScreenTypes {
  QuizTopicsScreen,
  FormScreen,
  QuizDetailsScreen,
  QuestionScreen,
  ResultScreen,
}

export interface Result extends Question {
  selectedAnswer: string[]
  isMatch: boolean
}

export interface User {
  firstName: string;
  lastName: string;
  surName: string;
  dateOfBirth: string;
  phoneNumber: string;
  comeFrom: string;
  otherComeFrom?: string;
}

export type QuizContextTypes = {
  currentScreen: ScreenTypes
  setCurrentScreen: Dispatch<SetStateAction<ScreenTypes>>
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  quizTopic: string
  selectQuizTopic: (type: string) => void
  questions: Question[]
  setQuestions: Dispatch<SetStateAction<any[]>>
  result: Result[]
  setResult: Dispatch<SetStateAction<any[]>>
  timer: number
  setTimer: Dispatch<SetStateAction<number>>
  endTime: number
  setEndTime: (type: number) => void
  quizDetails: {
    totalQuestions: number
    totalScore: number
    totalTime: number
    selectedQuizTopic: string
  }
}
