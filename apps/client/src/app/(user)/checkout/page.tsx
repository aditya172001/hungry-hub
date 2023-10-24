import { CheckoutBody } from "ui";

export default async function Checkout() {
  return (
    <div className=" py-4">
      <img
        src={"/checkout.jpg"}
        alt="checkout image"
        className=" w-full h-80 object-cover"
      />
      <div className="text-4xl font-semibold pt-3 py-2">Cart</div>
      <CheckoutBody />
    </div>
  );
}
