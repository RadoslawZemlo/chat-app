import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Chat App</h1>
      </header>
      <Router>
        <Routes>
          <Route path="/register" exact element={<Register />} />
          <Route path="/login" exact element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
