'use strict'

class Base {
    async fails(errorMessages) {
      return this.ctx.response.json({ error: errorMessages });
    }
}

module.exports = Base
