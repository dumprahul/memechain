// src/App.jsx
import React from 'react';
import Hero from '../src/new/Hero';



const App=() => {
  return (
    <div className="App">
      <Hero />
    </div>
  );
}

export default App;

























// import { BrowserRouter,Routes,Route } from 'react-router-dom';
// import MemesandTemplates from './pages/MemesandTemplates';
// import Hero from './pages/Hero';
// import Wcbox from './components/Wcbox';
// import ProfileCard from './components/ProfileCard';
// import PostsSection from './components/ProfileSection';
// import Cards from './components/Cards';
// import PostList from './/components/PostList';
// import MemeEditor from './tedit/MemeEditor';


// const App = () => {

//   return (
//     <div>
//       <BrowserRouter>
//         <Routes>
//           <Route index element={<Hero />} />
//           <Route path='/home' element={<Hero />} />
//           <Route path='/memes' element={<MemesandTemplates  />} />
//           <Route path='/profile' element={
//               <div className="min-h-screen mt-12 p-6" style={{ backgroundImage: "url('src/assets/anime.jpg')" }} id="wcbox">
//                   <ProfileCard />
//                   <PostList />
//                   <PostList />
//               </div>
//              } />
//           <Route path='/memeeditor' element={<MemeEditor  />} />
//         </Routes>
//       </BrowserRouter>
//     </div>


//   )


// }

// export default App;



// import React from 'react';
// import MemeEditor from '../src/tedit/MemeEditor';

// function App() {
//   return (
//     <div className="App"  style={{ backgroundImage: "url('src/assets/anime.jpg')" }} >
//       <MemeEditor />
//     </div>
//   );
// }

// export default App;
