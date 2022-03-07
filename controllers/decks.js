import { Deck } from '../models/deck.js'
import fetch from 'node-fetch'

const findCard = 'cards?name='
// let searchTerm
// let apiUrl = `https://api.magicthegathering.io/v1/${findCard}${searchTerm}`
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

function newDeck(req, res) {
  console.log('----------------------------------------')

  if(res.req.query && res.req.query.searchCard != '') { 
    console.log("::: QUERY ::: ", res.req.query.searchCard)
    let searchTerm = res.req.query.searchCard
    let apiUrl = `https://api.magicthegathering.io/v1/${findCard}${searchTerm}`
    console.log('::: apiUrl :::', apiUrl)
    search(apiUrl)
    cardObjs = []
  }
  
  res.render('decks/new', {
    title: 'New Deck',
    cardObjs
  })
}

function search(apiUrl) {
  fetch(apiUrl)
  .then(response => response.json())
  // .then(data => picUrl = data.cards[0].imageUrl)
  .then(data => {
    data.cards.forEach(card => {
      let cardObj = {}



      // let addCard = true
      // cardObjs.forEach(crdObj => {
      //   console.log(card.name, 'vs' ,crdObj.name)
      //   if(card.nam === crdObj.name) addCard = false
      // })


      // if(!cardObjs.includes(card.name)) {
        // if(addCard) {
        cardObj.name = card.name
        cardObj.imageUrl = card.imageUrl
        cardObj.multid = card.multiverseid
        cardObjs.push(cardObj)
      // }
    })
  })
  .catch(error => console.log('::: SEARCH ERROR :::', error))

  console.log('::: CARD OBJ :::', cardObjs)
}

export {
  index,
  newDeck as new,
  search
}