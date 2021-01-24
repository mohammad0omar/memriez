'use strict'
const User = use('App/Models/User');

class UserController {
    // add to the top of the file

async signup ({ request, auth, response }) {
    // get user data from signup form
    const userData = request.only(['username', 'email', 'password'])

    try {
        // save user to database
        const user = await User.create(userData);
        // generate JWT token for user
        const token = await auth.generate(user);

        return response.json({
            status: 'success',
            data: token
        })
    } catch (error) {
        return response.status(400).json({
            status: 'error',
            message: 'There was a problem creating the user, please try again later.'
        })
    }
}

async login ({ request, auth, response }) {
    try {
        // validate the user credentials and generate a JWT token
        const token = await auth
        // .withRefreshToken()
        .attempt(
            request.input('email'),
            request.input('password')
        )

        return response.json({
            status: 'success',
            data: token
        })
    } catch (error) {
        response.status(400).json({
            status: 'error',
            message: 'Invalid email/password'+ error
        })
    }
}

async me ({ auth, response }) {
    const user = await User.query()
        .where('id', auth.current.user.id)
        .with('gifts', builder => {
            builder.with('user')
        })
        .firstOrFail()

    return response.json({
        status: 'success',
        data: user
    })
}

}

module.exports = UserController
