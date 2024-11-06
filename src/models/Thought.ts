const { Schema, model, Types } = require('mongoose');

// Reaction schema (nested within Thought)
const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp: string | number | Date) => new Date(timestamp).toLocaleDateString() // Getter to format date
  }
},
{
  toJSON: {
    getters: true,
  },
  id: false,
});

// Define the Thought schema
const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp: string | number | Date) => new Date(timestamp).toLocaleDateString() // Getter to format date
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema],
},
{
  toJSON: {
    virtuals: true,
    getters: true,
  },
  id: false,
});

// Virtual for reaction count
thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);
export default Thought;
