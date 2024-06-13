// import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Home from './components/Home';
import Surveys from './components/Surveys';
import SurveyDetail from './components/SurveyDetail';
import Result from './components/Result';


function App() {
  return (
    <>
      <Router>
        <div className="App">

          <Routes>
            <Route key="Home" path='/' exact element={<Home></Home>} />
            <Route path='/userpost' exact element={<Surveys></Surveys>}></Route>
            {/* <Route path='/sample' exact element={<Sample></Sample>}></Route> */}
            <Route path="/test/:id" element={<SurveyDetail />} />
            <Route path="/result/:id" element={<Result></Result>} />
            <Route></Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
