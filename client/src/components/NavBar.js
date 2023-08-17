import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
// import { useMutation, useQuery } from '@apollo/client';
// import { QUERY_SINGLE_USER } from '../utils/queries';
// import { useParams } from 'react-router-dom';
import ProfileIcon from './ProfileIcon';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';

import Auth from '../utils/auth';

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  let curentUserData = ''
  // const { userId } = useParams()

  // const { loading, data } = useQuery(QUERY_SINGLE_USER, {
  //   variables: { id: userId }
  // })

  // console.log(user)
  // const user = data.user || {}


  // function formatName(user) {
  //   console.log(user.userName);

  //   return user.userName
  // };

  // const user = {
  //   userName: 'Harry',
  // };

  return (
    <>
      <Navbar className="bg-blue-500 flex justify-between">
        <Container fluid>
          <Navbar.Brand className="text-white">
            {Auth.loggedIn() ? (
              <Nav.Link as={Link} to={'/user/'}>
                <h1 className='text-white'>
                  Welcome To Hydruh, {Auth.getProfile().username}
                  <ProfileIcon />
                </h1>
              </Nav.Link>
            ) : (
              <h1 className="text-white">Welcome To Hydruh</h1>
            )}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar" />
          <Navbar.Collapse id="navbar" className="d-flex flex-row-reverse">
            <div className=''>
              <Nav className="grid grid-cols-2 gap-x-1 p-2">
                <Nav.Link className="text-white" as={Link} to="/">
                  Home page
                </Nav.Link>
                {Auth.loggedIn() ? (
                  <>
                    <Nav.Link className="text-white" onClick={Auth.logout}>
                      Logout
                    </Nav.Link>
                  </>
                ) : (
                  <Nav.Link
                    className="text-white"
                    onClick={() => setShowModal(true)}
                  >
                    Login/Sign Up
                  </Nav.Link>
                )}
              </Nav>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Modal
        size="lg"
        show={showModal}
        onHide={() => setShowModal(false)}
        className="flex border border-blue-500 absolute top-[300px] left-1/3 round-lg bg-white w-1/3"
        aria-labelledby="signup-modal"
      >
        <div className="">
          <Tab.Container defaultActiveKey="login">
            <Modal.Header closeButton>
              <Modal.Title id="signup-modal">
                <Nav className="flex border rounded-lg overflow-hidden">
                  <Nav.Item>
                    <Nav.Link eventKey="login"></Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="signup"></Nav.Link>
                  </Nav.Item>
                </Nav>
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Tab.Content className='max-w-12 flex items-center justify-evenly'>
                <Tab.Pane eventKey="login">
                  <LoginForm className='py-12' handleModalClose={() => setShowModal(false)} />
                </Tab.Pane>
                <Tab.Pane eventKey="signup">
                  <SignUpForm className='py-12' handleModalClose={() => setShowModal(false)} />
                </Tab.Pane>
              </Tab.Content>
            </Modal.Body>

          </Tab.Container>
        </div>
      </Modal>
    </>
  );
};

export default AppNavbar;
