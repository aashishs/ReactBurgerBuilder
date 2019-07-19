import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
    it('shoudl return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: null,
            authRedirectPath: '/'
        });
    });

    it('should store the toke upon login', () => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: null,
            authRedirectPath: '/'
        }, { 
            type: actionTypes.AUTH_SUCCESS, 
            idToken: 'some-token',
            userId: 'some-user-id'
        })).toEqual({
            token: 'some-token',
            userId: 'some-user-id',
            error: false,
            loading: false,
            authRedirectPath: '/'
        });
    })
});