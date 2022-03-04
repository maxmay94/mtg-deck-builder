import { Router } from 'express'
import * as deckReviewsCtrl from '../controllers/deckReviews.js'
import { isLoggedIn } from '../middleware/middleware'

const router = Router()

//! localhost:3000/deckReviews

export {
  router
}