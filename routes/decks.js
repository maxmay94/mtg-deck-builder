import { Router } from 'express'
import * as decksCtrl from '../controllers/decks.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

//! localhost:3000/decks

// GET - localhost:3000/decks
router.get('/', isLoggedIn, decksCtrl.index)
// GET - localhost:3000/decks/new
router.get('/new', isLoggedIn, decksCtrl.new)
// GET - localhost:3000/decks/:id
router.get('/:id', decksCtrl.show)
// GET - localhost:3000/decks/:id/edit
router.get('/:id/edit', isLoggedIn, decksCtrl.edit)

// POST - localhostL3000/decks
router.post('/', isLoggedIn, decksCtrl.create)

// PUT - localhost:3000/decks/:id
router.put('/:id', isLoggedIn, decksCtrl.update)

// DELETE - localhost:3000/decks/:id
router.delete('/:id', isLoggedIn, decksCtrl.delete)
// DELETE - localhost:3000/decks/:deckId/cards/:cardId
router.delete('/:deckId/cards/:cardId', isLoggedIn, decksCtrl.removeCard)

export {
  router
}