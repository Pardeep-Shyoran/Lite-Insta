import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserPost } from '../../features/Posts/postActions';
import style from './UserPosts.module.css'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const UserPosts = () => {
  const dispatch = useDispatch();
  const { postInfo, loading } = useSelector((state) => state.postReducer || {});

  useEffect(() => {
  const fetchPosts = async () => {
    // const toastId = toast.loading("Posts fetching...");

    try { 
      const payload = await dispatch(getUserPost()).unwrap();
      // toast.update(toastId, {
      //   // render: payload?.message || "Posts fetched successfully",
      //   type: "success",
      //   isLoading: false,
      //   autoClose: 3000,
      // });
    } catch (err) {
      const message = err?.message || err || "Something went wrong";
      // toast.update(toastId, {
      //   render: message,
      //   type: "error",
      //   isLoading: false,
      //   autoClose: 5000,
      // });
    }
  };

  fetchPosts();
}, [dispatch]);

if(loading){
  return <div className={style.UserPosts}>Loading...</div>
}


  // console.log('postInfo:', postInfo);

  return (
    <div className={style.UserPosts}>
      {Array.isArray(postInfo) && postInfo.length > 0 ? (
        // Ensure newest posts show first. Sort by createdAt (or created_at) descending.
        [...postInfo]
          .slice()
          .sort((a, b) => new Date(b.createdAt || b.created_at) - new Date(a.createdAt || a.created_at))
          .map((post) => (
            <div key={post._id || post.id} className={style.postCard}>
              <Link to={`/post/${post._id || post.id}`} className={style.postLink}>
              {post.image && (
                <img src={post.image} alt={post.caption || 'post'} className={style.postImage} />
              )}
              {/* <p>{post.caption}</p> */}
              </Link>
            </div>
          ))
      ) : (
        <div>No posts found</div>
      )}
    </div>
  );
}

export default UserPosts