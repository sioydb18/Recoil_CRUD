const express = require('express');
const pool = require('./db_config.js');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('API Root');
});

// 모든 아이템을 가져오는 기존의 엔드포인트
router.get('/items', (req, res) => {
  pool.query('SELECT * FROM items', (err, results) => {
    if (err) {
      return res.status(500).json({ err });
    }
    res.json(results);
  });
});

// 아이템을 추가하는 기존의 엔드포인트
router.post('/items', (req, res) => {
  const { title, content } = req.body;
  pool.query('INSERT INTO items (title, content) VALUES (?, ?)', [title, content], (err, results) => {
    if (err) {
      return res.status(500).json({ err });
    }
    res.status(201).json({ id: results.insertId });
  });
});

router.get('/items/search', (req, res) => {
  const { keyword } = req.query;
  const formmattedKeyword = `%${keyword}%`;

  pool.query('SELECT * FROM items WHERE title LIKE ?', [formmattedKeyword], (err, results) => {
    if (err) {
      return res.status(500).json({ err });
    }
    res.json(results);
  });
});

router.put('/items/:id', (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!id || !title || !content) {
    return res.status(400).json({ error: 'ID, title, and content are required' });
  }

  pool.query('UPDATE items SET title = ?, content = ? WHERE id = ?', [title, content, id], (err, results) => {
    if (err) {
      return res.status(500).json({ err });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json({ message: 'Item updated successfully' });
  });
});

router.delete('/items/:id', (req, res) => {
  const { id } = req.params;

  pool.query('DELETE FROM items WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ err });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json({ message: 'Item updated successfully' });
  });
});


module.exports = router;