import mongoose from 'mongoose'

const Schema = mongoose.Schema

const deckSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  deckList: {
    type: [Number]
  },
  author: {type: Schema.Types.ObjectId, ref: 'Profile'},
  reviews: [{ type:Schema.Types.ObjectId, ref: "DeckReview" }]
})

const Deck = mongoose.model('Deck', deckSchema)

export {
  Deck
}