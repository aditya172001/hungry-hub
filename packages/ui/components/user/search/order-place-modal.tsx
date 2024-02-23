"use client";

import { Dialog, Transition } from "@headlessui/react";
import { ShoppingBagIcon } from "@heroicons/react/20/solid";
import { Fragment, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { cartDataState } from "store";
import { GiveStarRating } from "./give-star-rating";
import { useRouter, useSearchParams } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { useLocalStorage } from "../../useLocalStorage";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

export function OrderPlaceModal() {
  const router = useRouter();
  const searchParams = useSearchParams();

  //get info of items in cart
  const [cart, setCart] = useRecoilState(cartDataState);

  //initialize data order placing and giving review
  const [rating, setRating] = useState(4);
  const [reviewText, setReviewText] = useState("");
  const [orderID, setOrderID] = useLocalStorage("orderID", "");
  const { items, restaurantID } = cart;

  const [isGiveReviewOpen, setIsGiveReviewOpen] = useState(false);
  const [isCheckoutButtonDisabled, setIsCheckoutButtonDisabled] =
    useState(false);

  function openGiveReviewModal() {
    setIsGiveReviewOpen(true);
  }
  function closeGiveReviewModal() {
    setIsGiveReviewOpen(false);
    router.push("/search-restaurants");
    setCart({ items: [], restaurantID: "" });
  }
  async function updateOrderInDB() {
    const response = await axios.patch("/api/user/order", { orderID });
    if (response.status === 200) {
      toast.success(response.data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    openGiveReviewModal();
  }

  // todo
  useEffect(() => {
    if (searchParams.get("success")) {
      try {
        updateOrderInDB();
        localStorage.removeItem("orderID");
      } catch (error: any) {
        console.log("error :", error);
        if (error.response?.data?.message) {
          toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          toast.error(error, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      }
    }

    if (searchParams.get("canceled")) {
      toast.error("Order canceled", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, []);

  async function handleGiveReview() {
    try {
      const response = await axios.post("/api/user/review", {
        order: orderID,
        rating,
        reviewText,
      });

      toast.success(response.data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error: any) {
      if (error.response.data.message) {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.error(error, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } finally {
      setTimeout(() => {
        closeGiveReviewModal();
      }, 1000);
    }
  }

  async function handleCheckout() {
    setIsCheckoutButtonDisabled(true);
    try {
      const response = await axios.post("/api/user/order", {
        restaurant: restaurantID,
        items: items.map((it) => {
          return {
            item: it.itemID,
            quantity: it.quantity,
          };
        }),
      });

      setOrderID(response.data.orderID);

      const stripe = await stripePromise;
      if (!stripe || !response.data.url)
        throw new Error("Internal Server Error");
      else router.push(response.data.url);
    } catch (error: any) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.error(error, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } finally {
      setIsCheckoutButtonDisabled(false);
    }
  }

  return (
    <>
      <ToastContainer />
      <button
        className={`flex items-center space-x-1 hover:cursor-pointer border border-transparent p-1 rounded-md bg-violet-200 hover:shadow hover:text-black ${
          isCheckoutButtonDisabled ? "disabled:shadow disabled:text-black" : ""
        }`}
        disabled={isCheckoutButtonDisabled}
        onClick={handleCheckout}
      >
        <div>Checkout</div>
        <ShoppingBagIcon className="w-6 text-violet-700" />
      </button>
      {/* below is review modal  */}
      <Transition appear show={isGiveReviewOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={closeGiveReviewModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xs transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Leave a review
                  </Dialog.Title>
                  <div className="mt-2">
                    <GiveStarRating rating={rating} setRating={setRating} />
                    <input
                      type="text"
                      className="border border-gray-200 rounded-md outline-none text-gray-700 w-full px-1 mt-2"
                      placeholder="Write a review ..."
                      onChange={(e) => setReviewText(e.target.value)}
                    />
                  </div>
                  <div className="mt-4 space-x-2 flex justify-between">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-violet-100 px-4 py-2 text-sm font-medium text-violet-900 hover:bg-violet-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                      onClick={closeGiveReviewModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-violet-100 px-4 py-2 text-sm font-medium text-violet-900 hover:bg-violet-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                      onClick={handleGiveReview}
                    >
                      Confirm
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
