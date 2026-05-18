const express = require('express');
const app = express();

// 静的ファイル（publicフォルダ）を使えるようにする
app.use(express.static('public'));

// じゃんけんAPI
app.get('/api/janken', (req, res) => {
  const player = req.query.hand;
  const hands = ['グー', 'チョキ', 'パー'];
  const cpu = hands[Math.floor(Math.random() * hands.length)];

  let result = '';
  if (player === cpu) result = 'あいこ';
  else if (
    (player === 'グー' && cpu === 'チョキ') ||
    (player === 'チョキ' && cpu === 'パー') ||
    (player === 'パー' && cpu === 'グー')
  ) result = 'あなたの勝ち';
  else result = 'あなたの負け';

  res.json({ player, cpu, result });
});

// Render用のポート設定
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
