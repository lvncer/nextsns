"use client";

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import LoadingSpinner from "@/components/elements/loadingSpinner/LoadingSpinner";
import { Post } from "@/types/post";
import { POSTS_ALL_ENDPOINT } from "@/constants/api";
import SinglePost from "./SinglePost";
import PostForm from "./PostForm";
import { useAuth } from "@/hooks/useAuth";

interface TimelineProps {
  isForm: boolean;
}

const HomeTimeline: React.FC<TimelineProps> = ({ isForm = false }) => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const handlePostSuccess = (newPost: Post) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  const fetchPosts = useCallback(async (cursor: string | null = null) => {
    setLoading(true);
    setIsFetching(true);
    try {
      const response = await axios.get(POSTS_ALL_ENDPOINT, {
        params: { cursor },
      });
      const newPosts = response.data.posts || [];

      // 重複を除外
      setPosts((prevPosts) => [
        ...prevPosts,
        ...newPosts.filter(
          (newPost: Post) => !prevPosts.some((post) => post._id === newPost._id)
        ),
      ]);

      if (response.data.nextCursor) {
        setNextCursor(response.data.nextCursor);
      } else {
        setNextCursor(null); // 取得できる投稿がない場合
      }
    } catch (err) {
      alert("投稿の取得に失敗しました:");
    } finally {
      setLoading(false);
      setIsFetching(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
      !isFetching &&
      nextCursor
    ) {
      fetchPosts(nextCursor);
    }
  }, [fetchPosts, isFetching, nextCursor]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="w-full flex justify-center">
      <div className="relative">
        {isForm && user ? <PostForm onPostSuccess={handlePostSuccess} /> : null}

        {loading ? (
          <LoadingSpinner />
        ) : (
          posts.map((post) => <SinglePost key={post._id} post={post} />)
        )}
      </div>
    </div>
  );
};

export default HomeTimeline;
