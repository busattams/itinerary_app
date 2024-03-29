import { 
   USER_LOGIN_REQUEST,
   USER_LOGIN_SUCCESS,
   USER_LOGIN_FAIL,
   USER_LOGOUT,
   USER_REGISTER_REQUEST,
   USER_REGISTER_FAIL,
} from '../constants/userConstants';
import axios from 'axios';
import { RESET_NEW_ITINERARY } from '../constants/itineraryConstants';

// const url = 'http://localhost:3001/api';
const url = '/api';

const config = {
   headers: {
      'Content-Type': 'application/json'
   }
}

export const register = (name, email, password) => async (dispatch) => {
   try {
      dispatch({type: USER_REGISTER_REQUEST});

      const { data } = await axios.post(
         `${url}/users`, 
         {name, email, password}, 
         config
      );

      dispatch({
         type: USER_LOGIN_SUCCESS,
         payload: data
      });
      localStorage.setItem('userInfo', JSON.stringify(data))

   } catch (error) {
      dispatch({
         type: USER_REGISTER_FAIL,
         payload: error.response && 
            error.response.data.message ? error.response.data.message : 
            error.message
      })
   }
}

export const login = (email, password) => async (dispatch) => {
   try {
      dispatch({type: USER_LOGIN_REQUEST});

      const { data } = await axios.post(
         `${url}/users/login`,
         {email, password}, 
         config
      );

      dispatch({
         type: USER_LOGIN_SUCCESS,
         payload: data
      });

      localStorage.setItem('userInfo', JSON.stringify(data))

   } catch (error) {
      dispatch({
         type: USER_LOGIN_FAIL,
         payload: error.response && 
            error.response.data.message ? error.response.data.message : 
            error.message
      })
   }
}

export const logout = () => (dispatch) => {
   localStorage.removeItem('newItinerary');
   localStorage.removeItem('newItineraryComplete');
   dispatch({type: RESET_NEW_ITINERARY});
   localStorage.removeItem('userInfo');
   dispatch({type: USER_LOGOUT});
}


