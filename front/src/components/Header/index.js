import React from "react";
import { useRecoilState } from 'recoil';
import { keywordState, searchResultsState } from "../../atom/searchAtomState";
import { Link } from 'react-router-dom';
import "./style.css";

export default function Header() {
  const [keyword, setKeyword] = useRecoilState(keywordState);
  const setSearchResults = useRecoilState(searchResultsState)[1];

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleKeywordSearch = () => {
    if (keyword.trim() !== '') {
      fetch(`/api/items/search?keyword=${encodeURIComponent(keyword)}`)
        .then(res => res.json())
        .then(data => {
          setSearchResults(Array.isArray(data) ? data : []);
        })
        .catch(err => {
          console.log('Error: ', err);
          setSearchResults([]);
        });
    } 
  };

  return (
    <div className="NavContainer">
      <div className="logo">
        <img src="/assets/img/"/>
      </div>
        <div className="search-container">
          <input type="text" value={keyword} onChange={handleKeywordChange} />
          <button type="button" onClick={handleKeywordSearch}>검색</button>
          <Link to="/create"><button type="button">새로 작성</button></Link>
        </div>
        <div className="login">

        </div>
    </div>
  );
};

