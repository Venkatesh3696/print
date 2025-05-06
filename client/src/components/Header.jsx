import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserRound, ShoppingCart, Heart, SearchIcon } from "lucide-react";
import { Button } from "./ui/button";

import { useDispatch, useSelector } from "react-redux";
import { openCart, openSearch } from "@/redux/slices/headerSlice";
import SearchInput from "./SearchInput";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { logoutUser } from "@/redux/slices/authSlice";

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
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  const renderUserAccount = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <UserRound />
          <p className="sr-only">Account</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          <UserRound />
        </DropdownMenuLabel>

        <DropdownMenuItem>Profile</DropdownMenuItem>
        {isAuthenticated ? (
          <DropdownMenuGroup>
            <DropdownMenuItem>My Orders</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleLogout()}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuGroup>
        ) : (
          <NavLink>
            <DropdownMenuItem onClick={() => navigate("/login")}>
              Login
            </DropdownMenuItem>
          </NavLink>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <header className="shadow-md shadow-gray-500 py-4 bg-white sticky top-0 z-50 opacity-100">
      <div className="md:mx-16 flex justify-between items-center ">
        <NavLink to={"/"}>
          <img src="/PRINTMINE_FINAL_LOGO_1.avif" alt="logo" className="w-40" />
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

        <div className="flex justify-center gap-6 items-center">
          <Button
            onClick={() => {
              dispatch(openSearch());
            }}
            className="cursor-pointer bg-white text-black hover:bg-transparent "
          >
            <SearchIcon />
          </Button>
          {/* {renderAccount()} */}
          {renderUserAccount()}
          <Heart />
          <Button
            onClick={() => {
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
