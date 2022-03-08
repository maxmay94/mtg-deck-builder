import { Router } from 'express'
import * as deckReviewsCtrl from '../controllers/deckReviews.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

//! localhost:3000/deckReviews
// POST - localhost:3000/decks/:id/deckReviews
router.post('/', isLoggedIn, deckReviewsCtrl.submit)

export {
  router
}