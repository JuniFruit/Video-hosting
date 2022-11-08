import { Routes, Route } from 'react-router-dom';
import { Channel } from '../components/pages/channel/Channel';
import { Home } from '../components/pages/home/Home';
import { Studio } from '../components/pages/studio/Studio';
import { SubscriptionsPage } from '../components/pages/subscriptions/SubscriptionsPage';
import { Trending } from '../components/pages/trending/Trending';
import { Video } from '../components/pages/video/Video';

function App() {
  return (
    <Routes>
      
      <Route path='/' element={<Home />} /> 
      <Route path='/studio' element={<Studio />} />
      <Route path='/channel/:id' element={<Channel />} />
      <Route path='/popular' element={<Trending />} />
      <Route path='/subscriptions' element={<SubscriptionsPage />} />
      <Route path='/videos/:name/:id' element={<Video />} />

    </Routes>
  );
}

export default App;
