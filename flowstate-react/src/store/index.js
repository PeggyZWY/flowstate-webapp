import { createStore, compose } from 'redux';
import reducer from './reducer';
import * as actionCreators from './actionCreators';
import * as constants from './constants';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers());

export { store, reducer, actionCreators, constants };