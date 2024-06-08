import { MdClose } from "react-icons/md";
import { inStock } from "./main";

interface toggle {
  toggleModal: () => void;
  presentItem: inStock
}

export default function Modal({ toggleModal, presentItem }: toggle) {
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
            <img src="/next.svg" alt="item-image" className="md:w-full" />
          </div>

          <div className="md:w-1/3 space-y-2">
            <h3 className="border-b-2 border-black text-xl font-bold">
              Name <br></br> <span>5 Star</span>
            </h3>
            <h3 className="font-semibold text-xl border-b-2 border-black">
              2.5 ETH
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
              <h3 className="font-bold text-xl">2.5 ETH</h3>
              <h3>
                Free delivery <span>{}</span>
              </h3>

              <h3>In stock</h3>
            </div>

            <button className="bg-yellow-500 rounded-full px-6 font-semibold py-2">
              Buy Now
            </button>

            <div className="text-xs">
              <h3>Ships from WEB3ECOMMERCE</h3>
              <h3>Sold by U-Bay</h3>

              <h3>
                Item bought on <span>{}</span>
              </h3>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
