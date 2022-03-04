import { Router } from 'express'
import * as profilesCtrl from '../controllers/profiles.js'
import { isLoggedIn } from '../middleware/middleware'

const router = Router()

//! localhost:3000/profiles

export {
  router
}