import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { ProfileBody, ProfileHeader } from "ui";

export default async function Profile() {
  let userProfileImage = "/empty-profile-picture.png";
  const session = await getServerSession(authOptions);
  let userProfileName = "user";
  if (session?.user?.name) {
    userProfileName = session.user.name;
  } else if (session?.user?.email) {
    userProfileName = session?.user?.email;
  }
  if (session?.user?.image) {
    userProfileImage = session.user.image;
  }

  return (
    <div>
      <ProfileHeader
        profileImage={userProfileImage}
        profileName={userProfileName}
        isButtonPresent={true}
        buttonText="Edit profile"
        buttonLink="/profile/update"
        bgImageLink="/user-profile-bg.jpg"
      />
      <ProfileBody spinner="/tail-spin.svg" />
    </div>
  );
}
