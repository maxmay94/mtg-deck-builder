import { Deck } from '../models/deck.js'
import { DeckReview } from '../models/deckReview.js'
import { Profile } from "../models/profile.js"
import fetch from 'node-fetch'

let cardObjs = []

function index(req, res) {
  Deck.find({})
  .populate('owner')
  .then(decks => {
    res.render('decks/index', {
      decks,
      title: 'Decks'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/decks")
  })
}

function newDeck(req, res){
  res.render('decks/new', {
    title: 'New Deck',
    cardObjs
  })
}

function show(req, res) {
  Deck.findById(req.params.id)
  .populate('owner')
  .populate('reviews')
  .then(deck => {
    DeckReview.find({_id: {$in: deck.reviews}})
    .populate('owner')
    .then(deckReviews => {
      res.render(`decks/show`, {
        title: `${deck.name}`,
        cardObjs,
        deck,
        deckReviews
      })
    })
  })
  .catch(err => {
    console.log('+++ decks controller show function +++',err)
    res.redirect("/decks")
  })
}

function create(req, res){
  req.body.owner = req.user.profile._id
  Profile.findById(req.user.profile._id)
  .then(profile => {
    Deck.create(req.body)
    .then(deck => {
      profile.decks.push(deck)
      profile.save()
      res.redirect(`/decks/${deck._id}/edit`)
    })
    .catch(err => {
      console.log(err)
      res.redirect("/decks")
    })
  })
}

function edit(req, res) {
  cardObjs = []
  Deck.findById(req.params.id)
  .then(deck => {
    if(res.req.query && (res.req.query.searchCard != '' || res.req.query.searchCard)) { 
      let apiUrl = `https://api.magicthegathering.io/v1/cards?${res.req.query.searchType}=${res.req.query.searchCard}`

      
      fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        data.cards.forEach(card => {
          let cardObj = {}
          cardObj.name = card.name
          cardObj.imageUrl = card.imageUrl
          cardObj.multiverseid = card.multiverseid
          cardObjs.push(cardObj)
        })
      })
      .then(() => {
        DeckReview.find({_id: {$in: deck.reviews}})
        .then(deckReviews => {
          res.render(`decks/edit`, {
            title: `${deck.name}`,
            cardObjs,
            deck,
            deckReviews
          })
        })
      })
      .catch(error => console.log('::: ERROR :::', error))

    } else {
      res.render(`decks/edit`, {
        title: `${deck.name}`,
        cardObjs,
        deck
      })
    }
  })
}

function update(req, res) {
  Deck.findById(req.params.id)
  .then(deck => {
    if(deck.owner.equals(req.user.profile._id)) {
      deck.deckList.push(req.body.multiverseid)
      deck.save()
      res.redirect(`/decks/${req.params.id}/edit`)
    } else {
      throw new Error(" --- NOT AUTHORIZED --- ")
    }
  })
  .catch(err => {
    console.log("the error:", err)
    res.redirect(`/decks/${req.params.id}/edit`)
  })
}

function deleteDeck(req, res) {
  console.log('+++ DELETE DECK +++')
  Deck.findById(req.params.id)
  .then(deck => {
    if(deck.owner.equals(req.user.profile._id)) {
      deck.delete()
      .then(() => {
        res.redirect(`/decks`)
      })
    } else {
      throw new Error ('NOT AUTHORIZED')
    }
  })
  .catch(err => {
    console.log("the error:", err)
    res.redirect(`/decks`)
  })
}

export {
  index,
  newDeck as new,
  edit,
  update,
  create,
  show,
  deleteDeck as delete
}