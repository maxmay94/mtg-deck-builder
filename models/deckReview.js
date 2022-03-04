import mongoose from 'mongoose'

const Schema = mongoose.Schema

const deckReviewSchema = new Schema({
  rating: {
    type: Number,
    min: 1,
    max:5
  },
  content: String
}, {
  timestamps: true
})

const DeckReview = mongoose.model('DeckReview', deckReviewSchema)

export {
  DeckReview
}
