import "./App.css";
import Router from "./routes";
import AuthProvider from "./contexts/AuthContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import Footer from './components/footer/footer';
function App() {
  return (
    <AuthProvider>
      <div className="App">
        <ToastContainer/>
        <Router />
      </div>
    </AuthProvider>
  );
}

export default App;
