"use state";
import { ethers } from "ethers";
import { inStock } from "./main";
import { IoIosStar } from "react-icons/io";


export default function ElectronicsCard({
  id,
  name,
  category,
  image,
  cost,
  rating,
  stock,
}: inStock) {
  return (
    <div className="flex flex-col gap-y-2 mx-auto ">
      <img src={image} alt="next" className="border w-[80%] md:w-full  " />
      <div className="">
        <h3 className="font-semibold text-xl">{name}</h3>
        <div className="flex items-start">
          <h3 className="inline">
            <strong>{rating.toString()}</strong>
          </h3>
          <h3 className="text-yellow-500 text-xl">
            <IoIosStar />
          </h3>
        </div>
        <h3>{ethers.utils.formatUnits(cost.toString(), "ether")} ETH</h3>
      </div>
    </div>
  );
}
