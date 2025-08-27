import { motion } from "framer-motion";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCareerStore } from "./store/useCareerStore";

function Career() {
  const {
    interest,
    skill,
    experience,
    result,
    setInterest,
    setSkill,
    setExperience,
    setResult,
  } = useCareerStore();

  const [loading, setLoading] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/ai/career", {
        skills: [skill],
        experience,
        interests: [interest],
      });
      setResult(res.data.advice); // ✅ persist result in Zustand
    } catch (err) {
      console.error(err);
      setResult("⚠️ Failed to fetch career advice. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-b from-[#0d0d1a] via-[#111122] to-[#0d0d1a] text-white px-4 overflow-hidden">
      {/* Cursor spotlight */}
      <div
        className="pointer-events-none absolute w-[450px] h-[450px] rounded-full bg-fuchsia-500/10 blur-3xl transition-all"
        style={{
          left: cursorPos.x - 225,
          top: cursorPos.y - 225,
        }}
      />

      {/* Glass card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-10 shadow-xl"
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-100">
            Career Recommendation
          </h2>
          <div className="mt-2 h-1 w-16 mx-auto rounded-full bg-gradient-to-r from-fuchsia-500 to-indigo-500" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Your Interest"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-fuchsia-400 transition"
          />

          <input
            type="text"
            placeholder="Your Skill"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-fuchsia-400 transition"
          />

          <input
            type="text"
            placeholder="Your Experience"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-fuchsia-400 transition"
          />

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-fuchsia-500/30 to-indigo-500/30 border border-fuchsia-400/40 text-white py-3 rounded-lg font-medium hover:from-fuchsia-500/40 hover:to-indigo-500/40 transition"
          >
            {loading ? "⏳ Generating..." : "Get Recommendation"}
          </motion.button>
        </form>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-8 p-6 rounded-xl bg-white/5 border border-fuchsia-400/40 text-gray-200 text-sm leading-relaxed space-y-4"
          >
            {result
              .split("\n")
              .filter((line) => line.trim() !== "")
              .map((line, idx) => {
                if (line.toLowerCase().includes("career path")) {
                  return (
                    <h3
                      key={idx}
                      className="text-lg font-semibold text-fuchsia-400"
                    >
                      {line}
                    </h3>
                  );
                } else if (
                  line.toLowerCase().includes("job roles") ||
                  line.toLowerCase().includes("required skills") ||
                  line.toLowerCase().includes("roadmap")
                ) {
                  return (
                    <p key={idx} className="font-medium text-indigo-300 mt-3">
                      {line}
                    </p>
                  );
                } else if (line.startsWith("-") || line.startsWith("•")) {
                  return (
                    <li key={idx} className="list-disc ml-6 text-gray-300">
                      {line.replace(/^[-•]\s*/, "")}
                    </li>
                  );
                } else {
                  return <p key={idx}>{line}</p>;
                }
              })}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default Career;
