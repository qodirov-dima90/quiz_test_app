import React, { useContext } from 'react'
import './style.css'
import { ILanguage, LanguageContext } from '../../context/LanguageProvider'
import { useQuiz } from '../../context/QuizContext'
import { useLanguage } from '../../hooks/useLanguage'

const LanguageSwitcher = () => {
  const { language, changeLanguage } = useContext(LanguageContext);
  const { selectQuizTopic } = useQuiz();
  const handleChange = (type: ILanguage) => {
    changeLanguage(type);
    selectQuizTopic("PassQuizRU");
  };

  return (
    <div className='language' role='radiogroup' aria-labelledby='language-switcher1'>
      {/* <div className='language__container--left language__container--fr'>
        <input
          onChange={() => handleChange("ru")}
          checked={language == 'ru'}
          className='language__control'
          type='radio'
          id='language1-1'
          name='language-switch1'
        />
        <label className='language__label' htmlFor='language1-1'>
          RU
        </label>
      </div> */}
      <div className='language__container--right language__container--en'>
        <input
          onChange={() => handleChange("uz")}
          checked={language == "uz"}
          className='language__control'
          type='radio'
          id='language1-2'
          name='language-switch1'
        />
        <label className='language__label' htmlFor='language1-2'>
          UZ
        </label>
      </div>
    </div>
  )
}

export default LanguageSwitcher