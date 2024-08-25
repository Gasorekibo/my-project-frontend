import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import DateFormatter from "../../utils/DateFormatter";
import Spinner from "../../utils/Spinner";
import { AiFillDelete } from "react-icons/ai";
import { FaExchangeAlt } from "react-icons/fa";
import { changeToChwAction,deleteUserAction, getAllUsers } from "../../redux/slices/userSlice";

const Authors = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  const users = useSelector((state) => state?.user);
  const { user, loading, appErr, serverErr } = users;
  const handleChange = (id) => {
    dispatch(changeToChwAction(id));
    window.location.reload()
  }


  return (
    <>
      {loading ? (
        <>
          {/* <LoadingComponent /> */}
          <h1 className="text-red-800 text-center font-bold text-3xl">
            <Spinner />
          </h1>
        </>
      ) : appErr || serverErr ? (
        <h2 className="text-center text-3xl text-red-600">
          {serverErr} {serverErr}
        </h2>
      ) : user?.data?.length <= 0 ? (
        <h2 className="text-center text-3xl text-green-800">
          No User Found
        </h2>
      ) : (
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 mt-16">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Users
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Created At
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {user?.data?.map((category) => (
                      <tr key={category?._id} className="bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={category?.profilePhoto}
                                alt="category profile"
                              />
                            </div>
                            
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {category?.firstName}{" "}
                                {category?.lastName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {category?.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        {category?.role === "blogger" ? (
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Community Health worker
                        </td>
                        ) :(
                            <button className="bg-gray-500 text-white px-2 py-1 mt-4 mx-[20%] rounded-md cursor-pointer hover:bg-gray-600" onClick={()=> handleChange(category?._id)}><FaExchangeAlt size={20}/></button>
                        )}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {<DateFormatter date={category?.createdAt} />}
                        </td>
                        <td className="px-1 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer pl-8">
                            <AiFillDelete onClick={()=> {dispatch(deleteUserAction(category?._id));window.location.reload()}} className="h-5 text-red-500" size={20} />
                          </td>
                        
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Authors ;
