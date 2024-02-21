import React, { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { searchResultsState, selectedItemState } from '../../atom/searchAtomState.js';
import { Link } from 'react-router-dom';

export default function IndexList() {
  const [searchResults, setSearchResults] = useRecoilState(searchResultsState);
  const setSelectedItem = useSetRecoilState(selectedItemState);

  useEffect(() => {
    fetch('/api/items')
      .then(res => res.json())
      .then(data => {
        setSearchResults(data);
      })
      .catch(err => {
        console.log('Error: ', err);
      });
  }, [setSearchResults]);

  return (
    <div>
      <ul style={{listStyleType:'none'}}>
        {searchResults.map((item, index) => (
          <li
            key={index}
            onClick={() => setSelectedItem(item)}
            style={{ cursor: 'pointer'}}
          >
            <Link to="/">
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};