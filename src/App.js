import './App.css';
import testWords from './lib/functions/fill';
import WordTable from './lib/views/WordTable/WordTable';

function App() {
  return (
    <div className="App">
      <WordTable
        fullWordList={testWords}
      />
    </div>
  );
}

export default App;
