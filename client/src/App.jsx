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
        className={`min-h-screen transition-colors duration-300 ${
          isDarkMode
            ? "dark bg-gray-900 text-white"
            : "bg-gray-50 text-gray-900"
        }`}
      >
        <div className="container mx-auto px-4 py-8">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Feedback Collector</h1>
            <ThemeToggle
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
            />
          </header>

          <main className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence mode="wait">
              <motion.div
                key="form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <FeedbackForm />
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key="list"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <FeedbackList />
              </motion.div>
            </AnimatePresence>
          </main>

          <footer className="mt-12 text-center text-sm">
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
