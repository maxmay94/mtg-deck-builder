import { DeckReview } from '../models/deckReview.js'

function index(req, res) {
  console.log('DEFAULT')
}

function submit(req, res) {
  console.log("++++ SUBMIT ++++")
  req.body.owner = req.user.profile._id
  DeckReview.create(req.body)
  .then(review => {
      res.redirect('/decks')
  })
  .catch(err => {
    console.log(err)
    res.redirect("/decks")
  })
}

export {
  index,
  submit
}