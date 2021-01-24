'use strict'
const Helpers = use('Helpers');

class FileController {
    async upload_image ({ request ,auth , response }) {
        const image = request.file('image', {
            types: ['image'],
            size: '2mb'
          })
        
          await image.move(Helpers.tmpPath('uploads'), {
            name: `${new Date().getTime()}.${image.subtype}`,
            overwrite: true
          })
        
          if (!image.moved()) {
            response.status(500).json({
                status: 'error',
                message: 'An error occured while uploding',
                data: image.error()
            })
          }
          return response.json({
            status: 'success',
            message: 'Image Uploaded',
            image_name: image.fileName
        });
    }
}

module.exports = FileController
