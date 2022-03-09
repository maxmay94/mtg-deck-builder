import { DeckReview } from '../models/deckReview.js'

function index(req, res) {
  console.log('DEFAULT')
}

function submit(req, res) {
  req.body.owner = req.user.profile._id
  DeckReview.create(req.body)
  .then(review => {
      res.redirect(`/decks/${req.params.id}`)
  })
  .catch(err => {
    console.log('[][] ERROR -- deckReviews Controller [][]', err)
    res.redirect("/decks")
  })
}

export {
  index,
  submit
}