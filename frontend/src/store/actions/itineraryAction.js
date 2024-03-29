import {
   ITINERARY_LIST_REQUEST,
   ITINERARY_LIST_SUCCESS,
   ITINERARY_LIST_FAIL,
   ITINERARY_FORM_REQUEST,
   NEW_ITINERARY_SUCCESS,
   NEW_ITINERARY_FAIL,
   ADD_TRANSPORT_SUCCESS,
   ADD_TRANSPORT_FAIL,
   ADD_ACCOMMODATION_SUCCESS,
   ADD_ACCOMMODATION_FAIL,
   ADD_DAILY_ITINERARY_SUCCESS,
   ADD_DAILY_ITINERARY_FAIL,
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
import axios from 'axios';


// const url = 'http://localhost:3001/api';
const url = '/api';


export const listItineraries = () => async (dispatch) => {
   try {
      dispatch({type: ITINERARY_LIST_REQUEST});
      const { data } = await axios.get(`${url}/itinerary`);
      dispatch({
         type: ITINERARY_LIST_SUCCESS,
         payload: data
      });
   } catch (error) {
      dispatch({
         type: ITINERARY_LIST_FAIL,
         payload: error.response && 
            error.response.data.message ? error.response.data.message : 
            error.message
      })
   }
}

export const listItineraryDetail = (id) => async (dispatch) => {
   try {
      dispatch({type: ITINERARY_DETAIL_REQUEST});
      const { data } = await axios.get(`${url}/itinerary/${id}`);
      dispatch({
         type: ITINERARY_DETAIL_SUCCESS,
         payload: data
      });
   } catch (error) {
      dispatch({
         type: ITINERARY_DETAIL_FAIL,
         payload: error.response && 
            error.response.data.message ? error.response.data.message : 
            error.message
      })
   }
}

export const listUserItineraryDetail = (id) => async (dispatch, getState) => {
   try {
      dispatch({type: USER_ITINERARY_DETAIL_REQUEST});

      const { userLogin: { userInfo } } = getState();
      
      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`
         },
      }
      const { data } = await axios.get(
         `${url}/itinerary/user/${id}`,
         config
      );

      dispatch({
         type: USER_ITINERARY_DETAIL_SUCCESS,
         payload: data
      });
   } catch (error) {
      dispatch({
         type: USER_ITINERARY_DETAIL_FAIL,
         payload: error.response && 
            error.response.data.message ? error.response.data.message : 
            error.message
      })
   }
}


export const newItinerary = (itinerary) => async (dispatch, getState) => {
   try {
      dispatch({type: ITINERARY_FORM_REQUEST});
      const { userLogin: { userInfo } } = getState();
         const config = {
            headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${userInfo.token}`
            },
         }
         const { data } = await axios.post(
            `${url}/itinerary`,
            itinerary,
            config
         );

         dispatch({type: NEW_ITINERARY_SUCCESS});

         dispatch({
            type: CREATED_ITINERARY_SUCCESS,
            payload: data
         })
         dispatch({
            type: GET_CREATED_ITINERARY_SUCCESS,
            payload: data
         })

         localStorage.setItem('newItinerary', JSON.stringify(data))
         localStorage.setItem('newItineraryComplete', JSON.stringify(data))

      } catch (error) {
         dispatch({
            type: NEW_ITINERARY_FAIL,
            payload: error.response && 
               error.response.data.message ? error.response.data.message : 
               error.message
         });
      }
}

export const getCreatedItinerary = (id) => async (dispatch, getState) => {
   try {
      dispatch({type: GET_CREATED_ITINERARY_REQUEST});
      const { userLogin: { userInfo } } = getState();
         const config = {
            headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${userInfo.token}`
            },
         }
         const { data } = await axios.get(
            `${url}/itinerary/${id}/edit`,
            config
         );

         dispatch({
            type: GET_CREATED_ITINERARY_SUCCESS,
            payload: data
         });
         
         localStorage.setItem('newItineraryComplete', JSON.stringify(data))

      } catch (error) {
         dispatch({
            type: GET_CREATED_ITINERARY_FAIL,
            payload: error.response && 
               error.response.data.message ? error.response.data.message : 
               error.message
         })
      }
}

export const addTransport = (id, transport) => async (dispatch, getState) => {
   try {
      dispatch({type: ITINERARY_FORM_REQUEST});
      const { userLogin: { userInfo } } = getState();

      const config = {
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
         },
      }
      await axios.post(
         `${url}/itinerary/${id}/transport`,
         transport,
         config
      );

      dispatch({ type: ADD_TRANSPORT_SUCCESS });

   } catch (error) {
      dispatch({
         type: ADD_TRANSPORT_FAIL,
         payload: error.response && 
            error.response.data.message ? error.response.data.message : 
            error.message
      })
   }
}

export const deleteTransport = (id, idtransport) => async (dispatch, getState) => {
   try {
      dispatch({type: ITINERARY_FORM_REQUEST});
      const { userLogin: { userInfo } } = getState();
      
      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`
         },
      }
      await axios.delete(
         `${url}/itinerary/${id}/transport/${idtransport}`,
         config
      );

      dispatch({ type: REMOVE_TRANSPORT_SUCCESS });

   } catch (error) {
      dispatch({
         type: REMOVE_TRANSPORT_FAIL,
         payload: error.response && 
            error.response.data.message ? error.response.data.message : 
            error.message
      })
   }
}

export const addAccommodation = (id, accommodation) => async (dispatch, getState) => {
      try {
         dispatch({type: ITINERARY_FORM_REQUEST});
         const { userLogin: { userInfo } } = getState();
         const config = {
            headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${userInfo.token}`
            },
         }
     await axios.post(
         `${url}/itinerary/${id}/accommodation`,
         accommodation,
         config
      );
      
      dispatch({ type: ADD_ACCOMMODATION_SUCCESS});
      
   } catch (error) {
      dispatch({
         type: ADD_ACCOMMODATION_FAIL,
         payload: error.response && 
            error.response.data.message ? error.response.data.message : 
            error.message
      })
   }
}

export const deleteAccommodation = (id, idaccommodation) => async (dispatch, getState) => {
   try {
      dispatch({type: ITINERARY_FORM_REQUEST});
      const { userLogin: { userInfo } } = getState();
      
      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`
         },
      }
      await axios.delete(
         `${url}/itinerary/${id}/accommodation/${idaccommodation}`,
         config
      );

      dispatch({ type: REMOVE_ACCOMMODATION_SUCCESS });

   } catch (error) {
      dispatch({
         type: REMOVE_ACCOMMODATION_FAIL,
         payload: error.response && 
            error.response.data.message ? error.response.data.message : 
            error.message
      })
   }
}

export const addDayItinerary = (id, dayDescription) => async (dispatch, getState) => {
   try {
      dispatch({type: ITINERARY_FORM_REQUEST});
      const { userLogin: { userInfo } } = getState();
      const config = {
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
         },
      }
      await axios.post(
         `${url}/itinerary/${id}/daily`,
         dayDescription,
         config
   );
   
   dispatch({ type: ADD_DAILY_ITINERARY_SUCCESS });


   } catch (error) {
      dispatch({
         type: ADD_DAILY_ITINERARY_FAIL,
         payload: error.response && 
            error.response.data.message ? error.response.data.message : 
            error.message
      })
   }
}

export const deleteDayItinerary = (id, iddaily) => async (dispatch, getState) => {
   try {
      dispatch({type: ITINERARY_FORM_REQUEST});
      const { userLogin: { userInfo } } = getState();
      
      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`
         },
      }
      await axios.delete(
         `${url}/itinerary/${id}/daily/${iddaily}`,
         config
      );

      dispatch({ type: REMOVE_DAILY_ITINERARY_SUCCESS });

   } catch (error) {
      dispatch({
         type: REMOVE_DAILY_ITINERARY_FAIL,
         payload: error.response && 
            error.response.data.message ? error.response.data.message : 
            error.message
      })
   }
}

export const itineraryCompleted = (id) => async (dispatch, getState) => {
   try {
      dispatch({type: ITINERARY_FORM_REQUEST});
      const { userLogin: { userInfo } } = getState();
      const config = {
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
         },
      }
      await axios.patch(
         `${url}/itinerary/${id}/completed`,
         {},
         config
   );

   dispatch({ type: ITINERARY_WAS_COMPLETED_SUCCESS });
   dispatch({type: RESET_NEW_ITINERARY});
   localStorage.removeItem('newItinerary');
   localStorage.removeItem('newItineraryComplete');

   } catch (error) {
      dispatch({
         type: ITINERARY_WAS_COMPLETED_FAIL,
         payload: error.response && 
            error.response.data.message ? error.response.data.message : 
            error.message
      })
   }
}