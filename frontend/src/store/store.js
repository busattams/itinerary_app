import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userReducers } from './reducers/userReducer';
import { 
   listItineraryReducer, 
   newItineraryReducer, 
   newItineraryFormReducer, 
   newItineraryCompleteReducer,
   itineraryDetailReducer
 } from './reducers/itineraryReducer';


const reducer = combineReducers({
   userLogin: userReducers,
   itineraryList: listItineraryReducer,
   itineraryDetail: itineraryDetailReducer,
   newItinerary: newItineraryReducer,
   newItineraryFormInfo: newItineraryFormReducer,
   newItineraryComplete: newItineraryCompleteReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo') ?
   JSON.parse(localStorage.getItem('userInfo')) : null;

const newItinarayFromStorage = localStorage.getItem('newItinerary') ?
   JSON.parse(localStorage.getItem('newItinerary')) : null;

const completeNewItinarayFromStorage = localStorage.getItem('newItineraryComplete') ?
   JSON.parse(localStorage.getItem('newItineraryComplete')) : null;

const initialState = {
   userLogin: { userInfo: userInfoFromStorage, messageLogin: '' },
   itineraryList: {itineraries: []},
   newItinerary: {itinerary: newItinarayFromStorage},
   newItineraryComplete: {itinerary: completeNewItinarayFromStorage},
};
const middleware = [thunk];


const store = createStore(reducer, initialState, 
   composeWithDevTools(applyMiddleware(...middleware))
);


export default store;