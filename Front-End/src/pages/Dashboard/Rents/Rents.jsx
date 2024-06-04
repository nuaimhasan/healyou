/* eslint-disable no-unused-vars */
import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import Spinner from "../../../components/Spinner/Spinner";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Swal from "sweetalert2";
import {
  useDeleteRentMutation,
  useGetAllRentsQuery,
} from "../../../Redux/rent/rentApi";

export default function Rents() {
  const query = {};
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  query["page"] = page;
  query["limit"] = limit;

  const { data, isLoading, isError, error } = useGetAllRentsQuery({
    ...query,
  });

  const [deleteRent] = useDeleteRentMutation();

  const deleteRentHandler = async (id) => {
    const isConfirm = window.confirm("Do you want to delete this order?");

    try {
      if (isConfirm) {
        const result = await deleteRent(id);
        if (result?.data?.success) {
          Swal.fire("", "order delete success", "success");
        }
      }
    } catch (error) {
      Swal.fire(
        "",
        `${error?.data?.error ? error?.data?.error : "something went wrong"}`,
        "error"
      );
    }
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1) return;
    if (data?.meta?.total && pageNumber > data?.meta.total / limit) return;

    setPage(pageNumber);
  };

  let content = null;
  if (isLoading) {
    return (content = <Spinner />);
  }
  if (!isLoading && isError) {
    content = <p>{error.error}</p>;
  }
  if (!isLoading && !isError && data?.data?.length > 0) {
    content = data?.data?.map((order) => (
      <tr key={order?._id}>
        <td>{order?._id}</td>
        <td>
          <p>{order?.product?.title}</p>
          <p className="text-sm text-neutral-content">
            price: {order?.product?.rent?.rent_price}৳ (
            {order?.product?.rent?.rent_type})
          </p>
        </td>
        <td className="text-sm">
          <p>{order?.shipping?.name}</p>
          <p>{order?.shipping?.phone}</p>
          <p>{order?.shipping?.email}</p>
          <p>{order?.shipping?.address}</p>
        </td>
        <td>
          <button
            onClick={() => deleteRentHandler(order?._id)}
            className="hover:text-red-700"
          >
            <AiOutlineDelete />
          </button>
        </td>
      </tr>
    ));
  }

  return (
    <div className="relative overflow-x-auto shadow-lg">
      <table className="dashboard_table">
        <thead>
          <tr>
            <th>Rent Id</th>
            <th>Product</th>
            <th>Customer</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{content}</tbody>
      </table>

      {data?.data?.length > 9 && (
        <div className="flex items-center justify-center mt-16 mb-5">
          <div className="flex items-center space-x-1 border border-gray-300 rounded overflow-hidden text-sm">
            <button
              className="px-4 py-2 text-gray-600 hover:text-gray-800 focus:outline-none"
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              <FaArrowLeft />
            </button>
            <button className="px-4 py-2 bg-gray-700 text-gray-100 font-medium focus:outline-none">
              {page}
            </button>
            <button
              className="px-4 py-2 text-gray-600 hover:text-gray-800 focus:outline-none"
              onClick={() => handlePageChange(page + 1)}
              disabled={data?.meta?.total && page === data?.meta.total / limit}
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
