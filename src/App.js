import "./App.css";
import Router from "./routes";
import AuthProvider from "./contexts/AuthContext";
//import Footer from './components/footer/footer';
function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Router />
      </div>
    </AuthProvider>
  );
}

export default App;
