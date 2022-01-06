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
        Se on helppoa.
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
