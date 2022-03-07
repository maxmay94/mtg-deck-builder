import { Router } from 'express'
import * as decksCtrl from '../controllers/decks.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

//! localhost:3000/decks

// GET - localhost:3000/decks
router.get('/', decksCtrl.index)
// GET - localhost:3000/decks/new
router.get('/new', decksCtrl.new)

////////////////////////
// GET - localhost:3000/decks/search
// router.get('/new/search', decksCtrl.search)
////////////////////////

export {
  router
}