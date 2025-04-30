import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setKeyword } from "@/redux/slices/searchSlice";

const SearchInput = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { keyword } = useSelector((state) => state.search);

  console.log(keyword);

  const handleChange = (e) => {
    const value = e.target.value;
    dispatch(setKeyword(value));
    navigate(`/products?search=${encodeURIComponent(value)}`);
  };

  return (
    <input
      type="text"
      value={keyword}
      onChange={handleChange}
      placeholder="Search..."
      className="border px-2 py-1 rounded"
    />
  );
};

export default SearchInput;
