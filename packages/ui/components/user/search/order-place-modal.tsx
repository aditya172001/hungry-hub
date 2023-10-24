"use client";
import { Dialog, Transition } from "@headlessui/react";
import { ShoppingBagIcon } from "@heroicons/react/20/solid";
import { Fragment, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { cartDataState, cartPriceState } from "store";
import { GiveStarRating } from "./give-star-rating";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export function OrderPlaceModal() {
  const router = useRouter();
  const [cart, setCart] = useRecoilState(cartDataState);
  const cartPrice = useRecoilValue(cartPriceState);
  const [rating, setRating] = useState(4);
  const [reviewText, setReviewText] = useState("");
  const [orderID, setOrderID] = useState<string | undefined>(undefined);
  const { items: myitems, restaurantID } = cart;
  const items = myitems.map((item) => item.itemID);
  const [isOrderPlaceOpen, setIsOrderPlaceOpen] = useState(false);
  const [isGiveReviewOpen, setIsGiveReviewOpen] = useState(false);
  function openOrderPlaceModal() {
    setIsOrderPlaceOpen(true);
  }
  function closeOrderPlaceModal() {
    setIsOrderPlaceOpen(false);
  }
  function openGiveReviewModal() {
    setIsGiveReviewOpen(true);
  }
  function closeGiveReviewModal() {
    setIsGiveReviewOpen(false);
    router.push("/search-restaurants");
    setCart({ items: [], restaurantID: "" });
  }

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
    closeOrderPlaceModal();
    try {
      const response = await axios.post("/api/user/order", {
        restaurant: restaurantID,
        items,
      });

      setOrderID(response.data.orderID);

      toast.success(response.data.message, {
        position: toast.POSITION.TOP_CENTER,
      });

      openGiveReviewModal();
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
    }
  }

  return (
    <>
      <ToastContainer />
      <div
        className="flex items-center space-x-1 hover:cursor-pointer border border-transparent p-1 rounded-md hover:bg-violet-200 hover:shadow hover:text-black"
        onClick={openOrderPlaceModal}
      >
        <div>Checkout</div>
        <ShoppingBagIcon className="w-6 text-violet-700" />
      </div>
      {/* this is place order modal  */}
      <Transition appear show={isOrderPlaceOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={closeOrderPlaceModal}
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
                    Place order
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      The total price is : ₹{cartPrice}
                    </p>
                  </div>
                  <div className="mt-4 space-x-2 flex justify-between">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-violet-100 px-4 py-2 text-sm font-medium text-violet-900 hover:bg-violet-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                      onClick={closeOrderPlaceModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-violet-100 px-4 py-2 text-sm font-medium text-violet-900 hover:bg-violet-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                      onClick={handleCheckout}
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
