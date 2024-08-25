import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { forwardToAdminAction, getAllReportAction } from "../../redux/slices/reportSlice";
import DateFormatter from "../../utils/DateFormatter";
import Spinner from "../../utils/Spinner";
import { LuSendHorizonal } from "react-icons/lu";

const GetAllReports = () => {
  const dispatch = useDispatch();
  const {id} = useParams()
  useEffect(() => {
    dispatch(getAllReportAction(id));
  }, [dispatch,id]);

 

const handleForward = (id) => {
  dispatch(forwardToAdminAction(id));
  window.location.reload()
}
const report = useSelector((state)=> state.report);
const {loading, appErr, serverErr, reports} = report

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
        <h2 className="text-center text-3xl text-gray-600 mt-14">
          {serverErr}: {appErr}
        </h2>
      ) : reports?.data?.length <= 0 ? (
        <h2 className="text-center text-3xl text-green-800">
          No Report Found
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
                        Reporter
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
                        Send To Admin
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports?.data?.map((category) => (
                      
                      <tr key={category?._id} className="bg-gray-50">
                      <Link to={`/reports/details/${category._id}`}>
                      
                          
                        <td className="px-6 py-4 whitespace-nowrap">
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
                        </td>
                        </Link>
                        
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {category.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {<DateFormatter date={category?.createdAt} />}
                        </td>
                          <td className="px- py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer">
                            <LuSendHorizonal onClick={()=> handleForward(category?._id)} className="h-5 text-red-500 mx-12" size={20} />
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

export default GetAllReports;
