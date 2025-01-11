import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "sonner";
import { Button } from "@radix-ui/themes/dist/cjs/index.js";
import { EyeIcon, EyeOffIcon } from "lucide-react";

function ArticleCard({ article }) {
  //   console.log(article);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(article.comments || []);
  const [isCommentsHide, setIsCommentsHide] = useState(true);

  const navigate = useNavigate();

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    const userData = JSON.parse(localStorage.getItem("user"));
    const token = userData?.access_token;

    if (!comment || !token) {
      toast.info("Comment cannot be empty or user not authenticated.");
      return;
    }

    const newComment = {
      username: userData.username,
      time: new Date().toISOString(),
      text: comment,
    };

    try {
      const response = await axios.patch(
        `https://json-api.uz/api/project/blog-api/articles/${article.id}`,
        {
          comments: [...comments, newComment],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setComments([...comments, newComment]);
        setComment("");
      }
    } catch (error) {
      console.log("Error adding comment:", error);
    }
  };

  const formattedDate = new Date(article.time).toLocaleDateString();

  return (
    <div className="p-4 bg-white border flex justify-between relative flex-col rounded-lg shadow-md hover:shadow-lg transition-shadow dark:bg-gray-800">
      <Toaster position="bottom-center" />{" "}
      <div>
        <h2 className="text-blue-400 sm:text-xl text-base">
          @{article.username || "admin"}
        </h2>

        <h2 className="sm:text-xl text-base font-semibold mb-5 dark:text-indigo-400 text-indigo-600 cursor-pointer">
          {article.title}
        </h2>

        <h3 className="mb-4 text-base sm:text-xl">{article.description}</h3>

        <p className="line-clamp-3 w-full sm:w-[70%] text-justify whitespace-normal mb-4">
          {article.fullDescription}
        </p>

        <h2
          className="text-blue-700 font-bold hover:underline underline-offset-2 mb-4 cursor-pointer"
          onClick={() => navigate(`/article-details`, { state: { article } })}
        >
          Show more
        </h2>

        <p className="text-sm dark:opacity-80 absolute top-4 right-10">
          <span className="hidden sm:block">Published:</span> {formattedDate}
        </p>
      </div>
      <div className="mt-6 ">
        <Button
          className={`absolute sm:hidden right-3 bottom-44 w-[90%]  mx-auto  flex items-center justify-${
            !isCommentsHide ? "end" : "between"
          } gap-6`}
          onClick={() => {
            setIsCommentsHide((prev) => !prev);
          }}
        >
          {isCommentsHide ? comments.length + " - comments " : ""}

          {!isCommentsHide ? <EyeOffIcon /> : <EyeIcon />}
        </Button>
        {isCommentsHide ? (
          ""
        ) : (
          <div className=" sm:hidden">
            <h3 className="sm:text-lg text-sm font-semibold">Comments</h3>
            {comments.length === 0 ? (
              <p>No comments yet.</p>
            ) : (
              <ul className="space-y-3">
                {comments.map((comment, index) => (
                  <li key={index} className="border-b py-2">
                    <p className="sm:text-sm text-xs font-semibold">
                      {comment.username}
                    </p>
                    <p className="sm:text-sm text-xs text-gray-500">
                      {new Date(comment.time).toLocaleString()}
                    </p>
                    <p className="text-sm mt-1">{comment.text}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        <div className="hidden sm:block">
          <h3 className="sm:text-lg text-sm font-semibold">Comments</h3>
          {comments.length === 0 ? (
            <p>No comments yet.</p>
          ) : (
            <ul className="space-y-3">
              {comments.map((comment, index) => (
                <li key={index} className="border-b py-2">
                  <p className="sm:text-sm text-xs font-semibold">
                    {comment.username}
                  </p>
                  <p className="sm:text-sm text-xs text-gray-500">
                    {new Date(comment.time).toLocaleString()}
                  </p>
                  <p className="text-sm mt-1">{comment.text}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <form onSubmit={handleCommentSubmit} className="mt-4">
          <textarea
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            value={comment}
            onChange={handleCommentChange}
            rows="3"
            placeholder="Write a comment..."
          ></textarea>
          <button
            type="submit"
            className="mt-2 text-sm sm:text-xl bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Add Comment
          </button>
        </form>
      </div>
    </div>
  );
}

export default ArticleCard;
