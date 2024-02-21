import React, { useState, useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { selectedItemState, itemsState } from '../../atom/searchAtomState.js';

export default function Home() {
  const selectedItem = useRecoilValue(selectedItemState);
  const setItems = useSetRecoilState(itemsState);
  const [editMode, setEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState(selectedItem?.title || '');
  const [editContent, setEditContent] = useState(selectedItem?.content || '');

  useEffect(() => {
    if (selectedItem && selectedItem.id) {
      setEditTitle(selectedItem?.title || '');
      setEditContent(selectedItem?.content || '');
    }
  }, [selectedItem]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    if (!selectedItem || !selectedItem.id) {
      console.error('Selected item is undefined or does not have an id.');
      return;
    }
    const updatedItem = { title: editTitle, content: editContent };
    fetch('/api/items/' + selectedItem.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedItem),
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Netword response was not ok ' + res.statusText);
        }
        return res.json();
      })
      .then(data => {
        setItems((prevItems) =>
          prevItems.map((item) =>
            item.id === selectedItem.id ? { ...item, ...updatedItem } : item
          )
        );
        setEditMode(false);
      })
      .catch(err => {
        console.error('Error updating item:', err);
      });
  };

  const handleDelete = () => {
    if (!selectedItem || !selectedItem.id) {
      console.error('Selected item is undefined or does not have an id.');
      return;
    }
  
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      fetch(`/api/items/${selectedItem.id}`, {
        method: 'DELETE',
      })
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(() => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== selectedItem.id));
        // 선택된 아이템 상태를 초기화하거나 업데이트할 수 있습니다.
      })
      .catch(err => {
        console.error('Error deleting item:', err);
      });
    }
  }

  return (
    <div>
      {editMode ? (
        <div>
          <div>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="제목을 입력해주세요"
            />
          </div>
          <div>
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              cols="30"
              rows="10"
              placeholder="본문을 입력해주세요"
            />
          </div>
          <button type="button" onClick={handleSave}>저장</button>
        </div>
      ) : (
          <div>
            {selectedItem ? (
              <article>
                <h1>{selectedItem.title}</h1>
                <p>{selectedItem.content}</p>
                <button type="button" onClick={handleEdit}>수정</button>
                <button type="button" onClick={handleDelete}>삭제</button>
              </article>
            ): (
              <p>아직 선택된 항목이 없습니다.</p>
            )}
          </div>
      )}
    </div>
  );
}
