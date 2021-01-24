'use strict'

const Gift = use("App/Models/Gift");
const Card = use('App/Models/Card');
const User = use('App/Models/User');

class CardController {
    async index ({ params, auth, response }) {
        try {
            let cards;
            if (auth.user instanceof User) {        
                const gift = await Gift.find(params.gift_id)
                cards = await gift
                    .cards()
                    .fetch()
              }
              else {
                cards = await Gift.query().fetch();
              }
            return response.json({
                status: 'success',
                data: cards
            })
        } catch (error) {
            return response.status(404).json({
                status: 'error',
                message: 'Error getting all cards'
            })
        }
    }
    async store ({ request, response }) {
        let cardData = request.only(['title','card_type_id','gift_id','link']);
            try {
                const card = await Card.create(cardData)
                return response.json({
                    status: 'success',
                    message: 'New Card added',
                    data: card
                })
            } catch (error) {
                return response.status(404).json({
                    status: 'error',
                    message: 'Card cannot be added, an error occured'
                })
            }
    }
}

module.exports = CardController
