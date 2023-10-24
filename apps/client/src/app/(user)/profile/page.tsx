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
      <ProfileBody />
    </div>
  );
}

// async function getUserData(): Promise<userType | "error"> {
//   try {
//     await ensureDbConnection();
//     const session = await getServerSession(authOptions);
//     const user = await validateUserSession(session);
//     await user.populate("address");
//     return user;
//   } catch (error) {
//     console.error(error);
//     return "error";
//   }
// }

// async function getOrderHistoryData(): Promise<OrderType[] | "error"> {
//   try {
//     await ensureDbConnection();
//     const session = await getServerSession(authOptions);
//     const user = await validateUserSession(session);
//     let orders = await Order.find({ user: user._id }).populate([
//       "items",
//       "deliveryAddress",
//       "restaurant",
//     ]);
//     let myOrders: OrderType[] = orders.map((order) => {
//       return {
//         orderID: order._id,
//         restaurantName: order.restaurant.restaurantName,
//         restaurantProfilePicture: order.restaurant.profilePicture,
//         items: order.items,
//         orderStatus: order.orderStatus,
//         paymentStatus: order.paymentStatus,
//         deliveryAddress: order.deliveryAddress,
//       };
//     });
//     return myOrders;
//   } catch (error) {
//     console.error(error);
//     return "error";
//   }
// }
