"use client";
import { useDispatch, useSelector } from "react-redux";
import { State, storeDispatch } from "../_redux/store";
import { useEffect, useMemo } from "react";
import { getUserPosts } from "../_redux/postsSlice";
import { jwtDecode } from "jwt-decode";
import Loading from "@/app/loading";
import PostDetails from "../_postDetails/page";

// Define the expected token structure
interface DecodedToken {
  user: string; // Adjust the type according to your actual token structure
}

export default function Profile() {
  const { loading, posts } = useSelector((state: State) => state.postsReducers);
  const dispatch = useDispatch<storeDispatch>();

  // Memoize the decoded token and explicitly type it
  const x = useMemo(() => {
    const token = localStorage.getItem("token");
    return token ? (jwtDecode(token) as DecodedToken) : null;
  }, []);

  const postReverse = [...posts];

  useEffect(() => {
    if (x?.user) {
      dispatch(getUserPosts(x.user));
    }
  }, [dispatch, x]); // Include `dispatch` and `x` in the dependency array

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        postReverse.map((post) => (
          <PostDetails key={post._id} post={post} isComments={true} />
        ))
      )}
    </>
  );
}
