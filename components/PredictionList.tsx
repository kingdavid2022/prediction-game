import React from "react"
import { ListProps } from "../constants/types"
const PredictionList = ({ index, price, owner }:ListProps) => {
    return (
        <div className="flex items-center w-[40%] sm:w-[60%] justify-start ">
            <span className={` ${owner?'text-[#099E71]':'text-black '} text-[1.3rem] font-bold`}>{index} .</span>
            <span className={` ${owner?'text-[#099E71] font-bold':'text-black '} text-[1.3rem] ml-[15px]`}>{price}</span>
        </div>
    )
}

export default PredictionList