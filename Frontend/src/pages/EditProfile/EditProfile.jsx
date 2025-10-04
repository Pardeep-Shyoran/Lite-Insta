import { useDispatch, useSelector } from "react-redux";
import style from "./EditProfile.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { updateProfile } from "../../features/Auth/authActions";
import { toast } from "react-toastify";

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo, loading, success, error } = useSelector(
    (state) => state.authReducer || {}
  );

  // console.log("userInfo:", userInfo);

  const [fileName, setFileName] = useState('Click to upload profile picture');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      fullName: "",
      username: "",
      bio: "",
    },
  });

  useEffect(() => {
    // console.log("userInfo changed:", userInfo);
  if (userInfo) {
    reset({
      fullName: userInfo.fullName || "",
      username: userInfo.username || "",
      bio: userInfo.bio || "",
    });
  }
}, [userInfo, reset]);

const onSubmit = async (data) => {
  const toastId = toast.loading("Updating profile...");
  try {
    await dispatch(updateProfile(data));
    toast.update(toastId, {
      render: "Profile Updated Successfully",
      type: "success",
      isLoading: false,
      autoClose: 3000,
    });
    navigate("/profile");
  } catch (err) {
    toast.update(toastId, {
      render: err?.message || "Something went wrong",
      type: "error",
      isLoading: false,
      autoClose: 5000,
    });
  }
};




  return (
    <div className={style.editProfileContainer}>
      <h1 className={style.pageTitle}>Edit Profile</h1>
      <form className={style.editProfileForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={style.formGroup}>
          <label htmlFor="profilePic">Profile Picture</label>
          <div className={style.fileInputWrapper}>
            <input
              type="file"
              id="profilePic"
              className={style.fileInput}
              {...register("profilePic")}
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setFileName(e.target.files[0].name);
                } else {
                  setFileName('Click to upload profile picture');
                }
              }}
            />
            <span className={style.fileInputLabel}>{fileName}</span>
          </div>
        </div>

        <div className={style.formGroup}>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            {...register("fullName", { required: "Full Name is required" })}
          />
          {errors.fullName && (
            <span className={style.error}>{errors.fullName.message}</span>
          )}
        </div>

        <div className={style.formGroup}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            {...register("username", { required: "Username is required" })}
          />
          {errors.username && (
            <span className={style.error}>{errors.username.message}</span>
          )}
        </div>

        <div className={style.formGroup}>
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            rows="4"
            {...register("bio")}
          ></textarea>
        </div>

        <button type="submit" className={style.saveButton} disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </button>
        {error && <span className={style.error}>{error}</span>}
      </form>
    </div>
  );
};

export default EditProfile;
