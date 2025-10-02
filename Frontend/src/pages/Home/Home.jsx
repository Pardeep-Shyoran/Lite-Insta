import { Helmet } from "react-helmet";
import style from "./Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllPosts } from "../../features/Posts/postActions";
import { toast } from "react-toastify";

const Home = () => {
  const dispatch = useDispatch();
  const { allPosts } = useSelector((state) => state.postReducer || {});

  useEffect(() => {
    const fetchAllPosts = async () => {
      const toastId = toast.loading("Posts fetching...");
      try {
        const payload = await dispatch(getAllPosts()).unwrap();
        toast.update(toastId, {
          render: payload?.message || "Posts fetched successfully",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
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

    fetchAllPosts();
  }, [dispatch]);
  console.log("allpost in Home:", allPosts);

  return (
    <>
      <Helmet>
        <title>Home - Lite-Insta</title>
        <meta
          name="description"
          content="Welcome to Lite-Insta, your one-stop solution for all things Instagram."
        />
      </Helmet>

      <div className={style.UserPosts}>
        {Array.isArray(allPosts) && allPosts.length > 0 ? (
          // Ensure newest posts show first. Sort by createdAt (or created_at) descending.
          [...allPosts]
            .slice()
            .sort(
              (a, b) =>
                new Date(b.createdAt || b.created_at) -
                new Date(a.createdAt || a.created_at)
            )
            .map((post) => (
              <div key={post._id || post.id} className={style.postCard}>
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.caption || "post"}
                    className={style.postImage}
                  />
                )}
                <p>{post.caption}</p>
              </div>
            ))
        ) : (
          <div>No posts found</div>
        )}
      </div>
    </>
  );
};

export default Home;
