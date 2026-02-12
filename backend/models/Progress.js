import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  completed: { type: Boolean, default: false },
  month: { type: Number} 
}); 

const progressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  skills: [skillSchema], 
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

progressSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Progress = mongoose.model("Progress", progressSchema);

export default Progress;
