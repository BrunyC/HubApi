export const Validator = {
    exceptionFactory(validationExceptions) {
        validationExceptions.forEach((value) => {
            if(value.constraints){
                return value.constraints
            } 
        })
    }
}