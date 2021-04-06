export const updateObject = (oldObject, updatedStates) =>{
    return{
        ...oldObject,
        ...updatedStates
    };
};