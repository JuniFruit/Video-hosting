import { Routes, Route } from 'react-router-dom';
import { Channel } from '../components/pages/channel/Channel';
import { Home } from '../components/pages/home/Home';
import { Studio } from '../components/pages/studio/Studio';
import styles from './App.module.scss';

function App() {
  return (
    <Routes>
      
      <Route path='/' element={<Home />} /> 
      <Route path='/studio' element={<Studio />} />
      <Route path='/channel/:id' element={<Channel />} />


    </Routes>
  );
}

export default App;
