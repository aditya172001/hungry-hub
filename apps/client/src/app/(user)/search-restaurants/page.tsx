import { RestaurantOption, RestaurantSearchBody } from "ui";

export default function SearchRestaurants() {
  return (
    <div>
      <div className="flex">
        <RestaurantOption
          restaurantOption="order-online"
          inactiveIcon="/delivery-bw.jpg"
          bgInactiveColor="bg-violet-100"
          activeIcon="/delivery-coloured.jpg"
          bgActiveColor="bg-amber-200"
          text="Delivery"
        />
        <RestaurantOption
          restaurantOption="dine-out"
          inactiveIcon="/dineout-bw.jpg"
          bgInactiveColor="bg-violet-100"
          activeIcon="/dineout-coloured.jpg"
          bgActiveColor="bg-blue-100"
          text="Dining Out"
        />
        <RestaurantOption
          restaurantOption="night-life"
          inactiveIcon="/nightlife-bw.jpg"
          bgInactiveColor="bg-violet-100"
          activeIcon="/nightlife-coloured.jpg"
          bgActiveColor="bg-sky-100"
          text="Nightlife"
        />
      </div>
      <hr />
      <RestaurantSearchBody />
    </div>
  );
}
