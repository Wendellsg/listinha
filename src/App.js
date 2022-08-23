import "./App.css";
import Router from "./routes";
import AuthProvider from "./contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();
//import Footer from './components/footer/footer';
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className="App">
          <ToastContainer />
          <Router />
        </div>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
