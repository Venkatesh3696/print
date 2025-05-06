import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setKeyword,
  setCategory,
  setMinPrice,
  setMaxPrice,
} from "@/redux/slices/searchSlice";

const useSyncSearchWithURL = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    dispatch(setKeyword(params.get("search") || ""));
    dispatch(setCategory(params.get("category") || ""));
    dispatch(setMinPrice(params.get("minPrice") || ""));
    dispatch(setMaxPrice(params.get("maxPrice") || ""));
  }, [location.search, dispatch]);
};

export default useSyncSearchWithURL;
