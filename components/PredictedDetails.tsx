import React from "react";
import { PredictionDetailsProps } from "../constants/types";

const PredictedDetails = ({ reward, token, completed }: PredictionDetailsProps) => {
  return (
    <div className="w-[90%] h-[40%] min-w-[90%] min-h-[95%] border-[5px] border-black sm:w-[75%] sm:sm:h-[40%] sm:min-h-[250px] sm:min-w-[250px] sm:mr-8 mt-8 bg-white border-black-20 rounded-[10px] flex flex-col items-start justify-start  pl-[8%] ">
      <div className="w-[100%] h-[40%] flex items-center justify-start sm:-mt-3">
        <div className="flex items-center justify-center w-[50%]">
          <span className="text-[#099E71] text-[2.3rem] text-bold ">
            {token}
          </span>
        </div>
      </div>
      <div className="w-[100%]  flex flex-col items-start justify-evenly mt-[8%]">
        <div className="flex flex-col ">
          <span className="text-black text-[1.3rem]">
            {!completed ? "status : OnGoing":`Reward : ${reward} Token`}
          </span>
          <span className="text-black text-[1.3rem]">
            Fee : 1 Token
          </span>
        </div>
      </div>
    </div>
  );
};

export default PredictedDetails;
