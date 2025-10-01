import { Helmet } from "react-helmet";
import UserProfile from "../../components/UserProfile/UserProfile";
import UserPosts from "../../components/UserPosts/UserPosts";

const Profile = () => {

  return <>
  <Helmet>
        <title>Profile - Lite-Insta</title>
        <meta
          name="description"
          content="Create a new account on Lite-Insta."
        />
      </Helmet>
    <UserProfile />
    <UserPosts />
  </>;
};

export default Profile;
