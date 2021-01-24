'use strict'
const CardType = use('App/Models/CardType')

class CardTypeController {

    async index ({ request, response }) {
        try {
            let types;
            types = await CardType.query().fetch() 
            return response.json({
                status: 'success',
                data: types
            })
        } catch (error) {
            return response.status(404).json({
                status: 'error',
                message: 'Error getting all card types'
            })
        }
    }

    async store ({ request, response }) {
        const typeData = request.only(['type']);
            try {
                const type = await CardType.create(typeData)
                return response.json({
                    status: 'success',
                    message: 'New type added',
                    data: type

                })
            } catch (error) {
                return response.status(404).json({
                    status: 'error',
                    message: 'Failed to add a new type'
                })
            }
        }
}

module.exports = CardTypeController
