import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
} from "recharts";
import { useAuthStore } from "./store/useUserStore"; // <-- import zustand

interface SkillProgress {
  name: string;
  completed: boolean;
  month: number;
}

export default function Dashboard() {
  const { user, isLoggedIn, fetchUser } = useAuthStore();
  const [progress, setProgress] = useState<SkillProgress[]>([]);
  const navigate = useNavigate();

  // Fetch user (from zustand) + progress
  useEffect(() => {
    fetchUser(); // get latest session user
  }, [fetchUser]);

  useEffect(() => {
    if (user?._id) {
      axios
        .get(`http://localhost:5000/api/progress/${user._id}`)
        .then((p) => setProgress(p.data.skills || []))
        .catch(() => setProgress([]));
    }
  }, [user]);

  // Toggle skill completion
  const toggleSkill = async (skillName: string, completed: boolean) => {
    if (!user?._id) return;
    try {
      const res = await axios.post(
        `http://localhost:5000/api/progress/${user._id}`,
        { skillName, completed }
      );
      setProgress(res.data.skills);
    } catch (err) {
      console.error("Error updating progress", err);
    }
  };

  // Radar chart data
  const chartData = progress.map((s) => ({
    skill: s.name,
    user: s.completed ? 1 : 0,
    required: 1,
  }));

  return (
    <div className="relative min-h-screen bg-gray-950 text-white overflow-hidden">
      {/* background particles */}
      <Particles
        options={{
          background: { color: "#0f0f0f" },
          particles: {
            color: { value: ["#6366f1", "#ec4899", "#22d3ee"] },
            move: { enable: true, speed: 1.5 },
            number: { value: 60 },
            opacity: { value: 0.4 },
            size: { value: { min: 2, max: 5 } },
          },
        }}
        className="absolute inset-0 -z-10"
      />

      {/* Title */}
      <div className="flex justify-center items-center py-16">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent"
        >
          CareerAI Dashboard
        </motion.h1>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto p-8 space-y-16">
        {!isLoggedIn ? (
          // If not logged in
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center space-y-8"
          >
            <p className="text-xl text-gray-300">
              Welcome to <span className="font-semibold text-pink-400">CareerAI</span> 🚀
            </p>
            <p className="text-gray-400 max-w-xl mx-auto">
              Sign in to explore your personalized roadmap and track progress.
            </p>
            <div className="space-x-6">
              <button
                onClick={() => navigate("/login")}
                className="px-8 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 transition text-lg"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="px-8 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 transition text-lg"
              >
                Register
              </button>
            </div>
          </motion.div>
        ) : (
          // If logged in
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <h2 className="text-4xl font-semibold">
              Hi, <span className="text-pink-400">{user?.name}</span> 👋
            </h2>

            {/* Skills with checkboxes */}
            <div>
              <h3 className="text-2xl font-semibold mb-4">Your Roadmap</h3>
              <div className="space-y-3">
                {progress.map((skill) => (
                  <label
                    key={skill.name}
                    className="flex items-center gap-3 p-3 rounded-lg bg-gray-800 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={skill.completed}
                      onChange={(e) => toggleSkill(skill.name, e.target.checked)}
                      className="w-5 h-5 accent-pink-500"
                    />
                    <span className={skill.completed ? "line-through text-gray-400" : ""}>
                      {skill.name}{" "}
                      <span className="text-gray-400">(Month {skill.month})</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Radar Chart */}
            {progress.length > 0 && (
              <div className="p-6 rounded-2xl bg-gray-900 shadow-lg">
                <h3 className="text-2xl font-semibold mb-6">Skill Completion</h3>
                <div className="flex justify-center">
                  <RadarChart
                    cx={300}
                    cy={250}
                    outerRadius={150}
                    width={600}
                    height={450}
                    data={chartData}
                  >
                    <PolarGrid />
                    <PolarAngleAxis dataKey="skill" />
                    <PolarRadiusAxis angle={30} domain={[0, 1]} />
                    <Radar
                      name="User"
                      dataKey="user"
                      stroke="#22d3ee"
                      fill="#22d3ee"
                      fillOpacity={0.6}
                    />
                    <Radar
                      name="Required"
                      dataKey="required"
                      stroke="#a855f7"
                      fill="#a855f7"
                      fillOpacity={0.3}
                    />
                    <Tooltip />
                  </RadarChart>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
