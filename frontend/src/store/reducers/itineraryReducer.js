import {
   ITINERARY_LIST_REQUEST,
   ITINERARY_LIST_SUCCESS,
   ITINERARY_LIST_FAIL,
   ITINERARY_FORM_REQUEST,
   NEW_ITINERARY_SUCCESS,
   NEW_ITINERARY_FAIL,
   ADD_TRANSPORT_FAIL,
   ADD_TRANSPORT_SUCCESS,
   ADD_ACCOMMODATION_SUCCESS,
   ADD_ACCOMMODATION_FAIL,
   ADD_DAILY_ITINERARY_FAIL,
   ADD_DAILY_ITINERARY_SUCCESS,
   CREATED_ITINERARY_SUCCESS,
   GET_CREATED_ITINERARY_REQUEST,
   GET_CREATED_ITINERARY_SUCCESS,
   GET_CREATED_ITINERARY_FAIL,
   ITINERARY_WAS_COMPLETED_SUCCESS,
   ITINERARY_WAS_COMPLETED_FAIL,
   RESET_NEW_ITINERARY,
   ITINERARY_DETAIL_REQUEST,
   ITINERARY_DETAIL_SUCCESS,
   ITINERARY_DETAIL_FAIL,
   REMOVE_TRANSPORT_SUCCESS,
   REMOVE_TRANSPORT_FAIL,
   REMOVE_ACCOMMODATION_SUCCESS,
   REMOVE_ACCOMMODATION_FAIL,
   REMOVE_DAILY_ITINERARY_SUCCESS,
   REMOVE_DAILY_ITINERARY_FAIL,
   USER_ITINERARY_DETAIL_REQUEST,
   USER_ITINERARY_DETAIL_SUCCESS,
   USER_ITINERARY_DETAIL_FAIL
} from '../constants/itineraryConstants';

const initialStateItineraryDetail = {
   itinerary: {
      location: [],
      transport: [],
      accommodation: [],
      dailyItinerary: [],
      user: {}
   }
}

export const listItineraryReducer = (state = {itineraries: []}, action) => {
   switch (action.type) {
      case ITINERARY_LIST_REQUEST:
         return { loading: true, itineraries: [] }
      case ITINERARY_LIST_SUCCESS:
         return { loading: false, itineraries: action.payload}
      case ITINERARY_LIST_FAIL:
         return { loading: false, error: action.payload };
      default:
         return state;
   }
} 

export const itineraryDetailReducer = (state = initialStateItineraryDetail, action) => {
   switch (action.type) {
      case ITINERARY_DETAIL_REQUEST:
         return { loading: true, ...state };
      case ITINERARY_DETAIL_SUCCESS:
         return { loading: false, itinerary: action.payload};
      case ITINERARY_DETAIL_FAIL:
         return { loading: false, error: action.payload};
      default:
         return state;
   }
}

export const useritineraryDetailReducer = (state = initialStateItineraryDetail, action) => {
   switch (action.type) {
      case USER_ITINERARY_DETAIL_REQUEST:
         return { loading: true, ...state };
      case USER_ITINERARY_DETAIL_SUCCESS:
         return { loading: false, itinerary: action.payload};
      case USER_ITINERARY_DETAIL_FAIL:
         return { loading: false, error: action.payload};
      default:
         return state;
   }
}
export const newItineraryFormReducer = (state = {}, action) => {
   switch (action.type) {
      case ITINERARY_FORM_REQUEST:
         return { loading: true };
      case NEW_ITINERARY_SUCCESS:
         return { loading: false, successNewItinerary: true };
      case NEW_ITINERARY_FAIL:
         return { loading: false, errorNewItineary: action.payload};
      case ADD_TRANSPORT_SUCCESS:
         return { loading: false, successTransport: true };
      case ADD_TRANSPORT_FAIL:
         return {loading: false, errorTransport: action.payload};
      case REMOVE_TRANSPORT_SUCCESS:
         return { loading: false, successTransport: true };
      case REMOVE_TRANSPORT_FAIL:
         return {loading: false, errorTransport: action.payload};
      case ADD_ACCOMMODATION_SUCCESS:
         return {loading: false, successAccommodation: true };
      case ADD_ACCOMMODATION_FAIL:
         return {loading: false, errorAccommodation: action.payload};
      case REMOVE_ACCOMMODATION_SUCCESS:
            return {loading: false, successAccommodation: true };
      case REMOVE_ACCOMMODATION_FAIL:
            return {loading: false, errorAccommodation: action.payload};
      case ADD_DAILY_ITINERARY_SUCCESS:
         return {loading: false, successDailyItinerary: true }
      case ADD_DAILY_ITINERARY_FAIL: 
         return {loading: false, errorDailyItinerary: action.payload};
      case REMOVE_DAILY_ITINERARY_SUCCESS:
         return {loading: false, successDailyItinerary: true }
      case REMOVE_DAILY_ITINERARY_FAIL: 
         return {loading: false, errorDailyItinerary: action.payload};
      case ITINERARY_WAS_COMPLETED_SUCCESS: 
         return {loading: false, completedItinerarySuccess: true};
      case ITINERARY_WAS_COMPLETED_FAIL: 
         return {loading: false, completedItineraryError: action.payload}
      case RESET_NEW_ITINERARY:
            return state
      default:
         return state;
   }
}

export const newItineraryReducer = (state = {}, action) => {
   switch (action.type) {
      case CREATED_ITINERARY_SUCCESS:
         return { itinerary: action.payload };
      case RESET_NEW_ITINERARY:
         return { itinerary: null }
      default:
         return state;
   }
}

export const newItineraryCompleteReducer = (state = {}, action) => {
   switch (action.type) {
      case GET_CREATED_ITINERARY_REQUEST:
         return { loading: true };
      case GET_CREATED_ITINERARY_SUCCESS:
         return { loading: false, success: true, itinerary: action.payload};
      case GET_CREATED_ITINERARY_FAIL:
         return { loading: false, error: action.payload};
      case RESET_NEW_ITINERARY:
            return {itinerary: null}
      default:
         return state;
   }
}


