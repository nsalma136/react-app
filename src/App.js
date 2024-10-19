import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch categories and posts on component mount
  useEffect(() => {
    async function fetchData() {
      try {
        const categoriesResponse = await fetch('https://node-mysql.stacknow.dev/categories');
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);

        const postsResponse = await fetch('https://node-mysql.stacknow.dev/posts');
        const postsData = await postsResponse.json();
        setPosts(postsData);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <div className="App">
      <header>
        <h1>Blog Categories and Posts</h1>
      </header>
      <div className="content">
        <div className="categories">
          <h2>Categories</h2>
          <ul>
            {categories.map((category) => (
              <li key={category.id}>
                <h3>{category.name}</h3>
                <p>{category.description}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="posts">
          <h2>Posts</h2>
          {posts.map((post) => (
            <div key={post.id} className="post-card">
              <h3>{post.title}</h3>
              <p>{post.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
