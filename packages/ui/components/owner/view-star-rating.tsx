import { ReactElement } from "react";

export function ViewStarRating({ rating }: { rating: number }): ReactElement {
  const stars: any = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(
        <span key={i}>
          <img src="/filled-star.svg" alt="filled star" className="w-6" />
        </span>
      );
    } else {
      stars.push(
        <span key={i}>
          <img src="/empty-star.svg" alt="empty star" className="w-6" />
        </span>
      );
    }
  }
  return <div className="flex items-center gap-2">{stars}</div>;
}
