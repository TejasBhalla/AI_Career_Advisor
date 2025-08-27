import Progress from "../models/Progress.js";

// Get user progress
export const getProgress = async (req, res) => {
  try {
    const { userId } = req.params;
    const progress = await Progress.findOne({ user: userId }).populate("user");
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch progress" });
  }
};

// Update progress (mark skill complete/incomplete)
export const updateProgress = async (req, res) => {
  try {
    const { userId } = req.params;
    const { skillName, completed } = req.body;

    let progress = await Progress.findOne({ user: userId });

    if (!progress) {
      progress = new Progress({ user: userId, skills: [] });
    }

    const skillIndex = progress.skills.findIndex(
      (s) => s.name.toLowerCase() === skillName.toLowerCase()
    );

    if (skillIndex >= 0) {
      progress.skills[skillIndex].completed = completed;
    } else {
      progress.skills.push({ name: skillName, complete, month: progress.skills.length + 1  });
    }

    await progress.save();
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: "Failed to update progress" });
  }
};

