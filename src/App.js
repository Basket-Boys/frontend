import './App.css';
import WordRow from './lib/views/WordTable/WordRow';
import CText from './lib/views/common/CText';
import SpacedRow from './lib/views/common/SpacedRow';

function App() {
  return (
    <div className="App">
      <WordRow word='hello' />
    </div>
  );
}

export default App;
