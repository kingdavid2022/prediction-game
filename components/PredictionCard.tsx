import { useRouter } from "next/router";
import React from "react";
import { PredictionCardProps } from "../constants/types";

const PredictionCard = ({
  token,
  timeLeft,
  price,
  date,
  onclick
}: PredictionCardProps) => {
  const router = useRouter();

  return (
    <div className="w-[90%] sm:w-[40vw] sm:h-[25vh] sm:max-w-[350px] sm:max-h-[250px] bg-white rounded-[15px] border-black border-[5px] m-5 shadow-prediction box-border p-[3%]">
      <div className="w-[100%] h-[40%] flex items-center justify-between">
        <div className="flex items-center justify-start w-[50%]">
          <span className="text-[#000000] text-[2.3rem] text-bold ml-3">
            {token}
          </span>
        </div>
        <span className="text-[#26a521] text-[1.5rem] text-bold ml-[-30%]">
          {timeLeft} Left
        </span>
      </div>
      <div className="w-[100%] h-[50%] flex flex-col items-start justify-center mt-[3%]">
        <span className="text-black text-[1.2rem]">
          Prediction fee : 1 TOKEN
        </span>
        <div className=" w-[100%] flex items-center justify-between">
          <span className="text-black text-[0.8rem]">
            Participate for 12PM, {date}
          </span>
          <button
            onClick={onclick}
            className="bg-[#099E71] w-[30%] max-w-[100px] min-h-[30px] max-h-[35px] rounded-[10px] text-white text-[0.9rem]"
          >
            Predict
          </button>
        </div>
      </div>
    </div>
  );
};

export default PredictionCard;
