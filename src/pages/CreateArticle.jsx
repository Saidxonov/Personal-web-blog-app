import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Rings } from "react-loader-spinner";

const CreateArticle = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    fullDescription: "",
    time: new Date().toISOString().split(".")[0] + "Z",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const theme = localStorage.getItem("theme") || "light";
  const userData = JSON.parse(localStorage.getItem("user"));
  const token = userData?.access_token;
  const username = userData?.username;

  if (!token || !username) {
    navigate("/login");
    return null;
  }

  useEffect(() => {
    document.documentElement.classList.add(theme);
  }, [theme]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "https://json-api.uz/api/project/blog-api/articles",
        {
          ...formData,
          username,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        navigate("/");
      }
    } catch (err) {
      setError("Failed to create article. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`container mx-auto px-4 w-full sm:max-w-[70%] py-6 border dark:bg-gray-800 rounded-lg p-6 my-20`}
    >
      <h2 className="sm:text-2xl text-xl font-bold mb-4 text-center">
        Create Article
      </h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Title
          </label>
          <Input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            placeholder="Enter title"
            onChange={handleChange}
            className="w-full p-2 mt-1  border border-gray-300  dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Description
          </label>
          <Input
            type="text"
            placeholder="Short description"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 mt-1 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="fullDescription"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Full Description
          </label>
          <Textarea
            id="fullDescription"
            name="fullDescription"
            placeholder="Full article"
            value={formData.fullDescription}
            onChange={handleChange}
            rows="4"
            className="w-full p-2 mt-1 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            variant="outline"
            className="bg-white text-black dark:bg-gray-600 dark:text-white"
            type="button"
            onClick={() => navigate("/")}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            type="submit"
            className="bg-blue-600 dark:bg-blue-700 text-white"
            disabled={loading}
          >
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
              "Create"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateArticle;
