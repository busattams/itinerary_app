import React from 'react';
// import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
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
   <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
      <Container>
         <LinkContainer to="/">
            <Navbar.Brand>Roteiros</Navbar.Brand>
         </LinkContainer>
         <Navbar.Toggle aria-controls="basic-navbar-nav" />
         <Navbar.Collapse id="basic-navbar-nav" >
            <Nav className="ms-auto">
               <LinkContainer to='/'>
                  <Nav.Link ><i className="fas fa-home"></i>Home</Nav.Link>
               </LinkContainer>
               <LinkContainer to='/cadastro'>
                  <Nav.Link ><i className="fas fa-home"></i>Cadastre</Nav.Link>
               </LinkContainer>
              
               {userInfo ? (
                  <NavDropdown title={`Hello, ${userInfo.name}`} id='username'>
                     <LinkContainer to='/profile'>
                        <NavDropdown.Item> My Profile</NavDropdown.Item>
                     </LinkContainer>
                     <NavDropdown.Item onClick={logoutHandler} className='border-top mt-3 pt-2'>Logout</NavDropdown.Item>
                  </NavDropdown>
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

