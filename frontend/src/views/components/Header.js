import React from 'react';
// import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { logout } from '../../store/actions/userActions'

const Header = ({history}) => {

   const dispatch = useDispatch();

   const { userInfo } = useSelector(state => state.userLogin);

   const logoutHandler = () => {
      dispatch(logout())
      history.push('/login')
   }
   return (
   <header>
   <Navbar expand="md" collapseOnSelect>
      <Container>
         <LinkContainer to="/">
            <Navbar.Brand>Roteiros</Navbar.Brand>
         </LinkContainer>
         <Navbar.Toggle aria-controls="basic-navbar-nav" />
         <Navbar.Collapse id="basic-navbar-nav" >
            <Nav className="ms-auto">
               <LinkContainer to='/'>
                  <Nav.Link >Início</Nav.Link>
               </LinkContainer>
               <LinkContainer to='/cadastro'>
                  <Nav.Link >Cadastre</Nav.Link>
               </LinkContainer>
              
               {userInfo ? (
                  <>
                     <LinkContainer to='/profile'>
                        <Nav.Link> Meus Roteiros</Nav.Link>
                     </LinkContainer>
                     <Nav.Link onClick={logoutHandler}>Sair <i className="fas fa-sign-out-alt ms-1"></i></Nav.Link>
                  </>
               ) : 
               <LinkContainer to="/login">
                  <Nav.Link><i className="fas fa-user"></i>Entre</Nav.Link>
               </LinkContainer>
               }
               
            </Nav>
         </Navbar.Collapse>
      </Container>
   </Navbar>
   </header>
);
};

export default withRouter(Header);

