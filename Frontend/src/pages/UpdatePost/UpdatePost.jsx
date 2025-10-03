import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import style from "./UpdatePost.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { updatePost, getPostDetail } from "../../features/Posts/postActions";
import { toast } from "react-toastify";

const UpdatePost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { postDetail, loading, success } = useSelector(
    (state) => state.postReducer || {}
  );
  // console.log("postDetail:", postDetail);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      caption: "",
      image: "",
    },
  });

  useEffect(() => {
    dispatch(getPostDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (postDetail) {
      reset({
        caption: postDetail.caption || "",
        image: postDetail.image || "",
      });
    }
  }, [postDetail, reset]);

  const updatePostHandler = async (data) => {
    const toastId = toast.loading("Post updating...");
    try {
      const payload = await dispatch(
        updatePost({ postId: id, updateData: data })
      ).unwrap();
      toast.update(toastId, {
        render: payload?.message || "Post updated successfully",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      navigate("/profile");
    } catch (err) {
      const message = err?.message || err || "Something went wrong";
      toast.update(toastId, {
        render: message,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  if (loading && !postDetail) {
    return <div className={style.UpdatePost}>Loading...</div>;
  }

  return (
    <div className={style.UpdatePost}>
      <form
        className={style.updatePostForm}
        onSubmit={handleSubmit(updatePostHandler)}
        encType="multipart/form-data"
      >
        <div className={style.imageSection}>
          {postDetail?.image && (
            <img
              src={postDetail.image}
              alt="Post"
              className={style.imagePreview}
            />
          )}
        </div>

        <div className={style.captionSection}>
          
          <textarea
            className={style.updateCaption}
            placeholder="Update your caption..."
            id="caption"
            {...register("caption", { required: "Caption is required" })}
          />
          {errors.caption && (
            <p className={style.error}>{errors.caption.message}</p>
          )}
          <button className={style.updatePostBtn} type="submit">
            Update Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePost;
