import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Post from './components/Post';
import AddPost from './components/AddPost';
import PostDetail from './components/PostDetail';
import EditPost from './components/EditPost';


function App() {
   const END_POINT = "http://localhost:9000/posts";
   let [posts, setPosts] = useState([]);

   const addnewPost = async (post) => {
      console.log("Post is ", post);
      await fetch(END_POINT, {
         method: "POST",
         body: JSON.stringify({
            title: post.title,
            desc: post.desc
         }),
         headers: {
            "content-type": "application/json"
         }
      });
      setPosts([post, ...posts]);
   }
   useEffect(async () => {
      let posts = await (await fetch(END_POINT)).json(); // GET
      setPosts(posts);
   }, []);

   const postDeleteHandler = async (id) => {
      await fetch(END_POINT + "/" + id, {
         method: "DELETE"
      });
      setPosts(posts.filter(post => post.id != id));
   }

   const updatePostHandler = async (updatePost) => {
      await fetch(END_POINT + "/" + updatePost.id, {
         method: "PATCH",
         body: JSON.stringify(updatePost),
         headers: {
            "content-type": "application/json"
         }
      });
      setPosts(posts.map(po => po.id === updatePost.id ? updatePost : po));
   }

   return (
      <div className="container">
         <h1 className="text-center text-info my-3">Posts</h1>
         <Router>
            <Routes>
               <Route path="/" element={<Post posts={posts} removePost={postDeleteHandler} />} />
               <Route path="/add" element={<AddPost addPost={addnewPost} />}></Route>
               <Route path="/post/:id" element={<PostDetail />} />
               <Route path="/post/edit/:id" element={<EditPost updatePost={updatePostHandler} />} />
            </Routes>
         </Router>
      </div >
   );
}


export default App;
