import { Router } from 'express'
import * as deckReviewsCtrl from '../controllers/deckReviews.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

//! localhost:3000/deckReviews
// POST - localhost:3000/decks/:id/deckReviews
// router.post('/', isLoggedIn, deckReviewsCtrl.submit)
router.post('/decks/:id/deckReviews', isLoggedIn, deckReviewsCtrl.submit)

router.delete('/decks/:deckId/deckReviews/:reviewId', isLoggedIn, deckReviewsCtrl.delete)

export {
  router
}