import { Link, useNavigate, useParams } from "react-router-dom";
import style from "./PostDetails.module.css";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, getPostDetail } from "../../features/Posts/postActions";
import { useEffect } from "react";
import { toast } from "react-toastify";

const PostDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { postDetail } = useSelector((state) => state.postReducer || {});
  // console.log("postDetail:", postDetail);

  useEffect(() => {
    const fetchPostDetail = async () => {
      // const toastId = toast.loading("Post detail fetching...");
      try {
        const payload = await dispatch(getPostDetail(id)).unwrap();
        // toast.update(toastId, {
        //   render: payload?.message || "Post Detail fetched successfully",
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

    fetchPostDetail();
  }, [dispatch, id]);

  const deletePostHandler = async (postId) => {
    await dispatch(deletePost(postId));
    navigate("/profile");
  };

  return (
    <div className={style.PostDetailsPage}>
      <div key={id} className={style.PostDetails}>
        {postDetail ? (
          <div className={style.postCard}>
            {postDetail.image && (
              <img
                src={postDetail.image}
                alt={postDetail.caption || "post"}
                className={style.postImage}
              />
            )}
            <div className={style.postDetailsInfo}>
              <p className={style.caption}>{postDetail.caption}</p>
              <div className={style.postInfoButtons}>
                <Link
                  to={`/update-post/${postDetail._id || postDetail.id}`}
                  className={`${style.postInfoBtn} ${style.updatePostBtn}`}
                >
                  Update Post
                </Link>
                <button
                  onClick={() =>
                    deletePostHandler(postDetail._id || postDetail.id)
                  }
                  className={`${style.postInfoBtn} ${style.deletePostBtn}`}
                >
                  Delete Post
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>Loading post details...</div>
        )}
      </div>
    </div>
  );
};

export default PostDetails;
