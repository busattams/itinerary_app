import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './views/components/Header';
import Footer from './views/components/Footer';
import HomeScreen from './views/Home/HomeScreen';
import UserItinerary from './views/Home/UserItinerary';
import LoginScreen from './views/LoginScreen';
import RegisterScreen from './views/RegisterScreen';
import CadastroScreen from './views/CadastroScreen';
import ItinerariesScreen from './views/itinerary/ItinerariesScreen';

const App = () => (
  <Router>
    <Header />
    <main>
        <Route path='/' component={HomeScreen} exact />
        <Route path='/login' component={LoginScreen} exact  />
        <Route path='/cadastro' component={CadastroScreen} exact  />
        <Route path='/register' component={RegisterScreen} exact  />
        <Route path='/profile' component={UserItinerary} exact  />
        <Route path='/roteiros/:id' component={ItinerariesScreen}  />
    </main>
    <Footer />
  </Router>
);


export default App;
