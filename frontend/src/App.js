// import logo from './logo.svg';
// import './App.css';
// import Container from 'react-bootstrap/Container'
// import Row from 'react-bootstrap/Row'
import 'bootstrap/dist/css/bootstrap.min.css'

import { Container, Row, Col } from 'react-bootstrap'
import Board from './features/board/Board'
import Hand from './features/solve/Hand'
import SovelButton from './features/solve/Solve'
import SolutionList from './features/solve/SolutionList'
import Header from './features/header/Header'

const App = () => {
  return (
    <Container fluid='lg'>
      <Header />
      <Row>
        <Col lg={8}>
          <Board />
        </Col>
        <Col lg={4}>
          <Hand />
          <SolutionList />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
