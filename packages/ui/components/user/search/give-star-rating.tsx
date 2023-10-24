import { Dispatch, ReactElement, SetStateAction } from "react";

export function GiveStarRating({
  rating,
  setRating,
}: {
  rating: number;
  setRating: Dispatch<SetStateAction<number>>;
}): ReactElement {
  const stars: any = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(
        <span key={i} onClick={() => setRating(i)}>
          <img src="/filled-star.svg" alt="filled star" className="w-5" />
        </span>
      );
    } else {
      stars.push(
        <span key={i} onClick={() => setRating(i)}>
          <img src="/empty-star.svg" alt="empty star" className="w-5" />
        </span>
      );
    }
  }
  return <div className="flex items-center gap-2">{stars}</div>;
}
