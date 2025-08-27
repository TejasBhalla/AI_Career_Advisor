import axios from "axios";
import dotenv from "dotenv"
dotenv.config()
export const getYouTubeCourses = async (req, res) => {
  try {
    const { skill } = req.params;
    const query = `Beginner ${skill} course`;

    const response = await axios.get("https://www.googleapis.com/youtube/v3/search", {
      params: {
        key: process.env.YOUTUBE_API_KEY,
        part: "snippet",
        q: query,
        type: "video",
        maxResults: 5,
      },
    });

    const courses = response.data.items.map((item) => ({
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.high.url,
      videoId: item.id.videoId,
      link: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    }));

    res.json({ skill, courses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch YouTube courses", error: error.message });
  }
};