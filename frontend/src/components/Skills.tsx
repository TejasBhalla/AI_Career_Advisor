import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

interface RoadmapItem {
  name: string;
  completed: boolean;
  month: number;
}

interface YouTubeVideo {
  title: string;
  description: string;
  thumbnail: string;
  videoId: string;
  link: string;
}

function Skills({ userId: propUserId }: { userId?: string }) {
  const [career, setCareer] = useState("");
  const [suggestedSkills, setSuggestedSkills] = useState<string[]>([]);
  const [roadmap, setRoadmap] = useState<RoadmapItem[]>([]);
  const [videos, setVideos] = useState<Record<string, YouTubeVideo[]>>({});
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<{ id: string; name: string } | null>(null);

  // Fetch current user if userId not passed as prop
  useEffect(() => {
    if (!propUserId) {
      axios
        .get("http://localhost:5000/api/auth/profile", { withCredentials: true })
        .then((res) => setUser(res.data.user))
        .catch(() => setUser(null));
    }
  }, [propUserId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1️⃣ Get skills & roadmap from backend
      const res = await axios.post(
        "http://localhost:5000/api/ai/skills",
        { career },
        { withCredentials: true }
      );

      const skills = res.data.suggestedSkills || [];
      const roadmapData = res.data.roadmap || [];

      setSuggestedSkills(skills);
      setRoadmap(roadmapData);

      // 2️⃣ Fetch YouTube videos for each skill
      const videosMap: Record<string, YouTubeVideo[]> = {};

      await Promise.all(
        skills.map(async (skill) => {
          try {
          const videoRes = await axios.get(
            `http://localhost:5000/api/courses/youtube/${encodeURIComponent(skill)}`,
            { withCredentials: true }
          );
          videosMap[skill] = videoRes.data.courses || [];
        }catch(err){
          console.error(`Failed to fetch videos for ${skill}:`, err.message);
           videosMap[skill] = []; 
        }
        
        })
      );

      setVideos(videosMap);
    } catch (err) {
      console.error(err);
      setSuggestedSkills([]);
      setRoadmap([]);
      setVideos({});
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-auto bg-black text-white p-4">
      {/* Animated background orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-fuchsia-500/30 blur-3xl" />
      <div className="absolute top-40 -right-32 w-96 h-96 rounded-full bg-cyan-500/30 blur-3xl delay-1000" />
      <div className="absolute bottom-10 left-1/3 w-72 h-72 rounded-full bg-purple-600/20 blur-3xl delay-500" />

      {/* Glassmorphic card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-3xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-10 relative z-10 text-center"
      >
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-fuchsia-500 to-cyan-400 bg-clip-text text-transparent mb-6">
          Skill Development 📚
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Enter Career (e.g., Data Scientist, Product Manager)"
            value={career}
            onChange={(e) => setCareer(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
          />

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px #e879f9" }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 text-black py-3 rounded-lg font-semibold shadow-lg transition"
            disabled={loading}
          >
            {loading ? "Generating..." : "Get Skill Roadmap"}
          </motion.button>
        </form>

        {/* Suggested Skills & Roadmap */}
        {suggestedSkills.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-10 p-6 rounded-xl bg-white/10 border border-white/10 shadow-lg text-left"
          >
            <h3 className="text-2xl font-bold text-cyan-400 mb-3">
              Suggested Skills
            </h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              {suggestedSkills.map((s, idx) => (
                <li key={idx}>{s}</li>
              ))}
            </ul>

            <h3 className="text-2xl font-bold text-fuchsia-400 mt-6 mb-3">
              6-Month Roadmap
            </h3>
            <ul className="list-decimal list-inside text-gray-300 space-y-2">
              {roadmap.map((item, idx) => (
                <li key={idx}>
                  Month {item.month}: {item.name}{" "}
                  {item.completed ? "(✅ Completed)" : ""}
                </li>
              ))}
            </ul>

            {/* YouTube Videos */}
            {Object.keys(videos).length > 0 && (
              <div className="mt-6">
                <h3 className="text-2xl font-bold text-green-400 mb-4">
                  YouTube Courses by Skill
                </h3>
                {Object.entries(videos).map(([skill, skillVideos]) => (
                  <div key={skill} className="mb-6">
                    <h4 className="text-xl font-semibold text-white mb-2">{skill}</h4>
                    <ul className="space-y-4">
                      {skillVideos.map((video, idx) => (
                        <li key={idx} className="flex items-center gap-4">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-36 rounded-lg"
                          />
                          <div>
                            <a
                              href={video.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-lg font-semibold text-white hover:text-green-400"
                            >
                              {video.title}
                            </a>
                            <p className="text-gray-300 text-sm">{video.description}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default Skills;
