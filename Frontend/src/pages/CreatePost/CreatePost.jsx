import { Helmet } from "react-helmet";
import style from "./CreatePost.module.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../features/Posts/postActions";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const CreatePost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, success, message } = useSelector(
    (state) => state.postReducer || {}
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm();

  const [preview, setPreview] = useState(null);

  const [fileName, setFileName] = useState('Click to upload post image');

  async function postHandler(post) {
    const toastId = toast.loading("Creating post...");
    try {
      const payload = await dispatch(createPost(post)).unwrap();
      toast.update(toastId, {
        render: payload?.message || "Post Created Successful",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      navigate("/profile");
    } catch (err) {
      toast.update(toastId, {
        render: err || "Something went wrong",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  }

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    reset();
  }, [error, reset]);

  // Handle file selection and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setFileName(file.name);
    } else {
      setFileName('Click to upload post image');
    }
  };

  return (
    <>
      <Helmet>
        <title>Create Post - Lite-Insta</title>
        <meta
          name="description"
          content="Create a new account on Lite-Insta."
        />
      </Helmet>

      <div className={style["create-post"]}>
        <form
          className={style["post-form"]}
          onSubmit={handleSubmit(postHandler)}
          method="POST"
          encType="multipart/form-data"
        >
          <div className={style["post-formGroupWrapper"]}>
            <div className={style["post-formGroup"]}>
              <label className={style["post-label"]}>Choose Post Image:</label>
              <div className={style.fileInputWrapper}>
                <input
                  type="file"
                  id="postImage"
                  className={style.fileInput}
                  {...register("image", { required: "Image is Required" })}
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <span className={style.fileInputLabel}>{fileName}</span>
              </div>
              {errors.image && (
                <p className={style.error}>{errors.image.message}</p>
              )}
            </div>

            {/* Image Preview */}
            {preview && (
              <div className={style["preview-container"]}>
                <img
                  src={preview}
                  alt="Preview"
                  className={style["preview-image"]}
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className={style["post-button"]}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Post"}
          </button>
        </form>
      </div>
    </>
  );
};

export default CreatePost;
