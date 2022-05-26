import Head from "next/head";
import { useState, useEffect, useRef } from "react";
import PredictedDetails from "../components/PredictedDetails";
import PredictionCard from "../components/PredictionCard";

import Web3Modal from "web3modal";
import { providers, Contract, utils } from "ethers";
import {
  TOKEN_ABI,
  TOKEN_ADDRESS,
  ETHUSD_ADDRESS,
  GAME_ABI,
} from "../constants/contract";
import PredictionPage from "../components/PredictionPage";

const Home = () => {
  const [tab, setTab] = useState("contest");
  const [walletConnected, setWalletConnected] = useState(false);
  const [balance, setbalance] = useState(0);
  const [minting, setMinting] = useState(false);
  const web3ModalRef = useRef();
  const [notFirstTime, setnotFirstTime] = useState(false);
  const [nextContestTime, setNextContestTime] = useState();
  const [predict, setpredict] = useState(false)
  const [currentPrice, setCurrentPrice] = useState("");
  const [hours, sethours] = useState(0)
  const [minutes, setminutes] = useState(0)
  const [seconds, setseconds] = useState(0)
  const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);
      getFirstTimeOrNotAndBalance();
      getGameDetails();
      getCurrentPrice();
      readEvents()
    } catch (err) {
      console.error(err);
    }
  };

  const readEvents = async () => {
    try {
      console.log("got here")
      const provider = await getProviderOrSigner();
      const gameContract = new Contract(ETHUSD_ADDRESS, GAME_ABI, provider);
      let eventFilter = gameContract.filters.ContestCancelled();
      let events = await gameContract.queryFilter(eventFilter)
      console.log(events)
    } catch (err) {
      console.error(err);
    }
  }
  const predictPrice = async (amount) => {
    try {
      console.log("got here")
      const signer = await getProviderOrSigner(true);
      console.log(signer)
      const gameContract = new Contract(ETHUSD_ADDRESS, GAME_ABI, signer);
      const tokenContract = new Contract(TOKEN_ADDRESS, TOKEN_ABI, signer);
      let txn = await tokenContract.approve(gameContract.address, utils.parseEther("1"));
      console.log("Approve")

      await txn.wait();
      console.log("Approve complete")
      txn = await gameContract.predict(amount * 100000000);
      await txn.wait();
      console.log("prediction complete")
    } catch (err) {
      console.error(err);
    }
  }

  const getCurrentPrice = async () => {
    try {
      const provider = await getProviderOrSigner();
      const gameContract = new Contract(ETHUSD_ADDRESS, GAME_ABI, provider);
      let [currentPrice, timestamp] = await gameContract.currentResult();
      console.log("currentPrice", currentPrice);
      setCurrentPrice((currentPrice / 100000000).toString());
      console.log("timestamp", timestamp * 1000);
    } catch (err) {
      console.error(err);
    }
  }
  const getGameDetails = async () => {
    try {
      const provider = await getProviderOrSigner();
      const gameContract = new Contract(ETHUSD_ADDRESS, GAME_ABI, provider);

      let lastTimeStamp = (await gameContract.lastTimeStamp()) * 1000;
      let interval = (await gameContract.interval()) * 1000;
      let name = await gameContract.name();
      // console.log("name=>", name);
      // console.log("lastTimeStamp=>", lastTimeStamp);
      // console.log("interval=>", interval);
      setNextContestTime(lastTimeStamp + interval);
      // let date = Date(lastTimeStamp + interval)

    } catch (err) {
      console.error(err);
    }
  };



  const getFirstTimeOrNotAndBalance = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const tokenContract = new Contract(TOKEN_ADDRESS, TOKEN_ABI, signer);
      // Get the address associated to the signer which is connected to  MetaMask
      const address = await signer.getAddress();
      let notFirstTime = await tokenContract.notFirstTime(address);
      let balance = await tokenContract.balanceOf(address);
      setnotFirstTime(notFirstTime);
      setbalance(utils.formatEther(balance));
      console.log(notFirstTime);
      console.log("balance=>", utils.formatEther(balance));
    } catch (err) {
      console.error(err);
    }
  };
  const mintToken = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const tokenContract = new Contract(TOKEN_ADDRESS, TOKEN_ABI, signer);
      // Get the address associated to the signer which is connected to  MetaMask
      const address = await signer.getAddress();
      let notFirstTime = await tokenContract.notFirstTime(address);
      setnotFirstTime(notFirstTime);
      let txn;
      if (notFirstTime) {
        txn = await tokenContract.mint({
          value: utils.parseEther("0.01"),
        });
      } else {
        txn = await tokenContract.mint();
      }
      setMinting(true);
      await txn.wait();
      setMinting(false);
      getFirstTimeOrNotAndBalance();
    } catch (err) {
      console.error(err);
    }
  };
  const getProviderOrSigner = async (needSigner = false) => {
    const connection = await web3ModalRef.current.connect();
    const provider = new providers.Web3Provider(connection);
    const { chainId } = await provider.getNetwork();
    if (chainId !== 42) {
      window.alert("Change the network to Kovan");
      throw new Error("Change network to Kovan");
    }

    if (needSigner) {
      const signer = provider.getSigner();
      return signer;
    }
    return provider;
  };
  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "kovan",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      connectWallet();
    }
  }, [walletConnected]);

  const RenderTabs = () => {
    if (tab == "contest") {
      return (
        <div className="w-[90%] mt-[17vh] grid grid-cols-1 place-items-center sm:grid-cols-3 scrollbar-hide sm:mt-[10%]">
          <PredictionCard
            token={"ETH/USD"}
            timeLeft={"9hr"}
            price={2}
            date={"May 10"}
            onclick={() => setpredict(true)}
            time={new Date(nextContestTime)}
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
    <div className="w-screen h-auto min-h-screen bg-image box-border flex flex-col items-center overflow-x-hidden scrollbar-hide scroll-pt-[10%]">
      <Head>
        <title>Prediction Game</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {
        predict ? (
          <PredictionPage predictPrice={predictPrice} nextContextTime={nextContestTime} currentPrice={currentPrice} onclick={() => setpredict(false)} time={new Date(nextContestTime)} />
        ) : (
          <>
            {walletConnected && (
              <div className="fixed z-[10] flex items-center justify-center top-[80px] sm:top-[60px] min-h-[30px] min-w-[180px] text-white sm:w-[7vw] sm:min-h-[35px] rounded-[10px] sm:max-h-[40px] right-[-10px] sm:right-[0px]">
                balance: {balance}
              </div>
            )}
            {!walletConnected ? (
              <button className="fixed z-[20] bg-[#ffffff]  border-[5px] border-black top-[30px] right-[30px] sm:w-[10vw] min-w-[150px] min-h-[30px] sm:min-h-[35px] rounded-[5px] max-h-[40px] ">
                Connect wallet
              </button>
            ) : (
              <button
                onClick={mintToken}
                className={` fixed z-[10] bg-[#ffffff] top-[50px] sm:top-[20px] min-h-[30px] min-w-[100px] sm:w-[7vw] sm:min-h-[35px] rounded-[10px] sm:max-h-[40px] right-[20px] sm:right-[40px]`}
              >
                {minting ? "Minting" : !notFirstTime ? "Mint" : "Mint(0.01eth)"}
              </button>
            )}

            <div className=" fixed w-[100%] h-[18vh] sm:h-[20vh] flex  items-end sm:items-center justify-start box-border pl-[4%]">
              <button
                onClick={() => setTab("contest")}
                className={`w-[30%] h-[25%] sm:w-[13%] sm:h-[40%] mr-[3%] rounded-[10px] ${tab == "contest" ? "text-[#000000]" : "text-white"
                  } text-[1.3rem] ml-[2%]`}
              >
                Contests
              </button>
              <button
                onClick={() => setTab("Your Predictions")}
                className={` w-[45%] h-[25%] sm:w-[18%] sm:h-[40%]  rounded-[10px] ${tab == "Your Predictions" ? "text-[#000000]" : "text-white"
                  } text-[1.2rem] sm:text-[1.3rem]`}
              >
                Your Predictions
              </button>
            </div>
            <RenderTabs />
          </>
        )
      }

    </div>
  );
};

export default Home;
