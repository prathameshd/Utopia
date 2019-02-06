const Validator = require("validator");
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data){
    let errors = {};
    
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if(Validator.isEmpty(data.email)){
        errors.email = 'Email field is requied.'
    }
    
    if(!Validator.isEmail(data.name)){
        errors.email = 'Email is invalid.'
    }
    
    if(Validator.isEmpty(data.password)){
        errors.password = 'Password field is requied.'
    }
    

    return {
        errors,
        isValid: isEmpty(errors)
    };
};