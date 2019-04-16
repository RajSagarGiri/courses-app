export default function courseReducer(state = [], action){
    switch(action.types){
        case "CREATE_COURSE":
            return [...state, {...action.course}];
        default:
            return state;
    }
};