import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import { getAllChw} from "../../redux/slices/userSlice";

const ChwDropDown = (props) => {
  //dispatch action
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllChw());
  }, [dispatch]);
  //select categories
  const users = useSelector((state) => state?.user);
  const { user, loading } = users;
  const allChw = user?.data?.map((single) => {
    return {
      label: single?.lastName+" "+single?.firstName,
      value: single?._id,
    };
  });

  //handleChange
  const handleChange = (value) => {
    props.onChange("category", value);
  };
  //handleBlur
  const handleBlur = () => {
    props.onBlur("category", true);
  };
  return (
    <div style={{ margin: "1rem 0" }}>
      {loading ? (
        <h3 className="text-base text-yellow-600">
         Community health worker list is loading please wait...
        </h3>
      ) : (
        <Select
          onChange={handleChange}
          onBlur={handleBlur}
          id="category"
          options={allChw}
          value={props?.value?.label}
        />
      )}
      {/* Display */}
      {props?.error && (
        <div style={{ color: "red", marginTop: ".5rem" }}>{props?.error}</div>
      )}
    </div>
  );
};

export default ChwDropDown;