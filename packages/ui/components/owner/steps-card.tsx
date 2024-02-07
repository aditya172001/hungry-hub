import { ReactElement } from "react";

export function StepsCard({
  image,
  color,
  step,
  title,
  description,
}: {
  image: string;
  color: string;
  step: string;
  title: string;
  description: string;
}): ReactElement {
  return (
    <div className="rounded-md w-64 flex flex-col items-center p-5 bg-white m-2">
      <div className={`rounded-full bg-${color}-100 p-9`}>
        <img src={image} alt="step1 image" className={`h-16 w-16`} />
      </div>

      <div className="mt-5 text-xl">Step {step}</div>
      <div className=" py-2 text-md text-slate-800">{title}</div>
      <div className=" text-sm text-slate-600 text-center">{description}</div>
    </div>
  );
}
