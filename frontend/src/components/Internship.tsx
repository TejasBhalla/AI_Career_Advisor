import { useState } from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { FaReact, FaNodeJs, FaPython, FaDatabase, FaMapMarkerAlt, FaBuilding, FaSearch } from "react-icons/fa";

interface InternshipType {
  title: string;
  company: string;
  location: string;
  skills: string[];
  link: string;
}

function Internship() {
  const [skillFilter, setSkillFilter] = useState<string>("");
  const [internships, setInternships] = useState<InternshipType[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchInternships = async (skill: string) => {
    if (!skill.trim()) return;
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/internships?skill=${encodeURIComponent(skill)}`);
      const data = await response.json();
      
      // Map backend data to include skills array if needed
      const mappedInternships: InternshipType[] = data.internships.map((i: any) => ({
        title: i.title,
        company: i.company,
        location: i.location,
        link: i.link,
        skills: skill ? [skill] : [] // just display the searched skill for now
      }));

      setInternships(mappedInternships);
    } catch (err) {
      console.error("Error fetching internships:", err);
      setInternships([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchInternships(skillFilter);
  };

  const skillIcon = (skill: string) => {
    switch (skill.toLowerCase()) {
      case "react": return <FaReact className="inline mr-1 text-cyan-400" />;
      case "nodejs": return <FaNodeJs className="inline mr-1 text-green-500" />;
      case "python": return <FaPython className="inline mr-1 text-yellow-400" />;
      case "database": return <FaDatabase className="inline mr-1 text-blue-400" />;
      default: return null;
    }
  };

  return (
    <div className="relative flex flex-col items-center min-h-screen overflow-hidden bg-black text-white px-6 pt-24">
      <Particles
        className="absolute inset-0 z-0"
        options={{
          particles: {
            number: { value: 90 },
            color: { value: ["#00ffff", "#ff00ff", "#00ff00"] },
            size: { value: { min: 2, max: 4 } },
            move: { enable: true, speed: { min: 0.4, max: 1.4 } },
            links: { enable: true, distance: 140, color: "#fff", opacity: 0.2 },
          },
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-6xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-10 relative z-10"
      >
        <h2 className="text-4xl font-extrabold text-center mb-2 bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent animate-pulse">
          Internship Matches
        </h2>
        <p className="text-center text-gray-400 mb-8">
          Find internships tailored to your <span className="text-cyan-400">skills</span>.
        </p>

        {/* Search Input */}
        <div className="relative mb-10">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={skillFilter}
            onChange={(e) => setSkillFilter(e.target.value)}
            placeholder="Search by skill..."
            className="peer w-full pl-12 pr-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-lg"
          />
          <button
            onClick={handleSearch}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-cyan-500 rounded-lg hover:bg-cyan-600 transition"
          >
            Search
          </button>
        </div>

        {/* Internship Cards */}
        {loading ? (
          <p className="text-center text-gray-400">⏳ Loading...</p>
        ) : internships.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {internships.map((i, idx) => (
              <Tilt key={idx} tiltMaxAngleX={10} tiltMaxAngleY={10}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08, duration: 0.5 }}
                  whileHover={{ y: -8, scale: 1.04 }}
                  className="relative group bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl hover:shadow-xl transition-all duration-200 backdrop-blur-md"
                >
                  <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-r from-cyan-900 to-fuchsia-200 opacity-5 group-hover:opacity-70 transition-opacity"></div>
                  <div className="relative z-10">
                    <h4 className="text-lg font-semibold mb-3">
                      <a href={i.link} target="_blank" className="hover:underline">{i.title}</a>
                    </h4>
                    <p className="flex items-center gap-2 text-gray-300 mb-1"><FaBuilding /> {i.company}</p>
                    <p className="flex items-center gap-2 text-gray-400 mb-3"><FaMapMarkerAlt /> {i.location}</p>
                    <div className="flex flex-wrap gap-2">
                      {i.skills.map((s, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-black text-sm font-semibold hover:scale-105 hover:shadow-[0_0_15px_rgba(236,72,153,0.8)] transition-all flex items-center gap-1"
                        >
                          {skillIcon(s)} {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </Tilt>
            ))}
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12 text-gray-400">
            <p className="text-2xl mb-3">😕 No matches found</p>
            <p>Try searching for <span className="text-cyan-400">Python</span>, <span className="text-pink-400">React</span>, or <span className="text-green-400">NodeJS</span>.</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default Internship;
