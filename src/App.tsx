import { useState } from 'react'
import { ThemeProvider } from 'styled-components'

import Main from './components/Main'
import QuizProvider from './context/QuizProvider'
import { GlobalStyles } from './styles/Global'
import { themes } from './styles/Theme'
import { LanguageProvider } from './context/LanguageProvider'

function App() {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    return savedTheme || 'light'
  })

  const theme = currentTheme === 'light' ? themes.light : themes.dark

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <LanguageProvider>
        <QuizProvider>
          <Main />
        </QuizProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App
