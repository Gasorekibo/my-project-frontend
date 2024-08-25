import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import {
  fetchPostDetailsAction,
  deletePostAction,
} from "../../redux/slices/postSlices";
import { useDispatch, useSelector } from "react-redux";
import DateFormatter from "../../utils/DateFormatter";
import Spinner from "../../utils/Spinner";
import AddComment from "../Comments/AddComment";
import { commentsForSinglePostAction } from "../../redux/slices/commentSlices";

const PostDetails = () => {
  const {id} = useParams()
  const dispatch = useDispatch();
  const navitage = useNavigate()

  
  //select post details from store
  const post = useSelector(state => state?.post);
  const { postDetails, loading, appErr, serverErr, isDeleted } = post;
  const comment = useSelector((state)=> state?.comment);
  const {loading:commentLoading, comments} = comment
  
  useEffect(() => {
    dispatch(fetchPostDetailsAction(id));
    dispatch(commentsForSinglePostAction(id))
  }, [id, dispatch]);
  //Get login user
  const user = useSelector(state => state.user);
  const { auth } = user;
 let isCreatedBy
    // Perform the comparison here
    if (postDetails && postDetails.author && auth) {
      // Perform the comparison here
      isCreatedBy = postDetails?.author?._id === auth?._id;
    }
  
  if (isDeleted) navitage("/posts");
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
        <section className="py-20 2xl:py-40 bg-gray-800 overflow-hidden">
          <div className="container px-4 mx-auto">
            {/* Post Image */}
            <img
              className="mb-24 w-full h-96 object-cover"
              src={postDetails?.image}
              alt=""
            />
            <div className="mx-auto text-center w-full">
              <h2 className="mt-7 mb-14 text-6xl 2xl:text-7xl text-white font-bold font-heading">
                {postDetails?.title}
              </h2>

              {/* User */}
              <div className="flex pt-14 mb-14 items-center border-t border-gray-500 justify-between">
                <div className="text-left">
                <img
                  className="mr-8 w-20 lg:w-24 h-20 lg:h-24 rounded-full"
                  src={postDetails?.author?.profilePhoto}
                  alt=""
                />
                  <Link to={`/profile/${postDetails?.author?._id}`}>
                    <h4 className="mb-1 text-2xl font-bold text-gray-50">
                      <span className="text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-yellow-200 to-orange-600 ">
                        {postDetails?.author?.firstName}{" "}
                        {postDetails?.author?.lastName}{" "}
                      </span>
                    </h4>
                  </Link>
                  <p className="text-gray-500">
                    {<DateFormatter date={post?.createdAt} />}
                  </p>
                  <p className="text-indigo-500">{postDetails?.author?.email}</p>
                </div>
                  {/* Show delete and update  if it was created by the user */}
                   
                <div>
                {isCreatedBy? (<p class="flex">
                      <Link to={`/update-post/${postDetails?._id}`} class="p-3">
                        <PencilAltIcon class="h-5 mt-3 text-yellow-300"/>
                      </Link>
                      <button
                        onClick={() =>
                          dispatch(deletePostAction(postDetails?._id))
                        }
                        class="ml-3"
                      >
                        <TrashIcon class="h-5 mt-3 text-red-600"/>
                      </button>
                    </p>):null}
                </div>
                
              </div>
              
              {/* Post description */}
              <div class="w-screen px-6">
                <p class="mb-6 text-left  text-xl text-gray-200">
                  {postDetails?.description}

                  
                  
                </p>
              </div>
            </div>
          </div>
          {/* Add comment Form component here */}
          {auth ? <AddComment postId={id} /> : null}
          {/* Display existing comments */}
          <div className="flex justify-center items-center flex-col mt-8">
  <h3 className="text-2xl font-semibold text-white mb-4">Comments</h3>
  
  {commentLoading ? (
    <Spinner />
  ) : comments && comments.length > 0 ? (
    <div className="overflow-x-auto lg:w-[70%] sm:w-screen">
      {comments.map((comment) => (
        <div key={comment._id} className="bg-gray-700 rounded p-4 mb-4 ">
          <div className="flex items-center mb-2">
            <img
              className="w-10 h-10 rounded-full mr-4"
              src={comment?.author?.profilePhoto}
              alt=""
            />
            <div>
              <h4 className="text-lg font-semibold text-gray-200">
                {comment?.author?.firstName} {comment?.author?.lastName}
              </h4>
              <p className="text-gray-500">
                {<DateFormatter date={comment?.createdAt} />}
              </p>
            </div>
          </div>
          <p className="text-gray-300 ml-12">{comment?.description}</p>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-gray-300">No comments yet.</p>
  )}
</div>

        </section>
      )}
    </>
  );
};

export default PostDetails;