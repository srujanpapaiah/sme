import React from "react";

const Card = ({ name, count, maxCountObj }: any) => {
  return (
    <div className="p-2 px-5 rounded shadow-md transition duration-300 bg-gray-800 text-white min-w-[200px] relative">
      {maxCountObj?.name === name && count !== 0 && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="absolute top-[-42px] w-[100px] transform rotate-30 right-[-32px]"
          src={"crown.png"}
          alt="crown image"
        />
      )}
      <p className="text-center my-10 font-bold text-5xl">{count}</p>
      <p className="text-center text-base">{name}</p>
    </div>
  );
};

export default Card;
