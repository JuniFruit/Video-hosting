import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Channel } from '../components/pages/channel/Channel';
import Home from '../components/pages/home/Home';
import NotFoundPage from '../components/pages/not-found/NotFound';
import ProfileEditPage from '../components/pages/profile/ProfileEdit';
import RegisterPage from '../components/pages/register/Register';
import SearchResult from '../components/pages/search-results/SearchResults';
import Studio from '../components/pages/studio/Studio';
import VideoEdit from '../components/pages/studio/video-edit/VideoEdit';
import SubscriptionsPage from '../components/pages/subscriptions/SubscriptionsPage';
import Trending from '../components/pages/trending/Trending';
import { Video } from '../components/pages/video/Video';



const App: FC = () => {
  return (
    <Routes>

      <Route path='/' element={<Home />} />
      <Route path='/studio' element={<Studio />} />
      <Route path='/studio/edit/video/:id' element={<VideoEdit />} />
      <Route path='/channel/:id' element={<Channel />} />
      <Route path='/popular' element={<Trending />} />
      <Route path='/subscriptions' element={<SubscriptionsPage />} />
      <Route path='/videos/:name/:id' element={<Video />} />
      <Route path='/registration' element={<RegisterPage />} />
      <Route path='/user/profile/:id' element={<ProfileEditPage />} />
      <Route path='/search' element={<SearchResult />} />
      <Route path='*' element={<NotFoundPage />} />


    </Routes>
  );
}

export default App;
