import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
// import { useQuery } from 'react-query';
import ProfileIcon from './ProfileIcon';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';

import Auth from '../utils/auth';

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  function formatName(user) {
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!')
    console.log(user.userName);
    return user.userName
  };
  
  const user = {
    userName: 'Harry',
  };

  return (
    <>
      <Navbar bg='dark' variant='dark' expand='lg' className='flex justify-end'>
        <Container fluid>
            <Navbar.Brand as={Link} to='/'>
              Lmao
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='navbar' />
            <Navbar.Collapse id='navbar' className='d-flex flex-row-reverse'>
              <Nav className='me-auto'>
                <Nav.Link as={Link} to='/'>
                  heyo
                </Nav.Link>
                {/* if user is logged in show saved books and logout */}
                {/* {Auth.loggedIn() && */}
                <Nav.Link href="#profile">
                  <h4>
                    Welcome, {formatName(user)}!
                    <ProfileIcon />
                  </h4>
                </Nav.Link>
                {/* } */}
                {Auth.loggedIn() ? (
                  <>
                    <Nav.Link as={Link} to='/saved'>
                      wayo
                    </Nav.Link>
                    <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                  </>
                ) : (
                  <Nav.Link onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* set modal data up */}
      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default AppNavbar;
