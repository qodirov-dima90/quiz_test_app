import { FC, useContext } from 'react'
import styled from 'styled-components'

import { useQuiz } from '../../../context/QuizContext'
import { device } from '../../../styles/BreakPoints'
import { Result } from '../../../types'
import { useLanguage } from '../../../hooks/useLanguage'
import { LanguageContext } from '../../../context/LanguageProvider'

const ResultOverviewStyle = styled.div`
  text-align: center;
  margin-bottom: 70px;
  @media ${device.md} {
    margin-bottom: 30px;
  }

  p {
    margin-top: 15px;
    font-weight: 500;
    font-size: 18px;
  }
`

const FinalResult = styled.p`
  color: #64e3ce;
  font-size: 24px !important;
  letter-spacing: 1px;
`

interface ResultOverviewProps {
  result: Result[]
}

const ResultOverview: FC<ResultOverviewProps> = ({ result }) => {
 
  const { language } = useContext(LanguageContext)


  const correctAnswers = result.reduce((acc, currValue) => currValue.isMatch === true ? acc + 1 : acc, 0)

  return (
    <>

      <ResultOverviewStyle>
        <FinalResult>
          {correctAnswers < 12 ? (
            <>
              {language == 'uz' ?
                <>Xafa bo'lmang Siz<strong style={{ color: '#2dfab6' }}>"Testga yaxshi javob bera olmadingiz"</strong> Siz ko'proq o'rganishingiz kerak<br />
                  Dasturlashni o'rganing!
                </>
                :
                <>
                  Не расстраивайся<strong style={{ color: '#2dfab6' }}>«Ты плохо сдал экзамен»</strong>.<br />
                  Вам следует узнать больше
                </>
              }
            </>
          ) : (
            <>
              {language == 'uz' ?
                <>Tabriklaymiz! Siz <strong style={{ color: '#2dfab6' }}>"Testga a'lo darjada javob berdingiz"</strong> o'rganishda davom eting<br />
                  Siz yaxshi dasturchi bo'lasiz
                </>
                :
                <>
                  Поздравляем! <strong style={{ color: '#2dfab6' }}>«Вы отлично ответили на тест»</strong>.<br />
                  продолжай учиться, ты станешь лучшим программистом
                </>
              }
            </>
          )}
        </FinalResult>
      </ResultOverviewStyle>
    </>
  )
}

export default ResultOverview
