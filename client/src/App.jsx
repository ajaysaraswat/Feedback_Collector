import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { motion, AnimatePresence } from "framer-motion";
import FeedbackForm from "./components/FeedbackForm";
import FeedbackList from "./components/FeedbackList";
import ThemeToggle from "./components/ThemeToggle";

const queryClient = new QueryClient();

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    <QueryClientProvider client={queryClient}>
      <div
        className={`min-h-screen w-screen overflow-x-hidden transition-colors duration-300 ${
          isDarkMode ? "dark bg-gray-900 text-white" : "bg-gray-50 text-black"
        }`}
      >
        <div className="w-full h-full px-3 sm:px-6 lg:px-8 py-3 sm:py-6 lg:py-8">
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6 max-w-7xl mx-auto">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">
              Feedback Collector
            </h1>
            <ThemeToggle
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
            />
          </header>

          <main className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 h-[calc(100vh-8rem)] sm:h-[calc(100vh-10rem)] max-w-7xl mx-auto">
            <div className="h-full">
              <FeedbackForm />
            </div>
            <div className="h-full overflow-y-auto">
              <FeedbackList />
            </div>
          </main>

          <footer className="mt-3 sm:mt-4 text-center text-xs sm:text-sm max-w-7xl mx-auto">
            <p>
              Created by [Your Name] | Feedback Collector ©{" "}
              {new Date().getFullYear()}
            </p>
          </footer>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
