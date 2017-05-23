const express = require('express')
const router = express.Router()
const knex = require('../db')

router.get('/:post_id/comments', (req, res, next) => {
  knex('comments')
    .where({post_id: req.params.post_id})
    .then(comments => res.json(comments))
    .catch(err => next(err))
})

router.post('/:post_id/comments', validate, (req, res, next) => {
  knex('comments')
    .insert({content: req.body.content, post_id: req.params.post_id})
    .where({post_id: req.params.post_id})
    .returning('*')
    .then(comments => res.json(comments[0]))
    .catch(err => next(err))
})

router.patch('/:post_id/comments/:id', validate, (req, res, next) => {
  knex('comments')
    .update({content: req.body.content})
    .where({post_id: req.params.post_id, id: req.params.id})
    .returning('*')
    .then(comments => res.json(comments[0]))
    .catch(err => next(err))
})

router.delete('/:post_id/comments/:id', (req, res, next) => {
  knex('comments')
    .del()
    .where({post_id: req.params.post_id, id: req.params.id})
    .then(() => res.end())
    .catch(err => next(err))
})

function validate(req, res, next) {
  const errors = [];
  ['content'].forEach(field => {
    if (!req.body[field] || req.body[field].trim() === '') {
      errors.push({field, messages: ["cannot be blank"]})
    }
  })
  if (errors.length) return res.status(422).json({errors})
  next()
}

module.exports = router
