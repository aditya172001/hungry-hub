import { FormUpdateRestaurant } from "ui";

export default async function UpdateRestaurantDetails() {
  return (
    <main className="flex items-center justify-center bg-violet-50 min-h-screen py-3">
      <div className="border border-transparent rounded-md shadow-lg p-8 sm:px-16 sm:py-10 bg-white">
        <div className="w-60 sm:w-96">
          <div className="text-xl font-medium pb-2 sm:pb-5">
            Register new restaurant
          </div>
          <FormUpdateRestaurant erroricon="/error-icon.svg" />
        </div>
      </div>
    </main>
  );
}
