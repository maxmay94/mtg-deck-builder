import { DeckReview } from '../models/deckReview.js'
import { Deck } from '../models/deck.js'

function index(req, res) {
  console.log('INDEX')
}

function submit(req, res) {
  req.body.owner = req.user.profile._id
  DeckReview.create(req.body)
  .then(deckReview => {
    Deck.findById(req.params.id)
    .then(deck => {
      deck.reviews.push(deckReview._id)
      deck.save()
      res.redirect(`/decks/${req.params.id}`)
    })
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