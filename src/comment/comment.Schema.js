import mongoose from"mongoose"

const commentSchema = mongoose.Schema({
    content: {
      type: String,
      required: true,
    },
    postid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    likes: [
      {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
          required: true,
      }
  ]
  });
  
  export default commentSchema;