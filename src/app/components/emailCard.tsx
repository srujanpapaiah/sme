import React from "react";

const Card = ({ name, count, maxCountObj }: any) => {
  return (
    <div className="p-2 px-5 rounded shadow-md transition duration-300 bg-[#242526] text-white min-w-[200px] relative">
      {maxCountObj?.name === name && count !== 0 && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="absolute top-[-56px] w-[100px] transform  z-10 "
          src={"crown.png"}
          alt="crown image"
        />
      )}
      <p className="text-center my-10 font-bold text-5xl text-[#E9E6E2]">
        {count}
      </p>
      <p className="text-center text-base text-[#E9E6E2]">{name}</p>
    </div>
  );
};

export default Card;
