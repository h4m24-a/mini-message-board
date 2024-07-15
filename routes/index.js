const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { title: 'Message Board'})
})

router.get('/new', (req,res) => {
  res.send('from new url')
})

module.exports = router;