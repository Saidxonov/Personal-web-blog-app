import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import axios from "axios";
import EditArticleModal from "../components/EditArticModal";
import { toast, Toaster } from "sonner";

function ArticleDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { article } = location.state || {};
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(article.comments || []);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!article) {
    return <p>No article data found!</p>;
  }

  const userData = JSON.parse(localStorage.getItem("user"));
  const canEditOrDelete =
    userData != null
      ? userData?.type === "admin" || userData?.username === article?.username
      : false;

  console.log("24qator", canEditOrDelete);
  console.log("25qator userDAta", userData);

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (canEditOrDelete) {
      try {
        await axios.delete(
          `https://json-api.uz/api/project/blog-api/articles/${id}`,
          {
            headers: {
              Authorization: `Bearer ${userData.access_token}`,
            },
          }
        );
        fetchArticles(currentPage);
        navigate("/");
      } catch (error) {
        console.log("Error deleting article:", error);
        if (error.status == 403) {
          toast.info("Token expired or undefined please login again ");
        }
        toast.error("Fail to delete article please try again");
      }
    } else {
      toast.warning("You cant delete this article");
    }
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

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
      const { comments: currentComments, ...otherArticleData } = article;

      const response = await axios.patch(
        `https://json-api.uz/api/project/blog-api/articles/${article.id}`,
        {
          ...otherArticleData,
          comments: [...currentComments, newComment],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setComments([...currentComments, newComment]);
        setComment("");
      }
    } catch (error) {
      toast.info("Error check browser console");
      console.log("Error adding comment:", error);
    }
  };

  const formattedDate = new Date(article.time).toLocaleDateString();

  return (
    <div className="container mx-auto px-4 py-6 relative">
      <Toaster position="bottom-center" />
      <div className="flex justify-between items-center gap-10 flex-wrap-reverse">
        <h1 className="md:text-3xl text-xl text-center  font-bold mb-8">
          {article.title}
        </h1>
        {canEditOrDelete && (
          <div className="mt-4 flex items-center gap-2">
            <Button
              variant="outline"
              className="sm:px-4 sm:py-2"
              onClick={() => {
                if (confirm("Are you sure you want to edit this article?")) {
                  handleEdit();
                }
              }}
            >
              <Pencil1Icon />
            </Button>
            <Button
              variant="outline"
              className="sm:px-4  sm:py-2 sm:bg-red-600"
              onClick={() => {
                console.log(article.id);
                if (confirm("Are you sure you want to delete this article?")) {
                  handleDelete(article.id);
                }
              }}
            >
              <TrashIcon />
            </Button>
          </div>
        )}
      </div>
      <h3 className="text-left my-5">{article.description}</h3>
      <p className="text-gray-700 my-10 w-full  md:max-w-[70%] whitespace-wrap text-justify dark:text-gray-300 mb-6">
        {article.fullDescription}
      </p>
      <h4 className="text-sm text-gray-500">Published: {formattedDate}</h4>
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Comments</h3>
        <div className="flex flex-col-reverse gap-10">
          {comments.length === 0 ? (
            <p>No comments yet.</p>
          ) : (
            <ul className="space-y-3">
              {comments.map((comment, index) => (
                <li key={index} className="border-b py-2">
                  <p className="text-sm font-semibold">{comment.username}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(comment.time).toLocaleString()}
                  </p>
                  <p className="text-sm mt-1">{comment.text}</p>
                </li>
              ))}
            </ul>
          )}

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
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Add Comment
            </button>
          </form>
        </div>
      </div>

      {isModalOpen && (
        <EditArticleModal
          article={article}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default ArticleDetails;
