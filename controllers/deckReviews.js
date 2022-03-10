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

function deleteReview(req, res) {
  DeckReview.findById(req.params.reviewId)
  .then(review => {
    if(review.owner.equals(req.user.profile._id)) {
      review.delete()
      .then(() => {
        res.redirect(`/decks/${req.params.deckId}`)
      })
    } else {
      throw new Error ('NOT AUTHORIZED')
    }
  })
  .catch(err => {
    console.log("the error:", err)
    res.redirect(`/decks/${req.params.deckId}`)
  })
}

export {
  index,
  submit,
  deleteReview as delete
}