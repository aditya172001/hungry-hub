import { NextAuthOptions, getServerSession } from "next-auth";
import { ReactElement } from "react";
import { Dropdown } from "./dropdown";
import { SigninAndSignupButton } from "./signin-and-signup-button";
import { validateUserSession } from "../../../../apps/client/src/app/api/validateUserSession";
import { userType } from "validation";

export async function ProfileDropdown({
  authOptions,
  profileImage,
}: {
  authOptions: NextAuthOptions;
  profileImage: string;
}): Promise<ReactElement> {
  const session = await getServerSession(authOptions);
  const myUser: userType = await validateUserSession(session);

  let userProfileName = "user_name";
  if (session?.user?.name) userProfileName = session.user.name;
  else if (session?.user?.email) {
    userProfileName = session.user.email;
  }

  let userProfileImage = profileImage;
  if (session?.user?.image) {
    userProfileImage = session.user.image;
  } else {
    if (myUser.profilePicture) {
      userProfileImage = myUser.profilePicture;
    }
  }

  return (
    <div className="z-10">
      {session ? (
        <Dropdown
          userType={myUser.userType}
          userProfileImage={userProfileImage}
          userProfileName={userProfileName}
        />
      ) : (
        <SigninAndSignupButton />
      )}
    </div>
  );
}
