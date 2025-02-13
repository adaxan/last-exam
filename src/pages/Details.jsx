import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GoChevronLeft } from "react-icons/go";
import useCard from "../store/useCard";
import ReactModal from "react-modal";

ReactModal.setAppElement("#root");

function Details() {
  const { id } = useParams();
  const [infoData, setInfoData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { cards, deleteCard, updateCard } = useCard();

  useEffect(() => {
    const data = cards.find((val) => val.id == id);
    setInfoData(data || null);
  }, [id, cards]);

  if (!infoData) {
    return <div className="text-center py-10">Loading...</div>;
  }

  function handleDelete() {
    setIsModalOpen(true);
  }

  function handleDeleteConfirm() {
    deleteCard(infoData.id);
    setIsModalOpen(false);
    navigate(-1);
  }

  function handleEdit() {
    navigate(`/details/${infoData.id}`);
  }

  function handlePaid() {
    if (infoData.status != "paid") {
      const updatedInfo = { ...infoData, status: "paid" };
      updateCard(infoData.id, updatedInfo);
      setInfoData(updatedInfo);
    }
  }

  return (
    <div className="container mx-auto max-w-3xl py-10 h-screen ">
      <div
        className="flex items-center gap-3 cursor-pointer text-purple-500"
        onClick={() => navigate(-1)}
      >
        <GoChevronLeft size={20} />
        <h3 className="font-semibold">Go back</h3>
      </div>
      <div className="bg-white shadow-md p-6 mt-6 rounded-lg flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center gap-4">
          <h2 className="text-gray-500">Status</h2>
          <div
            className={`px-4 py-2 rounded-md flex items-center gap-2 text-sm font-semibold 
            ${
              infoData.status == "paid"
                ? "bg-green-100 text-green-500"
                : infoData.status == "pending"
                ? "bg-yellow-100 text-yellow-500"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            <span
              className={`w-3 h-3 rounded-full 
              ${
                infoData.status == "paid"
                  ? "bg-green-500"
                  : infoData.status == "pending"
                  ? "bg-yellow-500"
                  : "bg-gray-500"
              }`}
            />
            {infoData.status}
          </div>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <button
            onClick={handleEdit}
            className="px-8 py-3 rounded-3xl bg-gray-100 hover:bg-gray-200 "
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-6 py-2 rounded-3xl bg-red-500 text-white hover:bg-red-600"
          >
            Delete
          </button>
          <button
            onClick={handlePaid}
            className="px-8 py-3 rounded-3xl bg-purple-600 text-white hover:bg-purple-700"
          >
            Mark as Paid
          </button>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg p-8 mt-6">
        <div className="flex flex-col md:flex-row justify-between">
          <div>
            <h1 className="text-lg font-bold">
              <span className="text-purple-700">#</span>
              {infoData.id}
            </h1>
            <p className="text-gray-500">{infoData.description}</p>
          </div>
          <div className="text-sm text-gray-500 text-right">
            <p>{infoData.senderAddress.street}</p>
            <p>{infoData.senderAddress.city}</p>
            <p>{infoData.senderAddress.postCode}</p>
            <p>{infoData.senderAddress.country}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          <div className="flex flex-col gap-5">
            <div>
              <h3 className="text-gray-400">Invoice Date</h3>
              <h1 className="font-semibold">{infoData.createdAt}</h1>
            </div>
            <div>
              <h3 className="text-gray-400">Payment Due</h3>
              <h1 className="font-semibold">{infoData.paymentDue}</h1>
            </div>
          </div>
          <div>
            <h3 className="text-gray-400">Bill to</h3>
            <h1 className="text-xl font-semibold">{infoData.clientName}</h1>
            <div className="flex flex-col gap-1 mt-2">
              <h3 className="text-gray-400 text-sm">
                {infoData.clientAddress.street}
              </h3>
              <h3 className="text-gray-400 text-sm">
                {infoData.clientAddress.city}
              </h3>
              <h3 className="text-gray-400 text-sm">
                {infoData.clientAddress.postCode}
              </h3>
              <h3 className="text-gray-400 text-sm">
                {infoData.clientAddress.country}
              </h3>
            </div>
          </div>
          <div>
            <h3 className="text-gray-400">Sent to</h3>
            <h1 className="font-semibold">{infoData.clientEmail}</h1>
          </div>
        </div>
        <div className="bg-gray-50 p-6 mt-8 rounded-lg">
          {infoData.items.map((item, index) => (
            <div
              key={index}
              className="flex justify-between py-2 border-b last:border-none"
            >
              <span className="font-semibold">{item.name}</span>
              <span className="text-gray-500">£{item.total}</span>
            </div>
          ))}
        </div>
        <div className="bg-gray-800 text-white flex justify-between p-6 rounded-b-lg">
          <h3 className="text-xl">Amount Due</h3>
          <h1 className="text-2xl">£{infoData.total}</h1>
        </div>
      </div>
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Delete Confirmation"
        className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto mt-32"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-lg font-bold">Confirm Deletion</h2>
        <p className="text-gray-600 mt-2">
          Are you sure you want to delete invoice{" "}
          <span className="font-bold">#{infoData.id}</span>? This action cannot
          be undone.
        </p>
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => setIsModalOpen(false)}
            className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteConfirm}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </ReactModal>
    </div>
  );
}

export default Details;