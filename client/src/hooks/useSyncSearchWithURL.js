import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setKeyword } from "@/redux/slices/searchSlice";

const useSyncSearchWithURL = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    console.log({ params });

    const query = params.get("search") || "";
    console.log(query);
    dispatch(setKeyword(query));
  }, [location.search, dispatch]);
};

export default useSyncSearchWithURL;
