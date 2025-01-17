import React, { useState, useEffect } from "react";

import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

function App() {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState([]);
  const [lang, setLang] = useState();
  const [searchParam] = useState(["title", "text"]);

  const extractHashLang = () => {
    const { hash } = window.location;
    let hashLang = hash.replace('#', '').slice(0, 2);
    if (hashLang && (hashLang === 'en' || hashLang === 'ru')) {
      return hashLang;
    }
    return '';
  }


  useEffect(() => {
    // console.log(extractHashLang());
    let userLang = extractHashLang() || localStorage.getItem('lang') || navigator.language || navigator.userLanguage;
    setLang(userLang.slice(0, 2));
  }, []);

  // get data
  useEffect(() => {
    if (lang !== undefined) {
      fetch(`https://raw.githubusercontent.com/roose/lor-poc-data/main/data-${lang}.json`)
        .then(res => res.json())
        .then(
          (result) => {
            result.sort((a, b) => {
              return a.title > b.title;
            });
            setItems(result);
          }
        );
    }
  }, [lang]);

  // search by title & text
  const search = (items) => {
    return items.filter(item => {
      return searchParam.some(newItem => {
        return (
          item[newItem]
            .toString()
            .toLowerCase()
            .indexOf(query.toLowerCase()) > -1
        );
      });
    });
  }

  return (
    <div className="App">
      <Header query={query} setQuery={setQuery} lang={lang} setLang={setLang} />
      <Main search={search} items={items} lang={lang} />
      <Footer lang={lang} />
    </div>
  );
}

export default App;
