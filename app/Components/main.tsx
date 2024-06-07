"use client";

declare var window: any;

import ClothingCard from "./clothingCard";
import ToysCard from "./toysCard";
import ElectronicsCard from "./electronicsCard";
import { useMoralis } from "react-moralis";
import abi from "../../constants/abi.json";
import ca from "../../constants/contractAddresses.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { NextPage } from "next";
import Modal from "./modal";

interface contractAddressesInterface {
  [key: string]: contractAddressesItemInterface;
}

interface contractAddressesItemInterface {
  [key: string]: string[];
}

export interface inStock {
  id: number;
  name: string;
  category: string;
  image: string;
  cost: number | string;
  rating: number;
  stock: number;
  toggleModal?: () => void;
  chooseItem?: (event: any) => void;
}

// export interface clothingProp {
//   clothingAttributes: clothingItem[];
// }

const Main: NextPage = () => {
  const { account, isWeb3Enabled, chainId } = useMoralis();
  const [itemsFromCall, setItemsFromCall] = useState<any[]>();
  const [mainContract, setMainContract] = useState<any>(null);
  const [clothing, setClothing] = useState<inStock[] | null>(null);
  const [electronics, setElectronics] = useState<inStock[] | null>(null);
  const [toys, setToys] = useState<inStock[] | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [presentItem, setPresentItem] = useState<inStock>();

  const addy: contractAddressesInterface = ca;

  const address = chainId
    ? addy[parseInt(chainId).toString()]["web3Ecommerce"][0]
    : null;

  async function getContract() {
    const arr: any[] = [];
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const web3Ecommerce = new ethers.Contract(address!, abi, provider);
    setMainContract(web3Ecommerce);

    for (let i = 0; i < 9; i++) {
      const response = await mainContract?.items(i);
      arr.push(response);
    }
    setItemsFromCall(arr);

    const clothing = arr.filter((item) => item.category === "clothing");
    const electronics = arr.filter((item) => item.category === "electronics");
    const toys = arr.filter((item) => item.category === "toys");

    setClothing(clothing);
    setElectronics(electronics);
    setToys(toys);
  }

  useEffect(() => {
    if (isWeb3Enabled) {
      getContract();
    }
  }, [isWeb3Enabled]);

  const chooseItem = (event: any) => {
    const clickedObj: any = itemsFromCall?.map((obj: any) => {
      if (event.target.id === obj.id) {
        return obj;
      } else {
        console.log(event.target.id, obj.id);
      }
    });
    setPresentItem(clickedObj);
  };

  console.log(presentItem);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="text-black flex gap-y-4 flex-col container mx-auto">
      {showModal && <Modal toggleModal={toggleModal} />}
      <h2 className="text-3xl font-semibold pt-4">U-Bay Best Sellers</h2>
      <div className="">
        <h2 className="capitalize font-semibold text-2xl w-full border-b-2 pb-1 border-black">
          clothing & jewelry
        </h2>
        <div className="md:grid grid-cols-3 flex flex-col gap-y-8 md:gap-y-0 md:gap-x-3 p-3">
          {clothing?.map((item, index) => {
            return (
              <ClothingCard
                key={index}
                id={item.id}
                name={item.name}
                category={item.category}
                image={item.image}
                cost={item.cost}
                rating={item.rating}
                stock={item.stock}
                toggleModal={toggleModal}
                chooseItem={chooseItem}
              />
            );
          })}
        </div>
      </div>

      <div className="">
        <h2 className="capitalize font-semibold text-2xl w-full border-b-2 pb-1 border-black">
          electronics and gadgets
        </h2>
        <div className="md:grid grid-cols-3 flex flex-col gap-y-8 md:gap-y-0 md:gap-x-3 p-3">
          {electronics?.map((item, index) => {
            return (
              <ElectronicsCard
                key={index}
                id={item.id}
                name={item.name}
                category={item.category}
                image={item.image}
                cost={item.cost}
                rating={item.rating}
                stock={item.stock}
                toggleModal={toggleModal}
              />
            );
          })}
        </div>
      </div>

      <div className="">
        <h2 className="capitalize font-semibold text-2xl w-full border-b-2 pb-1 border-black">
          toys and gaming
        </h2>
        <div className="md:grid grid-cols-3 flex flex-col gap-y-8 md:gap-y-0 md:gap-x-3 p-3">
          {toys?.map((item, index) => {
            return (
              <ToysCard
                key={index}
                id={item.id}
                name={item.name}
                category={item.category}
                image={item.image}
                cost={item.cost}
                rating={item.rating}
                stock={item.stock}
                toggleModal={toggleModal}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Main;