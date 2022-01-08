import { Container, Row, Col, Button, Modal } from 'react-bootstrap'
import { useState } from 'react'
import styles from './header.module.css'

const Help = ({show, handleClose}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Kuinka tätä käytetään</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ol>
          <li>Täytä kenttä vastaamaan tilannetta pelissä
            <ul>
              <li>Ruudin klikkaaminen avaa kirjainten syötön.</li>
              <li>Enterin/aktiivisen ruudun klikkaus muuttaa syöttysuunnan.</li>
            </ul>
          </li>
          <li>Kerro, mitä kirjaimia kädestä löytyy.</li>
          <li>Ratkaise -> ratkaisut ilmestyvät hetken kuluttua</li>
        </ol>
        <hr/>
        Sanavarastona on taivuttamaton Kotuksen sanakirja vuodelta 2007 :D <br/><br/>Sillä kuitenkin löytyy varsin hyviä pisteitä antavia ratkaisuja.
      </Modal.Body>
    </Modal>
  )
}

const Header = () => {
  const [showHelp, setShowHelp] = useState(false)
  const toggle = () => setShowHelp(!showHelp)
  return (
    <header className={styles.center}>
      <h1>Scrabbler</h1>
      <Button variant='link' onClick={toggle}>
        apua
      </Button>
      <Help show={showHelp} handleClose={toggle} />
    </header>
  )
}

export default Header
