"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "./loading";
import { useDispatch, useSelector } from "react-redux";
import { State, storeDispatch } from "./_redux/store";
import { getPosts } from "./_redux/postsSlice";
import PostDetails from "./_postDetails/page";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { loading, posts } = useSelector((state: State) => state.postsReducers);
  const dispatch = useDispatch<storeDispatch>();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
    } else {
      setIsLoading(false);
      dispatch(getPosts());
    }
  }, [dispatch, router]);

  return (
    <>
      {isLoading || loading ? (
        <Loading />
      ) : (
        posts.map((post) => <PostDetails key={post.id} post={post} />)
      )}
    </>
  );
}
