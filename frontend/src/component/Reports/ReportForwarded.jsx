import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import DateFormatter from "../../utils/DateFormatter";
import Spinner from "../../utils/Spinner";
import { AiFillDelete } from "react-icons/ai";
import { getAllForwaredReportAction,deleteReportAction } from "../../redux/slices/reportSlice";
import { Link } from "react-router-dom";


const ReportForwarded = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getAllForwaredReportAction())
  }, [dispatch]);
  const reports = useSelector((state) => state?.report);
  const { allForwarded, loading, appErr, serverErr } = reports;
console.log(allForwarded)
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
      ) : allForwarded?.data?.length <= 0 || allForwarded?.data === "No Report Found" ? (
        <h2 className="text-center text-3xl text-green-800">
          No allForwarded Found
        </h2>
      ) : (
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 mt-16 lg:w-full lg:mx-auto">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        CHW
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
                        Forwarded At
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
                    {allForwarded?.data?.map((category) => (
                      <tr key={category?._id} className="bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                        <Link to={`/reports/details/${category._id}`}>
                        <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={category?.reporter?.profilePhoto}
                                alt="category profile"
                              />
                            </div>
                            
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {category?.reporter?.firstName}{" "}
                                {category?.reporter?.lastName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {category?.reporter?.email}
                              </div>
                            </div>
                          </div>
                        </Link>
                          
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {category?.title}
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {<DateFormatter date={category?.createdAt} />}
                        </td>
                        <td className="px-1 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer pl-8">
                            <AiFillDelete onClick={()=> 
                            {dispatch(deleteReportAction(category?._id));
                            window.location.reload()
                            }
                            } className="h-5 text-red-500" size={20} />
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

export default ReportForwarded ;
