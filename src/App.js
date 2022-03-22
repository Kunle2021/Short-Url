import React from 'react';
import PostForm from './Components/PostForm';
import{BrowserRouter , /*Route , Switch*/}from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>
    <div className="Container">
        <PostForm/>

        
    </div>
    </BrowserRouter>

    
  );
}

export default App;
