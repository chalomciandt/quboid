import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import api from './services/api.js';
import Routes from './routes'

function App() {
  return (
    <div className="App">
      <Header />
      <Routes />
    </div>
  );
}

export default App;
