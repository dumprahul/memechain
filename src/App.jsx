 import VerticalText from './pages/MemesandTemplates';
 import Hero from './pages/Hero';
 import Wcbox from './components/Wcbox';
 import ProfileCard from './components/ProfileCard';
 import PostsSection from './components/ProfileSection';
 import Cards from './components/Cards';
import PostList from './/components/PostList';

function App() {
  return (
      <>
      <div className="min-h-screen mt-12 p-6" id="wcbox">
        <ProfileCard />
        <PostList />
        <PostList />
      </div>


      </>
    );
}

export default App;



