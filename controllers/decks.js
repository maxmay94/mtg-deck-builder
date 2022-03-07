import { Deck } from '../models/deck.js'
import fetch from 'node-fetch'

const findCard = 'cards?name='
// let searchTerm
// let apiUrl = `https://api.magicthegathering.io/v1/${findCard}${searchTerm}`
let picUrl

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
  if(res.req.query && res.req.query.search != '') {

    console.log('----------------------------------------')
    let searchTerm = res.req.query.search
    let apiUrl = `https://api.magicthegathering.io/v1/${findCard}${searchTerm}`
    console.log("::: QUERY ::: ", res.req.query.search)
    console.log(apiUrl)
    search(apiUrl)
    console.log('::: picUrl :::', picUrl)
  }

  res.render('decks/new', {
    title: 'New Deck',
    pic: picUrl
  })
  console.log('2')
}

function search(apiUrl) {
  fetch(apiUrl)
  .then(response => response.json())
  .then(data => picUrl = data.cards[0].imageUrl)
  .catch(error => console.log('::: SEARCH ERROR :::', error))
}

export {
  index,
  newDeck as new,
  search
}