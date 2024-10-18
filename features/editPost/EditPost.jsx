import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../state/AuthContext";
import { useRouter } from "next/navigation";
import axios from "axios";

const EditPost = (props) => {
  const PUBLIC_FOLDER = process.env.NEXT_PUBLIC_API_URL;

  const username = props.username;
  const postId = props.postId;

  const { user } = useContext(AuthContext);
  const router = useRouter();

  const [post, setPost] = useState({});
  const [postDesc, setPostDesc] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `${PUBLIC_FOLDER}/api/posts/${postId}`
        );
        setPost(response.data);
        setPostDesc(response.data.desc);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPost();
  }, [PUBLIC_FOLDER, postId]);

  const handleEdit = async () => {
    try {
      if (user.username === username) {
        if (window.confirm("本当に更新してもよろしいですか？")) {
          await axios.put(`${PUBLIC_FOLDER}/api/posts/${post._id}`, {
            userId: user._id,
            desc: postDesc,
          });
          alert("更新しました。");
        } else {
          alert("更新をキャンセルしました。");
        }
      } else {
        alert("更新権限がありません。");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      if (user.username === username) {
        if (window.confirm("本当に削除してもよろしいですか？")) {
          await axios.delete(`${PUBLIC_FOLDER}/api/posts/${post._id}`, {
            data: {
              userId: user._id,
            },
          });
          alert("投稿が削除されました。");
          router.push("/");
        } else {
          alert("削除をキャンセルしました。");
        }
      } else {
        alert("削除権限がありません。");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center p-6 bg-gray-100 min-h-screen">
      <div className="profileRightTop p-6 bg-white shadow-md rounded-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">投稿設定</h2>
        <div className="space-y-4">
          <div className="text-lg font-medium">投稿者ID: {post.userId}</div>
          <div className="text-lg font-medium">投稿番号: {post._id}</div>
          <div className="text-lg font-medium">投稿時間: {post.updatedAt}</div>
          <div className="text-lg font-medium">
            いいね数：{post.likes ? post.likes.length : "N/A"}
          </div>
          <div>
            <span className="text-lg font-medium">内容：</span>
            <input
              type="text"
              value={postDesc}
              onChange={(e) => setPostDesc(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="flex space-x-4">
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              編集
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              投稿削除
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
