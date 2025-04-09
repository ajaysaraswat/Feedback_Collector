import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { motion } from "framer-motion";

const FeedbackForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const mutation = useMutation(
    (data) => axios.post("http://localhost:5000/api/feedbacks", data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("feedbacks");
        reset();
        setIsSubmitting(false);
      },
      onError: () => {
        setIsSubmitting(false);
      },
    }
  );

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    mutation.mutate(data);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 p-3 sm:p-4 lg:p-6 rounded-lg shadow-lg h-full flex flex-col"
    >
      <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4 lg:mb-6 text-black dark:text-white">
        Submit Feedback
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-2 sm:space-y-3 lg:space-y-4 flex-grow flex flex-col"
      >
        <div className="flex-grow space-y-2 sm:space-y-3 lg:space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-xs sm:text-sm font-medium mb-1 text-black dark:text-white"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name", { required: "Name is required" })}
              className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-xs sm:text-sm font-medium mb-1 text-black dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="flex-grow">
            <label
              htmlFor="message"
              className="block text-xs sm:text-sm font-medium mb-1 text-black dark:text-white"
            >
              Feedback Message
            </label>
            <textarea
              id="message"
              {...register("message", {
                required: "Message is required",
                minLength: {
                  value: 10,
                  message: "Message must be at least 10 characters long",
                },
              })}
              className="w-full h-full min-h-[100px] sm:min-h-[150px] lg:min-h-[200px] px-2 sm:px-3 py-1.5 sm:py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
            />
            {errors.message && (
              <p className="text-red-500 text-xs mt-1">
                {errors.message.message}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-1.5 sm:py-2 px-3 sm:px-4 text-sm rounded-lg text-white font-medium transition-colors ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Submit Feedback"}
        </button>
      </form>
    </motion.div>
  );
};

export default FeedbackForm;
