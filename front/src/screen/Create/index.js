import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { titleState, contentState, itemsState } from '../../atom/searchAtomState.js';

export default function Create() {
  const [title, setTitle] = useRecoilState(titleState);
  const [content, setContent] = useRecoilState(contentState);
  const setItems = useSetRecoilState(itemsState);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = () => {
    if (title.trim() !== '' && content.trim() !== '') {
      const newItem = { title, content };
      fetch('/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      })
        .then(res => res.json())
        .then(data => {
          setItems(prevItems => [...prevItems, data]);
          setTitle('');
          setContent('');
        })
        .catch(err => {
          console.error('Error posting new item:', err);
        });
    }
  };

  return (
    <div>
      <aside>
        <div>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="제목을 입력해주세요"
          />
        </div>
        <div>
          <textarea
            value={content}
            onChange={handleContentChange}
            cols="30"
            rows="10"
            placeholder="본문을 입력해주세요"
          />
        </div>
        <button type="button" onClick={handleSubmit}>추가</button>
      </aside>
    </div>
  );
};