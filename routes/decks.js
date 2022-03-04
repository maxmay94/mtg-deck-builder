import { Router } from 'express'
import * as decksCtrl from '../controllers/decks.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

//! localhost:3000/decks

export {
  router
}