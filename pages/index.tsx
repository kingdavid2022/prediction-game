import { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import PredictedDetails from "../components/PredictedDetails";
import PredictionCard from "../components/PredictionCard";
import { Tabs } from "../constants/types";

const Home: NextPage = () => {
  const [tab, setTab] = useState<Tabs>("contest");

  const RenderTabs = () => {
    if (tab == "contest") {
      return (
        <div className="w-[90%] mt-[17vh] grid grid-cols-1 place-items-center sm:grid-cols-3 scrollbar-hide sm:mt-[10%]">
          <PredictionCard
            logo={
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAL0AAAELCAMAAAC77XfeAAAAA1BMVEW3t7eZ6ssfAAAASElEQVR4nO3BMQEAAADCoPVPbQ0PoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADeDcYqAAE00FRDAAAAAElFTkSuQmCC"
            }
            token={"Matic"}
            timeLeft={"9hr"}
            price={2}
            date={"May 10"}
          />
        </div>
      );
    } else if (tab == "Your Predictions") {
      return (
        <div className=" w-[90%] flex flex-col items-center overflow-y-scroll h-auto  sm:grid  place-items-center sm:grid-cols-3  scrollbar-hide mt-[17vh] sm:mt-[10%]">
          <PredictedDetails
            logo="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAL0AAAELCAMAAAC77XfeAAAAA1BMVEW3t7eZ6ssfAAAASElEQVR4nO3BMQEAAADCoPVPbQ0PoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADeDcYqAAE00FRDAAAAAElFTkSuQmCC"
            Fee={2}
            date="May 10"
            predictedValue={"0.0003"}
            frequency={2}
            price={2}
            token="Matic"
            reward={1}
          />
        </div>
      );
    } else return null;
  };

  return (
    <div className="w-screen h-auto min-h-screen bg-black box-border flex flex-col items-center overflow-x-hidden scrollbar-hide scroll-pt-[10%]">
      <Head>
        <title>Prediction Game</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <button className="fixed z-[10] bg-[#099E71] top-[10px] sm:w-[10vw] min-w-[150px] min-h-[30px] sm:min-h-[35px] rounded-[10px] max-h-[40px] right-[10px]">
        Connect wallet
      </button>
      <button className="fixed z-[10] bg-[#099E71] top-[50px] sm:top-[10px] min-h-[30px] min-w-[100px] sm:w-[7vw] sm:min-h-[35px] rounded-[10px] sm:max-h-[40px] right-[20px] sm:right-[12vw]">
        Mint
      </button>
      <div className=" fixed w-[100%] h-[18vh] sm:h-[20vh] flex bg-black items-end sm:items-center justify-start box-border pl-[4%]">
        <button
          onClick={() => setTab("contest")}
          className={`w-[30%] h-[30%] sm:w-[13%] sm:h-[40%] bg-[#343434] mr-[3%] rounded-[10px] ${
            tab == "contest" ? "text-[#099E71]" : "text-white"
          } text-[1.3rem] ml-[2%]`}
        >
          Contests
        </button>
        <button
          onClick={() => setTab("Your Predictions")}
          className={` w-[45%] h-[30%] sm:w-[18%] sm:h-[40%] bg-[#343434] rounded-[10px] ${
            tab == "Your Predictions" ? "text-[#099E71]" : "text-white"
          } text-[1.2rem] sm:text-[1.3rem]`}
        >
          Your Predictions
        </button>
      </div>
      <RenderTabs />
    </div>
  );
};

export default Home;
