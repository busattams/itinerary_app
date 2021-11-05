import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './views/components/Header';
import Footer from './views/components/Footer';
import HomeScreen from './views/Home/HomeScreen';
import LoginScreen from './views/LoginScreen';
import RegisterScreen from './views/RegisterScreen';
import CadastroScreen from './views/CadastroScreen';
import ItinerariesScreen from './views/itinerary/ItinerariesScreen';
import TestesScreen from './views/TestesScreen';

const App = () => (
  <Router>
    <Header />
    <main>
        <Route path='/' component={HomeScreen} exact />
        <Route path='/login' component={LoginScreen} exact  />
        <Route path='/cadastro' component={CadastroScreen} exact  />
        <Route path='/register' component={RegisterScreen} exact  />
        <Route path='/roteiros/:id' component={ItinerariesScreen}  />
        <Route path='/testes' component={TestesScreen} exact  />
    </main>
    <Footer />
  </Router>
);


export default App;
