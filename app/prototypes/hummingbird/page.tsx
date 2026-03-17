"use client";

// Template for creating a new prototype
// To use this template:
// 1. Create a new folder in app/prototypes with your prototype name
// 2. Copy this file and styles.module.css into your new folder
// 3. Create an 'images' folder for your prototype's images
// 4. Rename and customize the component and styles as needed

import { useState } from 'react';
import styles from './vintage-mac.module.css';

const AVATAR_PALETTE: { bg: string; fg: string }[] = [
  { bg: '#e2c4c0', fg: '#7a3d39' }, // dusty rose
  { bg: '#bdd0b9', fg: '#365633' }, // sage
  { bg: '#ddd0b0', fg: '#5e4e28' }, // warm sand
  { bg: '#b8c8dc', fg: '#334d6b' }, // slate blue
  { bg: '#d0c4e0', fg: '#503968' }, // lavender
  { bg: '#b4d0cc', fg: '#2a5450' }, // muted teal
];

function avatarColor(username: string) {
  const code = username.toUpperCase().charCodeAt(0);
  return AVATAR_PALETTE[code % AVATAR_PALETTE.length];
}

interface Post {
  id: number;
  username: string;
  content: string;
  timestamp: string;
}

export default function HummingbirdFeed() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      username: 'Sarah',
      content: 'Just launched my new portfolio website! 🚀',
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      username: 'Michael',
      content: 'Working on some exciting UI animations today. Stay tuned!',
      timestamp: '4 hours ago'
    },
    {
      id: 3,
      username: 'Emma',
      content: 'Does anyone have recommendations for good design podcasts?',
      timestamp: '6 hours ago'
    }
  ]);

  const [newPost, setNewPost] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    const post: Post = {
      id: Date.now(),
      username: 'You',
      content: newPost,
      timestamp: 'Just now'
    };

    setPosts([post, ...posts]);
    setNewPost('');
  };

  return (
    <div className={styles.container}>
      <div className={styles.window}>
        <div className={styles.titleBar}>
          <h1 className={styles.titleText}>New post</h1>
        </div>
        <form onSubmit={handleSubmit} className={styles.postForm}>
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="What's happening?"
            className={styles.postInput}
          />
          <button type="submit" className={styles.postButton}>Post</button>
        </form>
      </div>

      <div className={styles.window}>
        <div className={styles.titleBar}>
          <h2 className={styles.titleText}>Feed</h2>
        </div>
        <div className={styles.feed}>
          {posts.map(post => (
            <div key={post.id} className={styles.post}>
              <div className={styles.postHeader}>
                <div
                  className={styles.avatar}
                  style={{
                    backgroundColor: avatarColor(post.username).bg,
                    color: avatarColor(post.username).fg,
                    borderColor: avatarColor(post.username).fg + '55',
                  }}
                >
                  {post.username[0].toUpperCase()}
                </div>
                <div className={styles.postMeta}>
                  <span className={styles.username}>{post.username}</span>
                  <span className={styles.timestamp}>{post.timestamp}</span>
                </div>
              </div>
              <p className={styles.content}>{post.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 