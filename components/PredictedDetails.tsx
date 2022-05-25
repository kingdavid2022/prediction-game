import React from "react";
import { PredictionDetailsProps } from "../constants/types";

const PredictedDetails = ({ Fee, date, logo, predictedValue, price, reward, token, frequency }:PredictionDetailsProps) => {
  return (
    <div className="w-[90%] h-[40%] min-w-[90%] min-h-[95%] sm:w-[75%] sm:sm:h-[40%] sm:min-h-[300px] sm:min-w-[300px] sm:mr-8 mt-8 bg-gradient-to-r from-[#1D3736]  to-[#07580A] rounded-[15px] flex flex-col items-center justify-start p-[4%]">
      <div className="w-[100%] h-[40%] flex items-center justify-between sm:-mt-3">
        <div className="flex items-center justify-start w-[50%]">
          <img
            src={logo}
            alt=""
            className="rounded-[100%] w-[50px] h-[50px] min-w-[50px] min-h-[50px] max-w-[50px] max-h-[50px]"
          />
          <span className="text-[#6BB5FA] text-[2.3rem] text-bold ml-3">
            {token}
          </span>
        </div>
      </div>
      <div className="w-[100%]  flex flex-col items-start justify-evenly">
        <div className="flex flex-col sm:-mt-3">
          <span className="text-white text-[1.4rem]">
            Prediction Fee : {Fee} {token}
          </span>
          <span className="text-white text-[0.9rem]">Participate for 12 PM , {date}</span>
        </div>
        <div className="w-[80%] flex items-center justify-between mt-3">
          <div className="flex flex-col">
            <span className="text-white text-[0.7rem]">Frequency</span>
            <span className="text-white text-[1.2rem] ml-3">{frequency}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-white text-[0.7rem]">Total Fee</span>
            <span className="text-white text-[1.2rem]">{frequency * price} {token}</span>
          </div>
        </div>
        <div className="w-[80%] flex items-center justify-between my-2">
          <div className="flex flex-col">
            <span className="text-white text-[0.7rem]">Your Prediction</span>
            <span className="text-white text-[1.2rem]">{predictedValue}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-white text-[0.7rem]">Reward</span>
            <span className="text-white text-[1.2rem]">{reward} {token}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictedDetails;
