import reducer from "./auth";
import * as actionTypes from "../actions/actionTypes";

describe('auth Reducer',()=>{
    it('should return initial state', ()=>{
        expect(reducer(undefined, {})).toEqual({
            token : null,
            userId: null,
            error : null,
            loading: false,
            authRedirectPath: '/'
        })
    })

    it('should store token on login', ()=>{
        expect(reducer({
            token : null,
            userId: null,
            error : null,
            loading: false,
            authRedirectPath: '/'
        },{
            type: actionTypes.AUTH_SUCCESS,
            idToken: 'someToken',
            userId : 'someUserid' 
        })).toEqual({
            token : 'someToken',
            userId: 'someUserid',
            error : null,
            loading: false,
            authRedirectPath: '/'
        })
    })
} )