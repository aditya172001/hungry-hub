import {
  HomeHeader,
  DiningOption,
  Collections,
  Footer,
  ExploreOptions,
} from "ui";
import { authOptions } from "./api/auth/[...nextauth]/options";

export default function Home() {
  return (
    <main className="bg-purple-50">
      <HomeHeader
        authOptions={authOptions}
        profileImage="/empty-profile-picture.png"
      />
      <div className="flex justify-between space-x-10 px-48 py-10">
        <DiningOption
          image="/order-online.jpg"
          mode="Online Order"
          description="Stay home and order to your doorstep"
        />
        <DiningOption
          image="/dine-out.jpg"
          mode="Dining"
          description="View the city's favourite dining venues"
        />
        <DiningOption
          image="/night-life.jpg"
          mode="Night Life"
          description="Explore the city's top nightlife outlets"
        />
      </div>
      {/* edit collection after setting appropriate filters */}
      <Collections />
      <ExploreOptions />
      <Footer />
    </main>
  );
}
