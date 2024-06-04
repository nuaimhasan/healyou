import { useNavigate, useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../Redux/product/productApi";
import Swal from "sweetalert2";
import { useAddRentMutation } from "../../Redux/rent/rentApi";

export default function RentCheckout() {
  const { id } = useParams();
  const { data } = useGetProductByIdQuery(id);
  const product = data?.data;

  const nagigate = useNavigate();

  const [addRent, { isLoading }] = useAddRentMutation();

  const handlePlaceRent = async (e) => {
    e.preventDefault();

    const shipping = {
      name: e.target.name.value,
      phone: e.target.phone.value,
      email: e.target.email.value,
      address: e.target.address.value,
      note: e.target.note.value,
    };
    const product = id;

    const rentInfo = {
      shipping,
      product,
    };

    const res = await addRent(rentInfo);
    if (res?.data?.success) {
      Swal.fire("", "Rent create successfull", "success");
      e.target.reset();
      nagigate("/products");
    } else {
      Swal.fire("", "something went wrong!", "error");
    }
  };

  return (
    <section>
      <div className="container">
        {" "}
        <form
          onSubmit={handlePlaceRent}
          className="grid lg:grid-cols-3 gap-10 mt-6"
        >
          {/* Shipping Details */}
          <div className="lg:col-span-2">
            <div>
              <h3 className="text-lg font-semibold mb-4 uppercase">
                Shipping Details
              </h3>

              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h3>Full Name *</h3>
                  <input type="text" name="name" required />
                </div>
                <div>
                  <h3>Phone *</h3>
                  <input type="number" name="phone" required />
                </div>
              </div>

              <div className="text-sm mt-2">
                <div>
                  <h3>Email</h3>
                  <input type="email" name="email" />
                </div>
              </div>

              <div className="text-sm mt-2">
                <h3>Full Address *</h3>
                <textarea
                  name="address"
                  rows="3"
                  placeholder="House number and street name"
                  required
                ></textarea>
              </div>

              <div className="text-sm mt-2">
                <h3>Order Note</h3>
                <textarea name="note" rows="4"></textarea>
              </div>
            </div>
          </div>

          {/* Order details */}
          <div>
            <div className="checkout-output bg-gray-50 relative p-6">
              {/* <div className="border-b mb-4 pb-4">
                <h3 className="text-[17px] font-medium text-neutral">
                  Discounts
                </h3>
                <div>
                  <small className="text-neutral-content text-xs">
                    REFERRAL OR PROMO CODE
                  </small>
                  <div className="flex items-center gap-px">
                    <input
                      onChange={(e) => setCouponCode(e.target.value)}
                      type="text"
                      className="text-sm border rounded outline-none w-full px-3 py-[7px]"
                      placeholder="Enter Code"
                      value={couponCode}
                    />
                    <div
                      onClick={handelDiscount}
                      className="primary_btn cursor-pointer"
                      style={{ fontSize: "13px" }}
                      disabled={couponLoading && "disabled"}
                    >
                      {couponLoading ? "Loading..." : "Apply"}
                    </div>
                  </div>
                  <p className="text-red-500 text-xs">{couponError}</p>
                </div>
              </div> */}

              <h3 className="font-semibold text-lg mb-2 text-neutral">
                Rent Summery
              </h3>

              <div className="border-b mb-4 pb-4">
                <h3 className="font-medium text-neutral">Payment Method</h3>

                <ul className="text-sm text-neutral-content flex flex-col gap-1 mt-2">
                  <li className="flex items-center justify-between">
                    <div className="flex items-center">
                      <label htmlFor="cod">Cash On Delivery</label>
                    </div>

                    <div>
                      <img src="" alt="" className="w-4 h-4" />
                    </div>
                  </li>
                </ul>
              </div>
              <div>
                <div className="flex justify-between border-b-2 pb-3 text-title font-semibold">
                  <h3>PRODUCT</h3>
                  <p>PRICE</p>
                </div>

                {/* Product lists */}
                <ul>
                  <li className="flex justify-between border-b py-1.5 text-sm text-paragraph">
                    <div>
                      <h3>{product?.title}</h3>
                    </div>
                    <p>
                      {product?.rent?.rent_price}৳ ({product?.rent?.rent_type})
                    </p>
                  </li>
                </ul>

                {/* <!-- Total --> */}
                <div className="flex justify-between border-b py-2 font-medium text-lg">
                  <h3 className="text-title">Total</h3>
                  <p className="text-primary">
                    <span>
                      {product?.rent?.rent_price}৳ ({product?.rent?.rent_type})
                    </span>
                  </p>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading && "disabled"}
                className="w-full bg-primary text-base-100 py-2 rounded shadow flex justify-center"
              >
                {isLoading ? "Loading..." : "PLACE RENT"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
