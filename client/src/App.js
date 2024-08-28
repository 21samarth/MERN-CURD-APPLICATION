import './App.css';
import {BrowserRouter , Route , Routes} from 'react-router-dom'
import AddUser from './Components/AddUser.jsx';
import Navbar from './Components/Navbar.jsx';
import Home from './Components/Home.jsx';
import AllUsers from './Components/AllUsers.jsx';
import About from './Components/About.jsx';
import EditUser from './Components/EditUser.jsx';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/users' element={<AllUsers/>}/>
      <Route path='/add' element={<AddUser/>}/>
      <Route path="/editUser/:id" element={<EditUser />} />
      <Route path='/about' element={<About/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
