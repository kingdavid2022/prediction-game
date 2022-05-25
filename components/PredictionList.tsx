import React from "react"
import { ListProps } from "../constants/types"
const PredictionList = ({ index, price, owner }:ListProps) => {
    return (
        <div className="flex items-center w-[40%] sm:w-[60%] justify-start ">
            <span className={` ${owner?'text-[#FAEB6B]':'text-white '} text-[1.3rem] font-bold`}>{index} .</span>
            <span className={` ${owner?'text-[#FAEB6B] font-bold':'text-white '} text-[1.3rem] ml-[15px]`}>{price}</span>
        </div>
    )
}

export default PredictionList