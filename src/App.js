import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Customerlist from './components/Customerlist';
import Traininglist from './components/Traininglist';
import {BrowserRouter, Routes, Route, Link } from 'react-router-dom';

const linkStyle = {
  margin: '1rem',
  textDecoration: 'none',
  color: 'blue'
}

function App() {
  return (
    <div className='App'>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6'>
            Personal Trainer
          </Typography>
        </Toolbar>
      </AppBar>
      <BrowserRouter>
        <div>
          <Link to="/customerList" style={linkStyle}>Customerlist</Link>{" "}
          <Link to="/traininglist" style={linkStyle}>Traininglist</Link>{" "}
          <Routes>
            <Route path='/customerlist' element={<Customerlist />} />
            <Route path='/traininglist' element={<Traininglist />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
