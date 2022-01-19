import './App.css';
import Router from './routes';
//import Footer from './components/footer/footer';
function App() {
  return (
    <div className="App">
      <Router />
      <p className='creditos'>Feito com ❤️ por <a href='https://github.com/Wendellsg'>Wendell Guimarães 🤓</a></p>
    </div>
  );
}

export default App;