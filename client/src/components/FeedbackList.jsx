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
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg h-full">
        <h2 className="text-2xl font-semibold mb-6">Recent Feedbacks</h2>
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg h-full">
        <h2 className="text-2xl font-semibold mb-6">Recent Feedbacks</h2>
        <div className="text-red-500">Error loading feedbacks</div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg h-full"
    >
      <h2 className="text-2xl font-semibold mb-6">Recent Feedbacks</h2>
      <div className="space-y-4 overflow-y-auto max-h-[calc(100%-4rem)] pr-2">
        <AnimatePresence>
          {feedbacks?.map((feedback) => (
            <motion.div
              key={feedback._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="border-b dark:border-gray-700 pb-4 last:border-0"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">{feedback.name}</h3>
                <div className="flex flex-col items-end">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {format(
                      new Date(feedback.createdAt),
                      "MMM d, yyyy 'at' h:mm a"
                    )}
                  </span>
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    {formatDistanceToNow(new Date(feedback.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                {feedback.message}
              </p>
              <a
                href={`mailto:${feedback.email}`}
                className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
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
