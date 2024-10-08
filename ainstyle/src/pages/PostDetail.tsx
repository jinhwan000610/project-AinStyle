import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import './PostDetail.css';

interface Post {
  id: number;
  title: string;
  content: string;
  image: string;
}

interface Comment {
  id: number;
  postId: number;
  content: string;
}

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const userId = '12345'; // 실제 로그인된 사용자의 ID로 대체해야 함

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/posts/${id}/comments`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    const fetchLikes = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/posts/${id}/likes`);
        setLikes(response.data.likes);
      } catch (error) {
        console.error('Error fetching likes:', error);
      }
    };

    fetchPost();
    fetchComments();
    fetchLikes();
  }, [id]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8080/api/posts/${id}/comments`, { content: newComment });
      setNewComment('');
      const response = await axios.get(`http://localhost:8080/api/posts/${id}/comments`);
      setComments(response.data);
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const handleLike = async () => {
    if (hasLiked) return;
    try {
      await axios.post(`http://localhost:8080/api/posts/${id}/like`, null, {
        params: { userId: userId }
      });
      setHasLiked(true);
      setLikes(likes + 1);
    } catch (error) {
      console.error('Error liking the post:', error);
    }
  };

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div>
      <Header />
      <div className="post-container">
        <img src={post.image} alt={post.title} className="post-image" />
        <div className="post-content">
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <div className="like-section">
            <button onClick={handleLike} disabled={hasLiked} className="like-button">
              {hasLiked ? '추천 완료' : '추천'}
            </button>
            <span>추천수: {likes}</span>
          </div>
          <div className="comment-section">
            <h3>댓글</h3>
            <form onSubmit={handleCommentSubmit} className="comment-form">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                required
                placeholder="댓글을 작성하세요"
              ></textarea>
              <button type="submit">댓글 남기기</button>
            </form>
            <div className="comment-list">
              {comments.map((comment) => (
                <div key={comment.id} className="comment-item">
                  {comment.content}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
