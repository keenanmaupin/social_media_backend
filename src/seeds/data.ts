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

// Sample names for random generation
const names = ['John', 'Jane', 'Alex', 'Chris', 'Pat', 'Taylor', 'Jordan', 'Morgan'];

// Sample descriptions for assignments
const appDescriptions = ['Project 1', 'Homework 2', 'Lab 3', 'Final Exam', 'Quiz'];

// Function to get a random item from an array
export const getRandomArrItem = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

// Function to get a random full name
export const getRandomName = () => `${getRandomArrItem(names)} ${getRandomArrItem(names)}`;

// Function to generate random assignments
export const getRandomAssignments = (int: number) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      name: getRandomArrItem(appDescriptions),
      score: Math.floor(Math.random() * (99 - 70 + 1) + 70),
    });
  }
  return results;
};
