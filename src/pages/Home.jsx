import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MdKeyboardArrowRight } from "react-icons/md";
import Plus from "../assets/images/plus.svg";
import Nothing from "../assets/images/nothing.png";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import useCard from "../store/useCard";
import { Toaster, toast } from "sonner";

function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { cards } = useCard();
  const [filter, setFilter] = useState("");
  const [filtered, setFiltered] = useState(cards);
  // const [theme, setTheme] = useState(getTheme());

  function getTheme() {
    return localStorage.getItem("theme") === "dark" ? "dark" : "light";
  }

  const addressRef = useRef();
  const cityRef = useRef();
  const postCodeRef = useRef();
  const countryRef = useRef();
  const clientNameRef = useRef();
  const emailRef = useRef();
  const strAddressRef = useRef();
  const city2Ref = useRef();
  const postCode2Ref = useRef();
  const country2Ref = useRef();
  const emailDesignRef = useRef();

  const dateRef = useRef();
  const paymentRef = useRef();
  const descRef = useRef();
  const itemNameRef = useRef();
  const quantityRef = useRef();
  const priceRef = useRef();
  const quantity2Ref = useRef();
  const price2Ref = useRef();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  function validate() {
    if (addressRef.current.value.length < 3) {
      alert("Address length can't be less than 3 characters");
      addressRef.current.focus();
      addressRef.current.style.outlineColor = "red";
      return false;
    }
    if (cityRef.current.value.length < 2 && city2Ref.current.value.length < 2) {
      alert("City length can't be less than 2 characters");
      city2Ref.current.focus();
      cityRef.current.focus();
      cityRef.current.style.outlineColor = "red";
      city2Ref.current.style.outlineColor = "red";
      zZ;
      return false;
    }
    if (
      postCodeRef.current.value.length < 3 &&
      postCode2Ref.current.value.length < 3
    ) {
      alert("Postcode length can't be less than 3 characters");
      postCode2Ref.current.focus();
      postCodeRef.current.focus();
      postCodeRef.current.style.outlineColor = "red";
      postCode2Ref.current.style.outlineColor = "red";
      return false;
    }
    if (
      countryRef.current.value.length < 3 &&
      country2Ref.current.value.length < 3
    ) {
      alert("Country length can't be less than 3 characters");
      country2Ref.current.focus();
      countryRef.current.focus();
      countryRef.current.style.outlineColor = "red";
      country2Ref.current.style.outlineColor = "red";
      return false;
    }
    if (!validateEmail(emailRef.current.value)) {
      alert("Email is not valid");
      emailRef.current.focus();
      emailRef.current.style.outlineColor = "red";
      return false;
    }
    if (clientNameRef.current.value.length < 2) {
      alert("Client name length can't be less than 2 characters");
      clientNameRef.current.focus();
      clientNameRef.current.style.outlineColor = "red";
      return false;
    }
    if (!validateEmail(emailDesignRef.current.value)) {
      alert("Designated email is not valid");
      emailDesignRef.current.focus();
      emailDesignRef.current.style.outlineColor = "red";
      return false;
    }
    if (strAddressRef.current.value.length < 2) {
      alert("Sender address length can't be less than 2 characters");
      strAddressRef.current.focus();
      strAddressRef.current.style.outlineColor = "red";
      return false;
    }
    if (city2Ref.current.value < 2) {
      alert("City length can't be less than 2 characters");
      city2Ref.current.focus();
      city2Ref.current.style.outlineColor = "red";
      return false;
    }
    if (dateRef.current.value.length < 2) {
      alert("Date length can't be less than 2 characters");
      dateRef.current.focus();
      dateRef.current.style.outlineColor = "red";
      return false;
    }
    if (descRef.current.value.length < 2) {
      alert("Description length can't be less than 2 characters");
      descRef.current.focus();
      descRef.current.style.outlineColor = "red";
      return false;
    }
    if (itemNameRef.current.value.length < 2) {
      alert("Item name length can't be less than 2 characters");
      itemNameRef.current.focus();
      itemNameRef.current.style.outlineColor = "red";
      return false;
    }
    if (quantityRef.current.value.length < 1) {
      alert("Quantity must be greater than 0");
      quantityRef.current.focus();
      quantityRef.current.style.outlineColor = "red";
      return false;
    }
    if (priceRef.current.value.length < 1) {
      alert("Price must be greater than 0");
      priceRef.current.focus();
      priceRef.current.style.outlineColor = "red";
      return false;
    }
    if (quantity2Ref.current.value.length < 1) {
      alert("Quantity must be greater than 0");
      quantity2Ref.current.focus();
      quantity2Ref.current.style.outlineColor = "red";
      return false;
    }
    if (price2Ref.current.value.length < 1) {
      alert("Price must be greater than 0");
      price2Ref.current.focus();
      price2Ref.current.style.outlineColor = "red";
      return false;
    }

    return true;
  }

  function handleSave(status = "pending") {
    const isValid = validate();
    if (!isValid) return;

    const newInvoice = {
      id: Date.now(),
      createdAt: dateRef.current.value,
      paymentDue: dateRef.current.value,
      description: descRef.current.value,
      paymentTerms: paymentRef.current.value,
      clientName: clientNameRef.current.value,
      clientEmail: emailRef.current.value,
      status: status,
      senderAddress: {
        street: addressRef.current.value,
        city: cityRef.current.value,
        postCode: postCodeRef.current.value,
        country: countryRef.current.value,
      },
      clientAddress: {
        street: strAddressRef.current.value,
        city: city2Ref.current.value,
        postCode: postCode2Ref.current.value,
        country: country2Ref.current.value,
      },
      items: [
        {
          name: itemNameRef.current.value,
          quantity: Number(quantityRef.current.value),
          price: Number(priceRef.current.value),
          total:
            Number(quantityRef.current.value) * Number(priceRef.current.value),
        },
      ],
      total: Number(quantityRef.current.value) * Number(priceRef.current.value),
    };

    useCard.getState().addCard(newInvoice);

    setIsOpen(false);
  }

  function handleDetails(id) {
    navigate(`/details/${id}`);
  }

  function filterData(status) {
    if (status == "all") {
      setFiltered(cards);
    } else {
      const filteredInvoice = cards.filter(
        (invoice) => invoice.status == status
      );
      setFiltered(filteredInvoice);
    }
  }

  return (
    <div className="relative flex flex-col items-center p-10 bg-gray-50 min-h-screen dark:bg-black ">
      <Toaster />
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? "0%" : "-100%" }}
        transition={{ duration: 0.4 }}
        className={`fixed top-0 left-[80px] h-full w-1/2  bg-white shadow-2xl p-8 z-50 overflow-y-auto dark:bg-black
          ${isOpen ? "visible" : "invisible"}`}
      >
        <h2 className="text-2xl font-bold text-gray-900">New Invoice</h2>
        <div className="mt-4 space-y-4 mb-20">
          <h3 className="text-purple-500 font-semibold">Bill From</h3>
          <div className="flex flex-col ">
            <label className="text-gray-500 mb-2 font-medium">
              Street addres
            </label>
            <input
              className="input w-full text-black border border-gray-500"
              type="text"
              placeholder="Street Address"
              ref={addressRef}
            />
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col">
              <label className="text-gray-500 mb-2 font-medium">City</label>
              <input
                className="input rounded-md border border-gray-500"
                type="text"
                placeholder="City"
                ref={cityRef}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-500 mb-2 font-medium">
                Post Code
              </label>
              <input
                className="input rounded-md border border-gray-500"
                type="text"
                placeholder="Post Code"
                ref={postCodeRef}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-500 mb-2 font-medium">Country</label>
              <input
                className="input rounded-md border border-gray-500"
                type="text"
                placeholder="Country"
                ref={countryRef}
              />
            </div>
          </div>
          <h3 className="text-purple-500 font-semibold">Bill To</h3>
          <div className="flex flex-col">
            <div className="flex flex-col mb-5">
              <label className="text-gray-500 mb-2 font-medium">
                Client's Name
              </label>
              <input
                className="input rounded-md border border-gray-500"
                type="text"
                placeholder="Client's Name"
                ref={clientNameRef}
              />
            </div>
            <div className="flex flex-col mb-5">
              <label className="text-gray-500 mb-2 font-medium">
                Client's email
              </label>
              <input
                className="input rounded-md border border-gray-500"
                type="email"
                placeholder="Client's Email"
                ref={emailRef}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-500 mb-2 font-medium">
                Street address
              </label>
              <input
                className="input rounded-md border border-gray-500"
                type="text"
                placeholder="Street Address"
                ref={strAddressRef}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col">
              <label className="text-gray-500 mb-2 font-medium">City</label>
              <input
                className="input rounded-md border border-gray-500"
                type="text"
                placeholder="City"
                ref={city2Ref}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-500 mb-2 font-medium">
                Post Code
              </label>
              <input
                className="input rounded-md border border-gray-500"
                type="text"
                placeholder="Post Code"
                ref={postCode2Ref}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-500 mb-2 font-medium">Country</label>
              <input
                className="input rounded-md border border-gray-500"
                type="text"
                placeholder="Country"
                ref={country2Ref}
              />
            </div>
          </div>
          <div className="flex gap-10">
            <div className="flex flex-col">
              <label className="text-gray-500 mb-2 font-medium">
                Invoice Date
              </label>
              <input
                className="rounded-md border border-gray-300 p-3 text-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-200 shadow-sm hover:border-purple-400"
                type="date"
                placeholder="Invoice Date"
                ref={dateRef}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-500 mb-2 font-medium">
                Payment terms
              </label>
              <select
                className="input w-44 border border-gray-500"
                ref={paymentRef}
              >
                <option value="1">Net 1 Day</option>
                <option value="7">Net 7 Days</option>
                <option value="14">Net 14 Days</option>
                <option value="30">Net 30 Days</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-500 mb-2 font-medium">
              Project Description
            </label>
            <textarea
              className="input w-full h-40 resize-none  border border-gray-500"
              placeholder="Project Description"
              ref={descRef}
            />
          </div>
          <h3 className="text-purple-500 font-semibold">Item List</h3>
          <div className="">
            <div className="flex gap-1">
              <div className="flex flex-col">
                <label className="text-gray-500 mb-2 font-medium">
                  Item Name
                </label>
                <input
                  className="input mb-4 w-2/3"
                  type="text"
                  placeholder="Enter item name"
                  ref={itemNameRef}
                />
                <input
                  className="input w-2/3"
                  type="text"
                  placeholder="Enter email"
                  ref={emailDesignRef}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-500 mb-2 font-medium">Qty</label>
                <input
                  className="input mb-4 w-2/3"
                  type="number"
                  placeholder="Qty"
                  ref={quantityRef}
                />
                <input
                  className="input w-2/3"
                  type="number"
                  placeholder="Qty"
                  ref={quantity2Ref}
                />
              </div>
              <div className="flex flex-col mb-2">
                <label className="text-gray-500 mb-2 font-medium">Price</label>
                <input
                  className="input mb-4 w-2/3"
                  type="number"
                  placeholder="Price"
                  ref={priceRef}
                />
                <input
                  className="input w-2/3"
                  type="number"
                  placeholder="Price"
                  ref={price2Ref}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-500 mb-2 font-medium">Total</label>
                <span>156$</span>
                <span>156$</span>
              </div>
              <div className="flex flex-col mx-auto mt-10">
                <MdDelete
                  size={"1.5rem"}
                  className="mb-12 cursor-pointer hover:text-purple-700 transition-all"
                />
                <MdDelete
                  size={"1.5rem"}
                  className="cursor-pointer hover:text-purple-700 transition-all"
                />
              </div>
            </div>
          </div>
          <div className=" flex justify-center items-center">
            <button className="btn w-full text-[#9277FF]">
              + Add New Item
            </button>
          </div>
        </div>
        <div>
          <div className="fixed bottom-0 left-20 w-[750px] bg-white py-4 px-6 shadow-md flex gap-40">
            <button
              onClick={() => setIsOpen(false)}
              className="btn bg-white text-[#9277FF] w-[150px] rounded-[50px] border border-[#9277FF] px-6 py-3 shadow-md font-medium transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
            >
              Discard
            </button>
            <div className="flex gap-4">
              <button
                onClick={() => handleSave("draft")}
                className="btn bg-[#1E2139] text-[#9277FF] w-[150px] rounded-[50px] hover:bg-[#0C0E16] px-6 py-3 shadow-md font-medium transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
              >
                Save as Draft
              </button>
              <button
                onClick={() => handleSave("pending")}
                className="btn w-[150px] rounded-[50px] bg-[#7C5DFA] text-white hover:bg-[#9277FF] px-6 py-3l shadow-md font-medium transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
              >
                Save & Send
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="p-6 bg-gray-50 w-full max-w-4xl mx-auto">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Invoices</h1>
            <h3 className="text-sm text-gray-500">
              There are {cards.length} total invoices
            </h3>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative w-52">
              <select
                onChange={(e) => filterData(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white appearance-none text-gray-700"
              >
                <option value="all">All</option>
                <option value="draft">Draft</option>
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                ▼
              </div>
            </div>

            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-2xl shadow-md font-medium transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
            >
              <img src={Plus} alt="Plus Icon" className="w-5 h-5" />
              <span className="text-sm font-medium ">New Invoice</span>
            </button>
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="mt-10 space-y-4 max-h-[500px] overflow-y-auto scroll-m-0">
            {filtered.map((value, index) => (
              <div
                key={index}
                className="flex items-center bg-white p-5 rounded-lg shadow-sm cursor-pointer hover:border border-white transition-all hover:shadow-xl"
                onClick={() => {
                  handleDetails(value.id);
                }}
              >
                <h2 className="font-semibold text-gray-700 w-1/5">
                  <span className="text-[#7C5DFA]">#</span>
                  {value.id}
                </h2>
                <span className="text-gray-500 w-1/5">
                  Due {value.paymentDue}
                </span>
                <span className="text-gray-700 w-1/5">{value.clientName}</span>
                <span className="font-bold text-lg w-1/5">
                  £ {value.total.toFixed(2)}
                </span>
                <div className="flex items-center justify-between w-1/5">
                  <div
                    className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm text-center
            ${
              value.status == "paid"
                ? "bg-green-100 text-green-500"
                : value.status == "pending"
                ? "bg-yellow-100 text-yellow-500"
                : "bg-gray-200 text-black"
            }`}
                  >
                    <span className="w-2 h-2 bg-current rounded-full" />
                    <span>
                      {value.status.charAt(0).toUpperCase() +
                        value.status.slice(1)}
                    </span>
                  </div>
                  <MdKeyboardArrowRight className="text-purple-500 text-2xl" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-10">
            <img src={Nothing} alt="Empty" className="w-64 mb-6" />
            <h2 className="text-lg font-semibold text-gray-900">
              There is nothing here
            </h2>
            <p className="text-gray-500">
              Create an invoice by clicking the <br />
              <span className="font-semibold text-purple-600">
                New Invoice
              </span>{" "}
              button and get started
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
