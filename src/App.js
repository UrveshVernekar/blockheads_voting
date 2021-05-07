import 'regenerator-runtime/runtime'
import React, {useState} from 'react'
import { login, logout } from './utils'
import './global.css'
import './scss/AppStyles.scss'
import './scss/_App.scss'
import {Navbar, Nav, Container, Row, Col} from 'react-bootstrap'
import './css/VotingUtils.css'
import Subject from './Components/Subject'
import Candidate from './Components/Candidate'
import Eren from './assets/Eren.png'
import Ash from './assets/Ash-Ketchum.jpg'

import getConfig from './config'
const { networkId } = getConfig(process.env.NODE_ENV || 'development')

export default function App() {

  const [buttonState, changeButtonState] = useState(true);

  const modButton=()=> {
    changeButtonState(
      !buttonState
    )
  }

  let ashDescription = 'Never give up until the very end!';
  let erenDescription = 'Freedom is the biggest lie of all!';

  return(
    <React.Fragment>
      <Navbar className="NavbarBackground" collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">WebVote</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
          </Nav>
          <Nav>
            <Nav.Link onClick={(window.accountId==='')?login:logout} eventKey={2} >
              {(window.accountId==='')?'Login':window.accountId}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Container className="voting-booth">
        <Row>
          <Col className="d-flex justify-content-center"><Candidate modButton={modButton} buttonState={buttonState} title={"Eren"} description={erenDescription} picture={Eren} /> </Col>
          <Col className="d-flex justify-content-center"><Subject subject="Who do you choose?"/></Col>
          <Col className="d-flex justify-content-center"><Candidate modButton={modButton} buttonState={buttonState} title={"Ash"} description={ashDescription} picture={Ash} /> </Col>
        </Row>
      </Container>

    </React.Fragment>
  )
}
