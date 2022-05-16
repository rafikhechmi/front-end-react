const initialState={
    userName:'',
    role:''
};

const authReducer = (state = initialState ,action)=>{
    switch(action.type){
        case 'login':
            return{
                ...state, userName : action.payload
            };
        case 'logout':
            return initialState;
        default:
            return state;
    }
}

export default authReducer;