// import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Home from './components/Home';


function App() {
  return (
    <>
      <Router>
        <div className="App">

          <Routes>
            <Route key="Home" path='/' exact element={<Home></Home>} />
            {/* <Route path='/userpost' exact element={<UserPost></UserPost>}></Route>
            <Route path='/sample' exact element={<Sample></Sample>}></Route> */}
            <Route></Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
