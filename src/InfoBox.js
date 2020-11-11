import React from "react";
const inactiveCard = "lg:h-full lg:w-full lg:my-1 lg:mx-10 px-4 relative rounded-xl overflow-hidden bg-red-200 shadow-lg z-100 py-4 my-6 lg:py-2"
const activeCard = "lg:h-full lg:w-full lg:my-1 lg:mx-10 px-4 relative rounded-xl overflow-hidden bg-red-400 shadow-lg z-100 py-4 my-6 lg:py-2"


export default function InfoBox({ title, cases, total,active, isRed, ...props }) {
  return (
    <div
      onClick={props.onClick}
      className={active ? activeCard: inactiveCard}
    >
      <div
        key={title}
        className="min-w-full cursor-pointer max-w-full lg:px-3 lg:pt-4 lg:pb-10 text-left break-all relative title-container"
      >
        <p className="text-xl uppercase text-black break-all leading-tight">
          {title}
        </p>
        <p className="text-lg text-black font-semibold leading-tight my-3">
          {cases}
        </p>
        <p className="text-md text-black leading-tight">Total: {total}</p>
      </div>
    </div>
  );
}
