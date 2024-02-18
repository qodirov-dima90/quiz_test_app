import { useQuiz } from '../../context/QuizContext'
import { ScreenTypes } from '../../types'
import FormScreen from '../FormScreen/FormScreen'

import QuestionScreen from '../QuestionScreen'
import QuizDetailsScreen from '../QuizDetailsScreen'
import QuizTopicsScreen from '../QuizTopicsScreen'
import ResultScreen from '../ResultScreen'

function Main() {
  const { currentScreen } = useQuiz()
  
  const screenComponents = {
    [ScreenTypes.QuizTopicsScreen]: <QuizTopicsScreen />,
    [ScreenTypes.FormScreen]: <FormScreen/>,
    [ScreenTypes.QuizDetailsScreen]: <QuizDetailsScreen />,
    [ScreenTypes.QuestionScreen]: <QuestionScreen />,
    [ScreenTypes.ResultScreen]: <ResultScreen />,
  }

  const ComponentToRender = screenComponents[currentScreen];

  return <>{ComponentToRender}</>
}

export default Main;
