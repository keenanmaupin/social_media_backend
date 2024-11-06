// data.ts

export const seedUsers = [
  {
    username: 'starski',
    email: 'starski@example.com',
    friends: [],
  },
  {
    username: 'hutch',
    email: 'hutch@example.com',
    friends: [],
  },
  {
    username: 'challenger',
    email: 'challenger@example.com',
    friends: [],
  },
];

export const seedThoughts = [
  {
    thoughtText: 'This is a thought by starski',
    username: 'starski',
    reactions: [
      {
        reactionBody: 'Nice thought!',
        username: 'hutch',
      },
    ],
  },
  {
    thoughtText: 'Another interesting thought by challenger',
    username: 'challenger',
    reactions: [
      {
        reactionBody: 'Get errr done!!',
        username: 'starski',
      },
    ],
  },
];
