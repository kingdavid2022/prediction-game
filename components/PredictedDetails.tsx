import React from "react";
import { PredictionDetailsProps } from "../constants/types";

const PredictedDetails = ({ reward, token }: PredictionDetailsProps) => {
  return (
    <div className="w-[90%] h-[40%] min-w-[90%] min-h-[95%] border-[5px] border-black sm:w-[75%] sm:sm:h-[40%] sm:min-h-[300px] sm:min-w-[300px] sm:mr-8 mt-8 bg-white border-black-20 rounded-[10px] flex flex-col items-center justify-start p-[4%]">
      <div className="w-[100%] h-[40%] flex items-center justify-between sm:-mt-3">
        <div className="flex items-center justify-start w-[50%]">
          <span className="text-[black] text-[2.3rem] text-bold ml-3">
            {token}
          </span>
        </div>
      </div>
      <div className="w-[100%]  flex flex-col items-start justify-evenly">
        <div className="flex flex-col sm:-mt-3">
          <span className="text-black text-[1.4rem]">
            Reward : {reward} Token
          </span>
          <span className="text-black text-[1.4rem]">
            Fee : 1 Token
          </span>
        </div>
      </div>
    </div>
  );
};

export default PredictedDetails;
