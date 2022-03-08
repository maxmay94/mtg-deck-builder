import { Deck } from '../models/deck.js'
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

function show(req, res) {
  Deck.findById(req.params.id)
  .populate('owner')
  .then(deck => {
    console.log('### DECK.OWNER ###',deck.owner)
    res.render(`decks/show`, {
      title: `${deck.name}`,
      cardObjs,
      deck
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/decks")
  })
}

function create(req, res){
  console.log(req.body)
  req.body.owner = req.user.profile._id
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
  cardObjs = []
  Deck.findById(req.params.id)
  .then(deck => {
    console.log('::: deck._id :::', deck._id)

    if(res.req.query && res.req.query.searchCard != '') { 
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
        res.render(`decks/edit`, {
          title: `${deck.name}`,
          cardObjs,
          deck
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

export {
  index,
  newDeck as new,
  edit,
  update,
  create,
  show
}