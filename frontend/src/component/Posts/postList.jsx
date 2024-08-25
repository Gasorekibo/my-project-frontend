import { useEffect } from "react";
import { AiFillLike, AiFillDislike, AiFillEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link,useNavigate } from "react-router-dom";


import DateFormatter from "../../utils/DateFormatter";
import { fetchAllPostAction, togglePostDisLike, togglePostLike } from "../../redux/slices/postSlices";

import { getAllCategoriesAction } from "../../redux/slices/categorySlice";
import Spinner from "../../utils/Spinner";


export default function PostsList() {
  
  //select post from store
  const navigate = useNavigate()
  const post = useSelector((state) => state?.post);
  const { postLists, appErr, serverErr, postLikes, postDislikes} = post
  const user = useSelector((store)=> store?.user);
  const {auth} = user

  //select categories from store
  const category = useSelector((state) => state?.category);
  const {
    categories,
    loading: catLoading,
    appErr: catAppErr,
    serverErr: catServerErr,
  } = category;
  //dispatch
  const dispatch = useDispatch();
  //fetch post
  useEffect(() => {
    dispatch(fetchAllPostAction(undefined));
  }, [dispatch, postLikes, postDislikes]);

  //   fetch categories

  useEffect(() => {
    dispatch(getAllCategoriesAction());
  }, [dispatch]);

  return (
    <>
      {!auth ? (
        navigate("/login")
        
      ):<section>
        <div className="py-20 bg-gray-900 min-h-screen radius-for-skewed">
          <div className="container mx-auto px-4">
            <div className="mb-16 flex flex-wrap items-center">
              <div className="w-full lg:w-1/2">
                <span className="text-green-600 font-bold">
                  Latest Posts from our awesome authors
                </span>
                <h2 className="text-4xl text-gray-300 lg:text-5xl font-bold font-heading">
                  Latest Post
                </h2>
              </div>
              <div className=" block text-right w-1/2 fixed right-2 top-20">
                {/* View All */}
                <button
                  onClick={() => dispatch(fetchAllPostAction(undefined))}
                  className="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-green-600 hover:bg-green-700 text-gray-50 font-bold leading-loose transition duration-200"
                >
                  View All Posts
                </button>
              </div>
              <div>
                
              </div>
            </div>
            <div className="flex flex-wrap -mx-3">
              <div class="w-full lg:w-3/4 px-3">
                {/* Post goes here */}
                {appErr || serverErr ? (
                  <h1 className="text-yellow-600 text-center text-lg ">
                    {serverErr} {appErr}
                  </h1>
                ) : postLists?.length <= 0 ? (
                  <h1 className="text-yellow-400 text-lg text-center">
                    No Post Found
                  </h1>
                ) : (
                  postLists?.map((post) => (
                    
                    <div
                  
                      key={post._id}
                      className="flex flex-wrap bg-gray-900 -mx-3  lg:mb-6 lg:ml-2"
                    >
                      <div className="mb-10  w-full lg:w-1/4 ">
                        <Link>
                          {/* Post image */}
                          <img
                            className="w-full h-full object-cover rounded"
                            src={post?.image}
                            alt=""
                          />
                        </Link>
                        {/* Likes, views dislikes */}
                        <div className="flex flex-row bg-gray-300  justify-center w-full  items-center ">
                          {/* Likes */}
                          <div className="flex flex-row justify-center items-center ml-4 mr-4 pb-2 pt-1">
                            {/* Togle like  */}
                            <div className="">
                              <AiFillLike onClick={()=> dispatch(togglePostLike(post?._id))} className="h-7 w-7 text-indigo-600 cursor-pointer" />
                            </div>
                            <div className="pl-2 text-gray-600">
                              {post?.likes?.length}
                            </div>
                          </div>
                          {/* Dislike */}
                          <div className="flex flex-row  justify-center items-center ml-4 mr-4 pb-2 pt-1">
                            <div>
                              <AiFillDislike onClick={()=> dispatch(togglePostDisLike(post?._id))} className="h-7 w-7 cursor-pointer text-gray-600" />
                            </div>
                            <div className="pl-2 text-gray-600">
                              {post?.disLikes?.length}
                            </div>
                          </div>
                          {/* Views */}
                          <div className="flex flex-row justify-center items-center ml-4 mr-4 pb-2 pt-1">
                            <div>
                              <AiFillEye className="h-7 w-7  text-gray-400" />
                            </div>
                            <div className="pl-2 text-gray-600">
                              {post?.numViews}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="w-full lg:w-3/4 px-3">
                        <Link>
                          <h3 className="mb-1 text-2xl text-green-400 font-bold font-heading">
                            {post?.title?.[0].toUpperCase() +
                              post?.title?.slice(1)}
                          </h3>
                        </Link>
                        <p className="text-gray-300">{post?.description.slice(0,1000)}</p>
                        {/* Read more */}
                        <Link
                          to={`/posts/${post?._id}`}
                          className="text-indigo-500 hover:underline"
                        >
                          Read More..
                        </Link>
                        {/* User Avatar */}
                        <div className="mt-6 flex items-center">
                          <div className="flex-shrink-0">
                            <Link>
                              <img
                                className="h-10 w-10 rounded-full"
                                src={post?.author?.profilePhoto}
                                alt=""
                              />
                            </Link>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">
                              <Link
                                to={`/profile/${post?.author?._id}`}
                                className="text-yellow-400 hover:underline "
                              >
                                {post?.author?.firstName}{" "}
                                {post?.author?.lastName}
                              </Link>
                            </p>
                            <div className="flex space-x-1 text-sm text-green-500">
                              <time>
                                <DateFormatter date={post?.createdAt} />
                              </time>
                              <span aria-hidden="true">&middot;</span>
                            </div>
                          </div>
                        </div>
                        {/* <p class="text-gray-500">
                             Quisque id sagittis turpis. Nulla sollicitudin rutrum
                             eros eu dictum...
                           </p> */}
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="mb-8 lg:mb-0 w-full lg:w-1/4 px-3 lg:fixed lg:right-0 lg:top-52">
                <div className="py-4 px-6 bg-gray-600 shadow rounded -mt-12">
                  <h4 className="mb-4 text-gray-500 font-bold uppercase">
                    Categories
                  </h4>
                  <ul>
                    {catLoading ? (
                      <Spinner />
                    ) : catAppErr || catServerErr ? (
                      <h1>
                        {catServerErr} {catAppErr}
                      </h1>
                    ) : categories?.length <= 0 ? (
                      <h1 className="text-yellow-400 text-lg text-center">
                        No Category Found
                      </h1>
                    ) : (
                      categories?.map((category) => (
                        <li key={category?._id}>
                          <p
                            onClick={() =>
                  
                              dispatch(fetchAllPostAction(category?.title))
                            }
                            className="block cursor-pointer py-2 px-3 mb-4 rounded text-yellow-500 font-bold bg-gray-500"
                          >
                            {category?.title}
                          </p>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </div>
              )
            </div>
          </div>
        </div>
        <div className="bg-gray-900">
          <div class="skew bg-white skew-bottom mr-for-radius">
            <svg
              class="h-8 md:h-12 lg:h-10 w-full text-gray-900"
              viewBox="0 0 10 10"
              preserveAspectRatio="none"
            >
              <polygon fill="currentColor" points="0 0 10 0 0 10"></polygon>
            </svg>
          </div>
          <div class="skew bg-gray-500  skew-bottom ml-for-radius">
            <svg
              class="h-8 bg-gray-500 md:h-12 lg:h-20 w-full text-gray-900"
              viewBox="0 0 10 10"
              preserveAspectRatio="none"
            >
              <polygon fill="currentColor" points="0 0 10 0 10 10"></polygon>
            </svg>
          </div>
          <div className="text-white lg:ml-[50%]">@{new Date().getFullYear()} All right reserved</div>
        </div>
      </section>}
      
    </>
  );
}
