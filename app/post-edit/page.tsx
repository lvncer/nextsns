"use client";

import { useSearchParams, useRouter } from "next/navigation";
import React, { Suspense, useEffect } from "react";
import LoadingSpinner from "@/components/elements/loadingSpinner/LoadingSpinner";
import UserNotFound from "@/components/layouts/userNotFound/UserNotFound";
import EditPost from "@/components/layouts/editPost/EditPost";
import Loading from "@/components/layouts/loading/Loading";
import Topbar from "@/components/layouts/header/Header";
import Error from "@/components/layouts/error/Error";
import { useAppSelector } from "@/hooks/useSelector";
import SideBar from "@/components/layouts/sideBar/SideBar";

const PostEditContent: React.FC = () => {
  const { user, isLoading, error } = useAppSelector((state) => state.auth);
  const searchParams = useSearchParams();
  const postId = searchParams.get("post-id");
  const router = useRouter();

  // クエリがない場合にリダイレクト
  useEffect(() => {
    if (!postId) {
      alert("投稿が存在しません。");
      router.replace("/");
    }
  }, [postId, router]);

  if (!user) {
    return <UserNotFound />;
  }
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  return <EditPost postId={postId || ""} />;
};

const PostEdit: React.FC = () => {
  return (
    <>
      <Topbar />
      <div className="hidden xl:block">
        <SideBar />
      </div>
      <Suspense fallback={<LoadingSpinner />}>
        <PostEditContent />
      </Suspense>
    </>
  );
};

export default PostEdit;