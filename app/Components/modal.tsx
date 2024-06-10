import { MdClose } from "react-icons/md";
import { inStock } from "./main";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import abi from "../../constants/abi.json";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { useNotification } from "web3uikit";

interface toggle {
  toggleModal: () => void;
  presentItem: inStock;
  account: string;
  address: any;
}

export default function Modal({
  toggleModal,
  presentItem,
  account,
  address,
}: toggle) {
  const dispatch = useNotification();
  const deployer = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
  const [orderCountNow, setOrderCountNow] = useState<any>(null);
  const [ordersNow, setOrdersNow] = useState<any>(null);
  const [itemBought, setItemBought] = useState<boolean>(false);
  const { isWeb3Enabled } = useMoralis();

  const { runContractFunction: buy } = useWeb3Contract({
    abi: abi,
    contractAddress: address,
    functionName: "buy",
    params: {
      _id: presentItem.id,
    },
    msgValue: presentItem.cost,
  });

  const { runContractFunction: orderCount } = useWeb3Contract({
    abi: abi,
    contractAddress: address,
    functionName: "orderCount",
    params: {
      "": account,
    },
  });

  const { runContractFunction: orders } = useWeb3Contract({
    abi: abi,
    contractAddress: address,
    functionName: "orders",
    params: {
      0: account,
      1: orderCountNow,
    },
  });

  const getOrderCount = async () => {
    const fromCall = await orderCount();
    setOrderCountNow(fromCall);

    const response = await orders();
    setOrdersNow(response);
  };

  async function handleNotification() {
    dispatch({
      type: "info",
      message: "Item bought",
      title: "Tx Notification",
      position: "topR",
      icon: "bell",
    });
  }

  useEffect(() => {
    if (itemBought) {
      getOrderCount();
    }
  }, [account, isWeb3Enabled, itemBought]);

  const handleClick = async () => {
    await buy({
      onSuccess: () => {
        handleNotification(), setItemBought(true);
      },
      onError: (error) => console.log(error),
    });
  };

  console.log(orderCountNow);
  console.log(ordersNow);
  console.log(itemBought)
  return (
    <>
      <div className="bg-black opacity-90 absolute top-0 left-0 w-full h-full" />
      <div className="container mx-auto flex justify-center items-center p-4 relative bg-[#f5f5f5] md:h-[500px]">
        <button
          onClick={toggleModal}
          className="text-4xl font-bold absolute top-2 right-2 text-red-600"
        >
          <MdClose />
        </button>

        <section className="flex md:gap-x-4 md:flex-row flex-col">
          <div className="md:w-1/3">
            <img
              src={presentItem.image}
              alt="item-image"
              className="md:w-full"
            />
          </div>

          <div className="md:w-1/3 space-y-2">
            <h3 className="border-b-2 border-black text-xl font-bold">
              {presentItem.name} <br></br>
              <span>{presentItem.rating.toString()} Star</span>
            </h3>
            <h3 className="font-semibold text-xl border-b-2 border-black">
              {ethers.utils.formatUnits(presentItem.cost.toString(), "ether")}{" "}
              ETH
            </h3>

            <article className="space-y-1">
              <h3 className="text-xl font-semibold">OVERVIEW</h3>
              <p className="">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et,
                recusandae molestias delectus a repudiandae tenetur sunt rem
                illum quos ad obcaecati assumenda porro tempora illo modi,
                voluptas soluta! Reprehenderit, quasi?
              </p>
            </article>
          </div>

          <div className="border-2 h-full md:w-1/3 space-y-3">
            <div>
              <h3 className="font-bold text-xl">
                {ethers.utils.formatUnits(presentItem.cost.toString(), "ether")}{" "}
                ETH
              </h3>
              <h3>
                Free delivery{" "}
                <strong>
                  {new Date(Date.now() + 518400000).toLocaleDateString(
                    undefined,
                    {
                      weekday: "short",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    }
                  )}
                </strong>
              </h3>

              <h3 className="font-semibold">
                {presentItem.stock > 0 ? "In Stock" : "Out of Stock"}
              </h3>
            </div>

            <div className="flex flex-col">
              <button
                disabled={account.toString() === deployer.toLowerCase()}
                onClick={handleClick}
                className="bg-yellow-500 disabled:bg-yellow-700 rounded-full px-6 font-semibold py-2"
              >
                Buy Now
              </button>
            </div>

            <div className="text-xs">
              <h3>Ships from WEB3ECOMMERCE</h3>
              <h3>Sold by U-Bay</h3>

              <h3>
                Item bought on{" "}
                <span>
                  {new Date(Date.now()).toLocaleDateString(undefined, {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </h3>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
