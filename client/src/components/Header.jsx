import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserRound, ShoppingCart, Heart, Search } from "lucide-react";
import { Button } from "./ui/button";

import { useDispatch, useSelector } from "react-redux";
import { openCart, setSearchText } from "@/redux/slices/headerSlice";
import { fetchAllFilteredProducts } from "@/redux/slices/productSlice";

const categories = [
  {
    id: 1,
    name: "Keychain",
    path: "/",
  },
  {
    id: 2,
    name: "magnetic Badge",
    path: "/",
  },
  {
    id: 3,
    name: "Metal Pen",
    path: "/",
  },
  {
    id: 4,
    name: "Mobile Stand",
    path: "/",
  },
  {
    id: 5,
    name: "Corporate Gifts",
    path: "/",
  },
];

const Header = () => {
  const dispatch = useDispatch();
  const { searchText } = useSelector((state) => state.header);

  const navigate = useNavigate();

  const onSearchSubmit = (e) => {
    console.log("searching");
    e.preventDefault();

    dispatch(fetchAllFilteredProducts(searchText));
    navigate(`/products?search=${searchText}`);
  };

  return (
    <header className="shadow-md shadow-gray-500 py-4">
      <div className="md:mx-16 flex justify-between items-center ">
        <NavLink to={"/"}>
          <img
            src="/public/PRINTMINE_FINAL_LOGO_1.avif"
            alt="logo"
            className="w-40"
          />
        </NavLink>
        <div className=" justify-between items-center gap-4 hidden md:flex ">
          {categories.map((category) => (
            <NavLink
              key={category.id}
              to={category.path}
              className="hover:text-blue-600"
            >
              <span>{category.name}</span>
            </NavLink>
          ))}
        </div>
        <form
          className="flex border-2 border-black p-1 rounded-2xl px-4 w-50 "
          onSubmit={onSearchSubmit}
        >
          <input
            type="search"
            value={searchText}
            onChange={(e) => dispatch(setSearchText(e.target.value))}
            className="border-0 focus:border-none focus:outline-none w-full"
            placeholder="Search here.."
          />
          <button className="cursor-pointer">
            <Search />
          </button>
        </form>

        <div className="flex justify-center gap-6 items-center">
          <UserRound />
          <Heart />
          <Button
            onClick={() => {
              console.log("open ");
              dispatch(openCart());
            }}
            className="cursor-pointer bg-white text-black hover:bg-transparent "
          >
            <ShoppingCart />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
