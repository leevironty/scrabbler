// import logo from './logo.svg';
// import './App.css';
import Board from './features/board/Board'
import Hand from './features/hand/Hand'
import SovelButton from './features/solve/Solve'
import SolutionList from './features/solve/SolutionList'

const App = () => {
  return (
    <>
      <header>
        <h1>Scrabbler</h1>
      </header>
      <Board />
      <Hand />
      <SovelButton />
      <SolutionList />
    </>
  );
}

export default App;
