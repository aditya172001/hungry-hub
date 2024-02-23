// "use client"

import axios from "axios";
import { ReactElement, useEffect } from "react";
import { ReviewType } from "types";
import { IndividualReview } from "./individual-review";
import useSWR, { mutate } from "swr";
import Image from "next/image";

function fetcher() {
  return axios.get("/api/user/reviews").then((res) => res.data.reviews);
}

export function UserReviews({ spinner }: { spinner: string }): ReactElement {
  const {
    data: reviews,
    error,
    isLoading,
  } = useSWR<ReviewType[]>("api/user/reviews", fetcher);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Image
          src={spinner}
          height={100}
          width={100}
          alt="spinner"
          className=" w-16"
        />
      </div>
    );
  }

  return (
    <div>
      {reviews ? (
        <div className="py-2">
          {reviews
            .sort((a, b) => (a.reviewDateTime > b.reviewDateTime ? -1 : 1))
            .map((review) => {
              return <IndividualReview key={review.reviewID} review={review} />;
            })}
        </div>
      ) : (
        <div className="flex h-96 items-center justify-center">
          No review history available, Order some food and give review.
        </div>
      )}
    </div>
  );
}
