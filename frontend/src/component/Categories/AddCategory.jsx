import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { FiBookOpen } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { createCategoryAction } from "../../redux/slices/categorySlice";
import { getAllCategoriesAction } from "../../redux/slices/categorySlice";
import { useEffect } from "react";
import Spinner from "../../utils/Spinner";

//Form schema
const createCategoryFormSchema = Yup.object({
  title: Yup.string().required("Title is required"),
});

//get data from store

const AddNewCategory = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const store = useSelector((store) => store?.category);
  const { loading, appError, serverError, isCategoryCreated, categories } = store;
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: createCategoryFormSchema,
    onSubmit: (values) => {
      dispatch(createCategoryAction(values));
    },
  });
  console.log(loading,categories)
  useEffect(()=> {
    dispatch(getAllCategoriesAction())
  },[dispatch])
  useEffect(() => {
    if (isCategoryCreated) {
      navigate("/category-list");
    }
  });

  return (
    <>
      {loading?(
        <Spinner />
      ):(
        <div className="min-h-screen flex items-center  bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 lg:justify-around">
        
      <div className="max-w-md w-full space-y-8 lg:ml-72 ">
        <div>
          <FiBookOpen className="mx-auto h-12 w-auto" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Add New Category
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            <p className="font-medium text-indigo-600 hover:text-indigo-500">
              These are the categories user will select when creating a post
            </p>
            {/* Display err */}
            <div>
              {appError || serverError ? (
                <h2 className="text-red-500 text-center text-lg">
                  {`${serverError} : ${appError}`}
                </h2>
              ) : null}
            </div>
          </p>
        </div>
        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="mt-8 space-y-6">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Name
              </label>
              {/* Title */}
              <input
                value={formik.values.title}
                onChange={formik.handleChange("title")}
                onBlur={formik.handleBlur("title")}
                type="text"
                autoComplete="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-center focus:z-10 sm:text-sm"
                placeholder="New Category"
              />
              <div className="text-red-400 mb-2">
                {formik.touched.title && formik.errors.title}
              </div>
            </div>
          </div>

          <div>
            <div>
              {/* Submit */}

              {loading ? (
                <button
                  disabled
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <AiOutlinePlus
                      className="h-5 w-5 text-yellow-500 group-hover:text-indigo-400"
                      aria-hidden="true"
                    />
                  </span>
                  Adding ...
                </button>
              ) : (
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <AiOutlinePlus
                      className="h-5 w-5 text-yellow-500 group-hover:text-indigo-400"
                      aria-hidden="true"
                    />
                  </span>
                  Add new Category
                </button>
              )}
            </div>
          </div>
        </form>
        
      </div>
      <div className="flex flex-col items-start lg:ml-72">
  <h2 className="text-2xl font-bold mb-4 text-indigo-900">Registered Categories</h2>
  {categories?.map((category) => (
    <div key={category?._id} className="mb-4">
      <p className="text-lg font-semibold cursor-pointer text-indigo-700 bg-indigo-100 py-2 px-4 rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1">
        {category?.title}
      </p>
    </div>
  ))}
</div>



    </div>
      )}
    </>
  );
};

export default AddNewCategory;
