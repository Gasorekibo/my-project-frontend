import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { getAllCategoriesAction } from "../../redux/slices/categorySlice";
import DateFormatter from "../../utils/DateFormatter";
import Spinner from "../../utils/Spinner";
import { AiFillDelete } from "react-icons/ai";
import { fetchAllPostAction } from "../../redux/slices/postSlices";

const CategoryList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategoriesAction());
    dispatch(fetchAllPostAction())
  }, [dispatch]);
  const store = useSelector((store) => store?.category);
  const posts = useSelector((store) => store?.post);

  const {postLists} = posts
  console.log(postLists)
 
  const { categories, loading, appErr, serverErr } = store;
  const getPostCountForCategory = (categoryTitle) => {
    return postLists?.filter((post) => post.category === categoryTitle).length;
  };
  
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
      ) : categories?.length <= 0 ? (
        <h2 className="text-center text-3xl text-green-800">
          No category Found
        </h2>
      ) : (
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 mt-16">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Author
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
                        Edit
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories?.map((category) => (
                      <tr key={category?._id} className="bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={category?.user?.profilePhoto}
                                alt="category profile"
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {category?.user?.firstName}{" "}
                                {category?.user?.lastName}
                                
                              </div>
                              <div className="text-sm text-gray-500">
                              {getPostCountForCategory(category?.title)} Posts
                              </div>
                                
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {category.title}
                          
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {<DateFormatter date={category?.createdAt} />}
                        </td>

                        <Link to={`/update-category/${category?._id}`}>
                          <td className="pl-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <HiOutlinePencilAlt className="h-5 text-indigo-500" />
                          </td>
                        </Link>
                        <Link to={`/update-category/${category?._id}`}>
                          <td className="px-1 py-4 whitespace-nowrap text-sm text-gray-500">
                            <AiFillDelete className="h-5 text-red-500" />
                          </td>
                        </Link>
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

export default CategoryList;
