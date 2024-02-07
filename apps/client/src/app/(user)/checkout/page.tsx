import { CheckoutBody } from "ui";
import Image from "next/image";

export default async function Checkout() {
  return (
    <div className="py-8 xl:py-4">
      <Image
        src={"/checkout.jpg"}
        alt="checkout image"
        width={500}
        height={500}
        className=" w-full h-40 sm:h-80 object-cover"
      />
      <div className="text-4xl font-semibold pt-3 py-2">Cart</div>
      <CheckoutBody />
    </div>
  );
}
