import React from "react";
import { useState } from "react";

const Header = ({ query, setQuery, lang, setLang }) => {
  const [langsVisible, setLangsVisible] = useState(false);
  // const history = useHistory()

  const handleClick = (e) => {
    setLangsVisible(prev => !prev);
  }

  const handleLangChange = (e) => {
    if (e.target.className !== 'header_lang_link-active') {
      setLang(e.target.dataset.lang);
      localStorage.setItem('lang', e.target.dataset.lang);
      setLangsVisible(false);
      window.history.pushState("", "", window.location.pathname);
    }
  }

  return (
    <header className="header">
      <div className="header_lang">
        <span className="header_lang_link" onClick={handleClick}>
          <svg width="14" height="14" viewBox="0 0 16 16"><title>globeIcon</title><path d="M7.992 0C3.576 0 0 3.584 0 8s3.576 8 7.992 8C12.416 16 16 12.416 16 8s-3.584-8-8.008-8zm5.544 4.8h-2.36c-.256-1-.624-1.96-1.104-2.848A6.424 6.424 0 0113.536 4.8zM8 1.632A11.27 11.27 0 019.528 4.8H6.472A11.27 11.27 0 018 1.632zM1.808 9.6A6.594 6.594 0 011.6 8c0-.552.08-1.088.208-1.6h2.704A13.212 13.212 0 004.4 8c0 .544.048 1.072.112 1.6H1.808zm.656 1.6h2.36c.256 1 .624 1.96 1.104 2.848A6.39 6.39 0 012.464 11.2zm2.36-6.4h-2.36a6.39 6.39 0 013.464-2.848A12.52 12.52 0 004.824 4.8zM8 14.368A11.27 11.27 0 016.472 11.2h3.056A11.27 11.27 0 018 14.368zM9.872 9.6H6.128A11.77 11.77 0 016 8c0-.544.056-1.08.128-1.6h3.744C9.944 6.92 10 7.456 10 8s-.056 1.072-.128 1.6zm.2 4.448a12.52 12.52 0 001.104-2.848h2.36a6.424 6.424 0 01-3.464 2.848zM11.488 9.6c.064-.528.112-1.056.112-1.6s-.048-1.072-.112-1.6h2.704c.128.512.208 1.048.208 1.6s-.08 1.088-.208 1.6h-2.704z" fill="#E8E8E8"></path></svg>
        </span>
        {
          langsVisible &&
            <ul className="header_lang_drop" onClick={handleLangChange}>
              <li data-lang='en' className={lang === 'en' ? 'header_lang_link-active' : undefined}>English</li>
              <li data-lang='ru' className={lang === 'ru' ? 'header_lang_link-active' : undefined}>Русский</li>
            </ul>
        }
      </div>
      <img src="./game-updates-hero.jpg" alt="" />
      <div className="header_data">
        <h1 className="header_title">Узлы Пути Чемпионов 2.0</h1>
        <div className="header_wrap">
          <button className="header_clear" onClick={e => setQuery('')}>✖</button>
          <input
            className="header_input"
            type="text"
            name=""
            id=""
            value={query}
            placeholder={ lang === 'en' ? 'Search' : 'Поиск' }
            onChange={e => setQuery(e.target.value)}
            autoFocus=""
          />
        </div>
      </div>
    </header>
  )
}

export default Header;
