import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Chat from "./components/Chat";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Chat App</h1>
      </header>
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/chat" exact element={<Chat />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
