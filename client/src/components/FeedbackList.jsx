import { useQuery } from "react-query";
import axios from "axios";
import { format, formatDistanceToNow } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

const FeedbackList = () => {
  const {
    data: feedbacks,
    isLoading,
    error,
  } = useQuery("feedbacks", async () => {
    const response = await axios.get("http://localhost:5000/api/feedbacks");
    return response.data;
  });

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg h-full">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-black dark:text-white">
          Recent Feedbacks
        </h2>
        <div className="animate-pulse space-y-3 sm:space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-20 sm:h-24 bg-gray-200 dark:bg-gray-700 rounded-lg"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg h-full">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-black dark:text-white">
          Recent Feedbacks
        </h2>
        <div className="text-red-500">Error loading feedbacks</div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg h-full"
    >
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-black dark:text-white">
        Recent Feedbacks
      </h2>
      <div className="space-y-3 sm:space-y-4 overflow-y-auto max-h-[calc(100%-4rem)] pr-2">
        <AnimatePresence>
          {feedbacks?.map((feedback) => (
            <motion.div
              key={feedback._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="border-b dark:border-gray-700 pb-3 sm:pb-4 last:border-0"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-2 mb-2">
                <h3 className="font-medium text-black dark:text-white text-sm sm:text-base">
                  {feedback.name}
                </h3>
                <div className="flex flex-col items-start sm:items-end">
                  <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    {format(
                      new Date(feedback.createdAt),
                      "MMM d, yyyy 'at' h:mm a"
                    )}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-500">
                    {formatDistanceToNow(new Date(feedback.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </div>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-2">
                {feedback.message}
              </p>
              <a
                href={`mailto:${feedback.email}`}
                className="text-xs sm:text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
              >
                {feedback.email}
              </a>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default FeedbackList;
