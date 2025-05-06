import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeSearch } from "@/redux/slices/headerSlice";
import { Search } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import API from "@/utils/axiosInstance";
import { setKeyword } from "@/redux/slices/searchSlice";

const SearchDialog = () => {
  const { isSearchOpen } = useSelector((state) => state.header);
  const { keyword } = useSelector((state) => state.search);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle search input changes
  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    dispatch(setKeyword(query));

    console.log({ keyword });

    if (query.length > 2) {
      try {
        const { data } = await API.get("/api/products", {
          params: { search: query },
        });
        console.log(data);
        setSearchResults(data?.products?.slice(0, 5));
      } catch (error) {
        setSearchResults([]);
        console.error("Search failed:", error);
      }
    } else {
      setSearchResults([]);
    }
  };

  // Handle product selection
  const handleProductSelect = (productId) => {
    dispatch(closeSearch());
    navigate(`/products/${productId}`);
  };

  return (
    <Sheet
      open={isSearchOpen}
      onOpenChange={(open) => {
        if (!open) dispatch(closeSearch());
      }}
    >
      <SheetContent className="w-[400px] sm:w-[540px]" aria-describedby="">
        <SheetHeader>
          <SheetTitle>Search Products</SheetTitle>
          <div className="flex items-center border rounded-md p-2">
            <Input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="border-none focus:outline-none"
            />
            <Search className="w-4 h-4 mr-2 text-gray-500" />
          </div>
        </SheetHeader>

        <div className="mt-4 space-y-4">
          {searchResults?.map((product) => (
            <div
              key={product?._id}
              className="flex items-center space-x-4 p-2 hover:bg-gray-100 cursor-pointer rounded-md"
              onClick={() => handleProductSelect(product?.id)}
            >
              <img
                src={product?.image}
                alt={product?.name}
                className="w-12 h-12 object-cover rounded"
              />
              <div>
                <h3 className="font-medium">{product?.name}</h3>
                <p className="text-sm text-gray-500">₹{product?.price}</p>
              </div>
            </div>
          ))}

          {searchQuery?.length > 2 && searchResults?.length === 0 && (
            <p className="text-center text-gray-500">No products found</p>
          )}
          {/* {searchQuery?.length > 2 ? (
            <p className="text-center text-gray-500">No products found</p>
          ) : null} */}
        </div>

        {searchResults?.length > 0 && (
          <Button
            className="w-full mt-4 cursor-pointer"
            onClick={() => {
              dispatch(closeSearch());
              navigate(`/products?search=${searchQuery}`);
            }}
          >
            View All Results
          </Button>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default SearchDialog;
