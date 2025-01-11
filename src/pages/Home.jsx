import React from "react";

function Home() {
  return <div>Home</div>;
}

export default Home;

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { setLoading, setArticles, setPage } from "../store/articleSlice";
// import * as Icons from "@radix-ui/react-icons";
// import { Button } from "@radix-ui/themes/dist/cjs/index.js";

// function Home() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { articles, currentPage, totalPages, isLoading } = useSelector(
//     (state) => state.articles
//   );

//   const userData = (() => {
//     try {
//       const user = localStorage.getItem("user");
//       return user ? JSON.parse(user) : null;
//     } catch (error) {
//       console.error("Invalid JSON in localStorage for key 'user':", error);
//       return null;
//     }
//   })();

//   const fetchArticles = async (page) => {
//     if (!userData || !userData.access_token) {
//       console.log("No valid user token found.");
//     }

//     dispatch(setLoading(true));
//     try {
//       const response = await axios.get(
//         `https://json-api.uz/api/project/blog-api/articles`,
//         {
//           headers: {
//             "Content-Type": `application-json`,
//           },
//         }
//       );

//       dispatch(
//         setArticles({
//           articles: response.data?.data || [],
//           currentPage: page,
//           totalPages: Math.ceil(response.data.total / 10),
//         })
//       );
//     } catch (error) {
//       console.error("Error fetching articles:", error);
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(
//         `https://json-api.uz/api/project/blog-api/articles/${id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${userData.access_token}`,
//           },
//         }
//       );
//       fetchArticles(currentPage);
//     } catch (error) {
//       console.log("Error deleting article:", error);
//     }
//   };

//   useEffect(() => {
//     fetchArticles(currentPage);
//   }, [currentPage]);

//   const handlePageChange = (newPage) => {
//     if (newPage > 0 && newPage <= totalPages) {
//       dispatch(setPage(newPage));
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-6">
//       <h1 className="text-3xl font-bold mb-6 text-center">Articles</h1>
//       {isLoading ? (
//         <p className="text-center">Loading articles...</p>
//       ) : (
//         <>
//           <div className="flex flex-col space-y-4">
//             {articles.map((article) => (
//               <div
//                 key={article.id}
//                 className="p-4 bg-white border flex justify-between rounded-lg shadow-md hover:shadow-lg transition-shadow dark:bg-gray-800"
//               >
//                 <div>
//                   <h2
//                     className="text-xl font-semibold mb-2 dark:text-indigo-400 text-indigo-600 hover:underline cursor-pointer"
//                     onClick={() =>
//                       navigate(`/article-details`, { state: { article } })
//                     }
//                   >
//                     {article.title}
//                   </h2>
//                   <p className=" mb-4">{article.description}</p>
//                   <p className=" mb-4 line-clamp-2 w-[70%] text-justify">
//                     {article.fullDescription}
//                   </p>

//                   <p className="text-sm dark:opacity-80">
//                     Published: {new Date(article.time).toLocaleDateString()}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//           {/* Pagination */}
//           <div className="flex justify-center items-center mt-6 space-x-4">
//             <Button
//               onClick={() => handlePageChange(currentPage - 1)}
//               disabled={currentPage === 1}
//               className={`px-4 py-2 rounded ${
//                 currentPage === 1
//                   ? "bg-gray-300 dark:bg-gray-600 cursor-not-allowed"
//                   : "bg-indigo-500 text-white hover:bg-indigo-600"
//               }`}
//             >
//               Previous
//             </Button>
//             <span className="text-gray-700 dark:text-gray-300">
//               Page {currentPage} of {totalPages}
//             </span>
//             <Button
//               onClick={() => handlePageChange(currentPage + 1)}
//               disabled={currentPage === totalPages}
//               className={`px-4 py-2 rounded ${
//                 currentPage === totalPages
//                   ? "bg-gray-300 dark:bg-gray-600 cursor-not-allowed"
//                   : "bg-indigo-500 text-white hover:bg-indigo-600"
//               }`}
//             >
//               Next
//             </Button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default Home;
