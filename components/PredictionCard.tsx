import { useRouter } from "next/router";
import React from "react"
import { PredictionCardProps } from '../constants/types';

const PredictionCard = ({ logo, token, timeLeft, price, date}:PredictionCardProps) => {

    const router = useRouter();

    return (
        <div  className="w-[90%] sm:w-[40vw] sm:h-[25vh] sm:max-w-[350px] sm:max-h-[250px] bg-gradient-to-r from-[#1D3736]  to-[#07580A] rounded-[15px] m-5 shadow-prediction box-border p-[3%]">
            <div className="w-[100%] h-[40%] flex items-center justify-between">
                <div className="flex items-center justify-start w-[50%]">
                <img src={logo} alt="" className=" rounded-[100%] w-[50px] h-[50px] min-w-[50px] min-h-[50px] max-w-[50px] max-h-[50px]" />
                <span className="text-[#6BB5FA] text-[2.3rem] text-bold ml-3">{token}</span>
                </div>
                <span className="text-[#FAEB6B] text-[1.5rem] text-bold ml-[-30%]">{timeLeft} Left</span>
            </div>
            <div className="w-[100%] h-[50%] flex flex-col items-start justify-center mt-[3%]">
                <span className="text-white text-[1.2rem]">Prediction fee : {price} {token}</span>
                <div className=" w-[100%] flex items-center justify-between">
                    <span className="text-white text-[0.8rem]">Participate for 12PM, {date}</span>
                    <button onClick={() => router.push(`/prediction/price=${price}token=${token}`)} className="bg-[#099E71] w-[30%] max-w-[100px] min-h-[30px] max-h-[35px] rounded-[10px] text-white text-[0.9rem]">Predict</button>
                </div>
            </div>
        </div>
    )
}

export default PredictionCard