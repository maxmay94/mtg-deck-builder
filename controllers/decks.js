import { Deck } from '../models/deck.js'
import fetch from 'node-fetch'

const findCard = 'cards?name='
let cardObjs = []

function index(req, res) {
  Deck.find({})
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

function editDeck(req, res) {
  console.log('----------------------------------------')
  cardObjs = []

  if(res.req.query && res.req.query.searchCard != '') { 
    let searchTerm = res.req.query.searchCard
    let apiUrl = `https://api.magicthegathering.io/v1/${findCard}${searchTerm}`

    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      data.cards.forEach(card => {
        let cardObj = {}
        // if(!cardObjs.includes(card.name)) {

          // if(!Object.values(cardObjs).includes(Object.values(card.name).join(''))) {

          cardObj.name = card.name
          cardObj.imageUrl = card.imageUrl
          cardObj.multid = card.multiverseid
          cardObjs.push(cardObj)

          //console.log(cardObj)
        // }
      })

    })
    .then(() => {
      res.render('decks/edit', {
        title: 'New Deck',
        cardObjs
      })
    })
    .catch(error => console.log('::: ERROR :::', error))
  } else {
    res.render('decks/edit', {
      title: 'Edit Deck',
      cardObjs
    })
  }
}

export {
  index,
  editDeck,
}