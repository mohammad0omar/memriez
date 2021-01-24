'use strict'
const Gift = use('App/Models/Gift');
const User = use('App/Models/User');
const Card = use('App/Models/Card');

class GiftController {
    async index ({ request,auth, response }) {
            try {
                let gifts;
                if (auth.user instanceof User) {        
                    const user = await User.find(auth.user.id)
                     gifts = await user
                        .gifts()
                        .fetch() 
                  }
                  else {
                    gifts = await Gift.query().fetch();
                  }
                return response.json({
                    status: 'success',
                    data: gifts
                })
            } catch (error) {
                return response.status(404).json({
                    status: 'error',
                    message: 'Error getting all gifts'
                })
            }
    }
    async show ({ params, response }) {
        const giftData = params
            try {
                let gift = await Gift.query()
                    .where('nfc_id', giftData.nfc_id)
                    .firstOrFail()

                const cards = await Card.query()
                .where('gift_id', gift.id)
                .fetch();

                gift['cards'] = cards;
                
                return response.json({
                    status: 'success',
                    data: gift
                })
            } catch (error) {
                return response.status(404).json({
                    status: 'error',
                    message: 'Gift not found'
                })
            }
    }
    async store ({ request,auth, response }) {
        let giftData = request.only(['nfc_id','name','password']);
        const user = auth.current.user
        giftData['user_id'] = user.id;
            try {
                const gift = await Gift.create(giftData)
                return response.json({
                    status: 'success',
                    message: 'New gift added',
                    data: gift
                })
            } catch (error) {
                return response.status(404).json({
                    status: 'error',
                    message: 'Gift cannot be added, an error occured'
                })
            }
    }
}

module.exports = GiftController
