import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DateFormatter from "../../utils/DateFormatter";
import Spinner from "../../utils/Spinner";
import { getSingleReportAction } from "../../redux/slices/reportSlice";

const ReportDetails = () => {
  const { id } = useParams();
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(()=> {
    dispatch(getSingleReportAction(id))
  },[dispatch, id])
  const reports = useSelector((state)=> state?.report)
const {loading, appErr, serverErr, report} = reports
  return (
    <>
      {loading ? (
        <div className="h-screen">
          <Spinner />
        </div>
      ) : appErr || serverErr ? (
        <h1 className="h-screen text-red-400 text-xl">
          {serverErr} {appErr}
        </h1>
      ) : (
        <section className="py-10 2xl:py-10 bg-blend-difference overflow-hidden bg-gradient-to-b from-white to-white">
          <div className="container px-4 mx-auto">
            
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="mt-3 mb-14 text-2xl text-gray-800 font-bold font-heading">
                {report?.data?.title}
              </h2>

              {/* Reporter */}
              <div className="inline-flex pt-14 mb-14 items-center border-t border-gray-500">
                <img
                  className="mr-8 w-20 lg:w-24 h-20 lg:h-24 rounded-full"
                  src={report?.data?.reporter?.profilePhoto}
                  alt=""
                />
                <div className="text-left">
                  <Link to={`/profile/${report?.author?._id}`}>
                    <h4 className="mb-1 text-2xl font-bold text-gray-50">
                      <span className="text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-yellow-200 to-orange-600 ">
                        {report?.data?.reporter?.firstName}{" "}
                        {report?.data?.reporter?.lastName}{" "}
                      </span>
                    </h4>
                  </Link>
                  <p className="text-gray-500">
                    {<DateFormatter date={report?.data.createdAt} />}
                  </p>
                </div>
              </div>
              {/* Post description */}
              <div class="max-w-xl mx-auto">
                <p class="mb-6 text-left text-gray-600">
                  {report?.data?.description}    
                  
                </p>
              </div>
               {/* Download Link */}
               <p className="inline-block px-6 py-3 bg-blue-500 text-white font-semibold rounded cursor-pointer hover:bg-blue-600">
                  <a href={report?.data?.downloadLink} target="_blank" rel="noopener noreferrer" download="report.jpg">
                    Download Report
                  </a>
                </p>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ReportDetails;