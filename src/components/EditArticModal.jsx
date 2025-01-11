import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { SaveIcon } from "lucide-react";
import { Rings } from "react-loader-spinner";

const EditArticleModal = ({ article, closeModal }) => {
  const [formData, setFormData] = useState({
    title: article.title || "",
    description: article.description || "",
    fullDescription: article.fullDescription || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    setFormData({
      title: article.title || "",
      description: article.description || "",
      fullDescription: article.fullDescription || "",
    });
  }, [article]);
  const currentTime = new Date().toISOString();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      time: currentTime,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      const token = userData?.access_token;

      if (!token) {
        setError("No access token found. Please log in again.");
        setLoading(false);
        return;
      }

      const response = await axios.put(
        `https://json-api.uz/api/project/blog-api/articles/${article.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        closeModal();
        navigate(`/article-details`, {
          state: { article: response.data },
        });
      }
    } catch (err) {
      setError("Failed to update article. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96 shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Edit Article</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-base sm:text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="fullDescription"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Full Description
            </label>
            <textarea
              id="fullDescription"
              name="fullDescription"
              value={formData.fullDescription}
              onChange={handleChange}
              rows="4"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={closeModal} disabled={loading}>
              Cancel
            </Button>
            <Button
              variant="secondary"
              className=" rounded-md  bg-green-400"
              onClick={handleSubmit}
              disabled={loading}
            >
              <SaveIcon />
              {loading ? (
                <Rings
                  height="80"
                  width="80"
                  color="#4fa94d"
                  radius="6"
                  wrapperStyle={{}}
                  visible={true}
                />
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditArticleModal;
