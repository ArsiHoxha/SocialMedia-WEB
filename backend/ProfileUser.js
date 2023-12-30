const mongoose = require("mongoose");


const profileSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  bannerImage: { type: String, required: false },
  profileImage: { type: String, required: false },
  workDetail: { type: String, required: false },
  cityDetail: { type: String, required: false },
  addSchool: { type: String, required: false },
  addMore: { type: String, required: false },
  posts: { type: String, required: false },
  postsDescription: { type: String, required: false },

  
});
const ProfileUser  = mongoose.model('Profile',profileSchema)


module.exports = ProfileUser