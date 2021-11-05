import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row } from 'react-bootstrap';
import Accomodation from './formSteps/Accomodation';
import InitialSetUp from './formSteps/InitialSetUp'
import Transport from './formSteps/Transport';
import Days from './formSteps/Days';
import { MESSAGE_LOGIN } from '../store/constants/userConstants';

const CadastroScreen = ({history}) => {

   const dispatch = useDispatch();

   const userLogin = useSelector(state => state.userLogin);
   const { userInfo } = userLogin;

   const { itinerary } = useSelector(state => state.newItineraryComplete);

   let currentStep;

   if(itinerary) {
      currentStep =  itinerary.accommodation.length > 0 ? 4 : 
      itinerary.transport.length > 0 ? 3 : 2;
   } else {
      currentStep = 1;
   }

   const [ step, setStep ] = useState(currentStep);

   useEffect(() => {
      if(!userInfo) {
         dispatch({type: MESSAGE_LOGIN});
         history.push('/login')
      }
    
   }, [history, userInfo, dispatch ])


   return (
      <Container>
         <Row>
            <Col lg={8} className='mx-auto mt-5'>
               <ul id="progressbar">
                  <li className='active'>Início</li>
                  <li className={step > 1 ? 'active' : ''}>Transporte</li>
                  <li className={step > 2 ? 'active' : ''}>Hospedagem</li>
                  <li className={step > 3 ? 'active' : ''}>Roteiro Dia-a-Dia</li>
               </ul>
            </Col>
            {
               {
                  1:<InitialSetUp setStep={setStep} />,
                  2:<Transport setStep={setStep} />,
                  3:<Accomodation setStep={setStep} />,
                  4:<Days setStep={setStep} history={history} />
               }[step]
            }
         </Row>
      </Container>

   )
}


export default CadastroScreen;