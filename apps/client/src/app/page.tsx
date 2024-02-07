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
      <div className="flex flex-wrap lg:flex-nowrap justify-around px-4 sm:px-12 2xl:px-48 py-10">
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
