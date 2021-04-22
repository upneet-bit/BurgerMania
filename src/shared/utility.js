export const updateObject = (oldObject, updatedStates) =>{
    return{
        ...oldObject,
        ...updatedStates
    };
};

export const checkValidity=(value, rules)=>{ 
    let isValid= true;
    if(rules){

        if(rules.required){
            isValid= value.trim() !== '' && isValid;
        }

        if(rules.minLength){
            isValid= value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength){
            isValid= value.length <= rules.maxLength && isValid;
        }

        if(rules.isEmail){
            const pattern =/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
            isValid = pattern.test(value) && isValid;
        }

        if(rules.isNumeric){
            const pattern= /^\d+$/;
            isValid = pattern.test(value) && isValid;
        }

    }
    return isValid;   
}