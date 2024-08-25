import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  HeartIcon,
  EmojiSadIcon,
} from "@heroicons/react/outline";
import { MailIcon, EyeIcon } from "@heroicons/react/solid";
import {
 userProfileAction,
 followUser,
 unFollowUserAction,
} from "../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import DateFormatter from "../../utils/DateFormatter";
import Spinner from "../../utils/Spinner";

export default function Profile() {

const dispatch = useDispatch();
const {id}= useParams()


//   //User data from store
  const users = useSelector(state => state.user);
  const {
    profile,
    profileLoading,
    profileAppErr,
    profileServerErr,
    auth,
  } = users;

//   //fetch user profile
  useEffect(() => {
    dispatch(userProfileAction(id));
  }, [id, dispatch]);

  const isLoginUser = auth?._id === profile?._id;

  return (
    <>
      <div className="min-h-screen bg-green-600 flex justify-center items-center mt-2">
        {profileLoading ? (
          <Spinner />
        ) : profileAppErr || profileServerErr ? (
          <h2 className="text-yellow-400 text-2xl">
            {profileServerErr} {profileAppErr}
          </h2>
        ) : (
          <div className="h-screen flex overflow-hidden bg-white w-full">
            {/* Static sidebar for desktop */}

            <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
              <div className="flex-1 relative z-0 flex overflow-hidden">
                <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last">
                  <article>
                    {/* Profile header */}
                    <div>
                      <div>
                        <img
                          className="h-32 w-full object-cover lg:h-48 mt-16"
                          src={profile?.profilePhoto}
                          alt={profile?.firstName}
                        />
                      </div>
                      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                          
                          <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                            <div className=" flex flex-col 2xl:block mt-10 min-w-0 flex-1">
                              <h1 className="text-2xl font-bold text-gray-900 ">
                                {profile?.firstName} {profile?.lastName}
                
                              </h1>
                              <h2 className="text-xl from-neutral-300 text-gray-400 ">
                                {profile?.email}
                              </h2>
                              <p className="m-3 text-lg">
                                Date Joined: {""}
                                <DateFormatter date={profile?.createdAt} />{" "}
                              </p>
                              <p className="text-green-600 mt-2 mb-2">
                              posts: {profile?.postCount> 0? profile?.postCount: 0} 
                              </p>
                              <p className="text-green-600 mt-2 mb-2">
                              followers: {profile?.followers?.length > 0 ? profile?.followers?.length: 0}
                              </p>
                              <p className="text-green-600 mt-2 mb-2">
                              following: {profile?.following?.length > 0? profile?.following?.length: 0} 
                              </p>
                                
                                
                              {/* Who view my profile */}
                              <div className="flex items-center  mb-2">
                                <EyeIcon className="h-5 w-5 " />
                                <div className="pl-2">
                                  {/* {profile?.viewedBy?.length}{" "} */}
                                  <span className="text-indigo-400 cursor-pointer ">
                                    Number of viewers{" "}
                                    {profile?.viewedBy?.length}
                                  </span>
                                </div>
                              </div>

                              {/* is login user */}
                              {/* Upload profile photo */}
                              
                            </div>

                            <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                              {/* // Hide follow button from the same */}
                              {!isLoginUser && (
                                <div>
                                  {profile?.isFollowing ? (
                                    <button
                                      onClick={() =>
                                        dispatch(unFollowUserAction(id))
                                      }
                                      className="mr-2 inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                                    >
                                      <EmojiSadIcon
                                        className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                      />
                                      <span>Unfollow</span>
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() =>
                                        dispatch(followUser(id))
                                      }
                                      type="button"
                                      className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                                    >
                                      <HeartIcon
                                        className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                      />
                                      <span>Follow </span>
                                      <span className="pl-2">
                                        {profile?.followers?.length}
                                      </span>
                                    </button>
                                  )}

                                  <></>
                                </div>
                              )}
                              {/* Update Profile */}

                              <>
                                {isLoginUser && (
                                    <button
                                // onClick={sendMailNavigate}
                                className="inline-flex justify-center bg-indigo-900 px-4 py-2 border border-yellow-700 shadow-sm text-sm font-medium rounded-md text-gray-700  hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                              >
                                <MailIcon
                                
                                  className="-ml-1 mr-2 h-5 w-5 text-gray-200"
                                  aria-hidden="true"
                                />
                                <Link to={`/reports/${profile?._id}`} className="text-base mr-2  text-bold text-yellow-500">
                                View Reports
                                </Link>
                               
                              </button>
                                )}
                              </>
                       
                              
                            </div>
                          </div>
                        </div>
                        <div className="hidden sm:block 2xl:hidden mt-6 min-w-0 flex-1">
                          <h1 className="text-2xl font-bold text-gray-900 truncate">
                            {profile?.firstName} {profile?.lastName}
                          </h1>
                        </div>
                      </div>
                    </div>
                    {/* Tabs */}
                    <div className="mt-6 sm:mt-2 2xl:mt-5">
                      <div className="border-b border-red-900">
                        <div className="max-w-5xl mx-auto "></div>
                      </div>
                    </div>
                   
                  </article>
                </main>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}