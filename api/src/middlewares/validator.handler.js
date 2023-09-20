const boom = require('@hapi/boom');

function ValidatorHandler(schema, property){
    return (res, req, next)=>{
        const date = req[property];
        const { error } = schema.validate( date, { abortEarly: false})
        if(error){
            next(boom.badRequest(error))
        }
        next()
    }
}

module.exports = {
    ValidatorHandler
}