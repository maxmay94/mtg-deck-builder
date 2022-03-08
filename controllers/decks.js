import { Deck } from '../models/deck.js'
import fetch from 'node-fetch'

let cardObjs = []

function index(req, res) {
  Deck.find({})
  .then(decks => {
    res.render('decks/index', {
      decks,
      title: 'Decks'
    })
    console.log(decks)
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

function create(req, res){
  console.log(req.body)
  Deck.create(req.body)
  .then(deck => {
      res.redirect('/decks')
  })
  .catch(err => {
    console.log(err)
    res.redirect("/decks")
  })
}

function edit(req, res) {
  Deck.findById(req.params.id)
  .then(deck => {
    console.log('::: deck._id :::', deck._id)
    cardObjs = []

    if(res.req.query && res.req.query.searchCard != '') { 
      let apiUrl = `https://api.magicthegathering.io/v1/cards?${res.req.query.searchType}=${res.req.query.searchCard}`

      fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        data.cards.forEach(card => {
          let cardObj = {}
          cardObj.name = card.name
          cardObj.imageUrl = card.imageUrl
          cardObj.multid = card.multiverseid
          cardObjs.push(cardObj)
        })
      })
      .then(() => {
        res.render(`decks/edit`, {
          title: `${deck.name}`,
          cardObjs,
          deck
        })
      })
      .catch(error => console.log('::: ERROR :::', error))

    } else {
      res.render(`decks/edit`, {
        title: 'Edit Deck',
        cardObjs,
        deck
      })
    }
  })
}

function update(req, res) {
  console.log("ADD CARD TO DECK")
  console.log('------  req.body ------', req.body)
  Deck.findById(req.params.id)
  .then(deck => {

  })
}

export {
  index,
  newDeck as new,
  edit,
  update,
  create
}