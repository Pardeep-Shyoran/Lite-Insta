import { useDispatch, useSelector } from "react-redux";
import style from "./UpdatePost.module.css";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { updatePost } from "../../features/Posts/postActions";

const UpdatePost = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { postDetail } = useSelector((state) => state.postReducer || {});
  console.log("postDetail:", postDetail);
  

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      caption: postDetail?.caption || "",
      image: postDetail?.image || "",
    },
  });

  const updatePostHandler = (postDetail) => {
    console.log("Update Post Data:", postDetail);
    // Dispatch update post action here
    dispatch(updatePost({ id, ...postDetail }));
    reset();
  }

  return <div className={style.UpdatePost}>
    <form 
        className={style.updatePostForm}
        onSubmit={handleSubmit(updatePostHandler)}
    >
        <h2>Update Post</h2>
        
    </form>
  </div>;
};

export default UpdatePost;
