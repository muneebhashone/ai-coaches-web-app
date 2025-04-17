export interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  title: string;
  participants: string[];
  messages: Message[];
  lastActivity: string;
}

export const mockConversations: Conversation[] = [
  {
    id: "1",
    title: "Project Feedback Session",
    participants: ["User", "Coach Johnson"],
    lastActivity: "2025-04-17T20:30:00.000Z",
    messages: [
      {
        id: "1",
        sender: "Coach Johnson",
        text: "Hello, I've reviewed your project submission and have some feedback to share.",
        timestamp: "2025-04-17T20:00:00.000Z",
      },
      {
        id: "2",
        sender: "User",
        text: "Great! I'm looking forward to hearing your thoughts.",
        timestamp: "2025-04-17T20:01:00.000Z",
      },
      {
        id: "3",
        sender: "Coach Johnson",
        text: "Overall, I was impressed with your approach to solving the problem. The architecture you designed is clean and well-organized.",
        timestamp: "2025-04-17T20:05:00.000Z",
      },
      {
        id: "4",
        sender: "Coach Johnson",
        text: "I particularly liked how you implemented the authentication system with proper security considerations.",
        timestamp: "2025-04-17T20:06:00.000Z",
      },
      {
        id: "5",
        sender: "User",
        text: "Thank you! I spent a lot of time researching best practices for authentication.",
        timestamp: "2025-04-17T20:08:00.000Z",
      },
      {
        id: "6",
        sender: "Coach Johnson",
        text: "I did notice a few areas that could use improvement. First, some of your database queries could be optimized for better performance.",
        timestamp: "2025-04-17T20:12:00.000Z",
      },
      {
        id: "7",
        sender: "User",
        text: "Could you point out which ones specifically?",
        timestamp: "2025-04-17T20:14:00.000Z",
      },
      {
        id: "8",
        sender: "Coach Johnson",
        text: "Sure. In the user profile section, you're making multiple calls to the database when you could combine them into a single query with joins.",
        timestamp: "2025-04-17T20:16:00.000Z",
      },
      {
        id: "9",
        sender: "Coach Johnson",
        text: "Also, I noticed you're not using any caching mechanism for frequently accessed data.",
        timestamp: "2025-04-17T20:17:00.000Z",
      },
      {
        id: "10",
        sender: "User",
        text: "That makes sense. I wasn't sure if caching would be worth implementing for this scale of project.",
        timestamp: "2025-04-17T20:19:00.000Z",
      },
      {
        id: "11",
        sender: "Coach Johnson",
        text: "Even for smaller projects, it's good practice to implement basic caching. It will also prepare you for scaling in the future.",
        timestamp: "2025-04-17T20:21:00.000Z",
      },
      {
        id: "12",
        sender: "User",
        text: "Would you recommend Redis for this use case?",
        timestamp: "2025-04-17T20:23:00.000Z",
      },
      {
        id: "13",
        sender: "Coach Johnson",
        text: "Redis would be an excellent choice. It's lightweight enough for your project but powerful enough to grow with your needs.",
        timestamp: "2025-04-17T20:25:00.000Z",
      },
      {
        id: "14",
        sender: "User",
        text: "Great, I'll implement that in the next iteration. Any other suggestions?",
        timestamp: "2025-04-17T20:27:00.000Z",
      },
      {
        id: "15",
        sender: "Coach Johnson",
        text: "I'd recommend adding more comprehensive error handling and logging. This will make debugging easier and improve the user experience when things go wrong.",
        timestamp: "2025-04-17T20:29:00.000Z",
      },
      {
        id: "16",
        sender: "User",
        text: "That's helpful feedback. I'll work on implementing these improvements and send you an updated version next week.",
        timestamp: "2025-04-17T20:30:00.000Z",
      },
    ],
  },
  {
    id: "2",
    title: "Career Guidance Discussion",
    participants: ["User", "Coach Smith"],
    lastActivity: "2025-04-17T21:05:00.000Z",
    messages: [
      {
        id: "17",
        sender: "User",
        text: "Hi Coach, I'm considering a career change into data science. Would love your advice.",
        timestamp: "2025-04-17T20:02:00.000Z",
      },
      {
        id: "18",
        sender: "Coach Smith",
        text: "That's an exciting possibility! Let's discuss your background and what steps you might need to take.",
        timestamp: "2025-04-17T20:03:00.000Z",
      },
      {
        id: "19",
        sender: "User",
        text: "I currently work in marketing but have been learning Python and statistics in my spare time.",
        timestamp: "2025-04-17T20:10:00.000Z",
      },
      {
        id: "20",
        sender: "Coach Smith",
        text: "That's a great start! Your marketing experience can actually be valuable in data science roles that focus on consumer insights.",
        timestamp: "2025-04-17T20:15:00.000Z",
      },
      {
        id: "21",
        sender: "User",
        text: "That's good to hear. I was worried my marketing background would be a disadvantage.",
        timestamp: "2025-04-17T20:20:00.000Z",
      },
      {
        id: "22",
        sender: "Coach Smith",
        text: "Not at all! Domain knowledge is extremely valuable in data science. Understanding the business context of problems is just as important as technical skills.",
        timestamp: "2025-04-17T20:22:00.000Z",
      },
      {
        id: "23",
        sender: "User",
        text: "What skills should I prioritize learning? There seems to be so many areas to cover.",
        timestamp: "2025-04-17T20:25:00.000Z",
      },
      {
        id: "24",
        sender: "Coach Smith",
        text: "I'd recommend focusing on three core areas: programming skills (Python), statistical analysis, and machine learning fundamentals.",
        timestamp: "2025-04-17T20:30:00.000Z",
      },
      {
        id: "25",
        sender: "Coach Smith",
        text: "For Python, make sure you're comfortable with pandas, numpy, and scikit-learn libraries.",
        timestamp: "2025-04-17T20:31:00.000Z",
      },
      {
        id: "26",
        sender: "User",
        text: "I've started with pandas already. Should I also learn SQL?",
        timestamp: "2025-04-17T20:35:00.000Z",
      },
      {
        id: "27",
        sender: "Coach Smith",
        text: "Absolutely! SQL is essential for data science roles. Almost every company expects proficiency in SQL for working with their databases.",
        timestamp: "2025-04-17T20:38:00.000Z",
      },
      {
        id: "28",
        sender: "User",
        text: "What about education? Do I need a master's degree or would certifications be sufficient?",
        timestamp: "2025-04-17T20:45:00.000Z",
      },
      {
        id: "29",
        sender: "Coach Smith",
        text: "It depends on the roles you're targeting. Some research-heavy positions might require advanced degrees, but many data analyst and even some data scientist roles focus more on practical skills than formal education.",
        timestamp: "2025-04-17T20:50:00.000Z",
      },
      {
        id: "30",
        sender: "Coach Smith",
        text: "I'd recommend building a portfolio of projects that demonstrate your skills. Real-world projects are often more valuable to employers than certifications alone.",
        timestamp: "2025-04-17T20:52:00.000Z",
      },
      {
        id: "31",
        sender: "User",
        text: "That makes sense. What kind of projects would you suggest for someone transitioning from marketing?",
        timestamp: "2025-04-17T20:55:00.000Z",
      },
      {
        id: "32",
        sender: "Coach Smith",
        text: "You could start with projects that leverage your marketing knowledge - perhaps analyzing campaign effectiveness, customer segmentation, or predictive models for customer behavior.",
        timestamp: "2025-04-17T21:00:00.000Z",
      },
      {
        id: "33",
        sender: "Coach Smith",
        text: "This approach shows employers you can bridge your existing expertise with new technical skills - making you a unique candidate.",
        timestamp: "2025-04-17T21:02:00.000Z",
      },
      {
        id: "34",
        sender: "User",
        text: "This is all really helpful. I'm going to start planning my learning path and some initial projects based on your advice.",
        timestamp: "2025-04-17T21:05:00.000Z",
      },
    ],
  },
  {
    id: "3",
    title: "Technical Interview Preparation",
    participants: ["User", "Coach Zhang"],
    lastActivity: "2025-04-16T16:30:00.000Z",
    messages: [
      {
        id: "35",
        sender: "Coach Zhang",
        text: "Based on the job description you shared, we should focus on system design and algorithm questions.",
        timestamp: "2025-04-16T15:30:00.000Z",
      },
      {
        id: "36",
        sender: "User",
        text: "I'm particularly nervous about the system design portion. Do you have any resources to recommend?",
        timestamp: "2025-04-16T15:35:00.000Z",
      },
      {
        id: "37",
        sender: "Coach Zhang",
        text: "Absolutely! I'd recommend 'Designing Data-Intensive Applications' as a starter, and we can do a mock interview next week.",
        timestamp: "2025-04-16T15:45:00.000Z",
      },
      {
        id: "38",
        sender: "User",
        text: "Thanks! What kind of system design questions should I expect for a senior developer role?",
        timestamp: "2025-04-16T15:50:00.000Z",
      },
      {
        id: "39",
        sender: "Coach Zhang",
        text: "For a senior role, expect questions about designing scalable systems like a social media news feed, a ride-sharing service, or a distributed file storage system.",
        timestamp: "2025-04-16T15:55:00.000Z",
      },
      {
        id: "40",
        sender: "Coach Zhang",
        text: "They'll evaluate your ability to handle trade-offs between different architectural choices, how you approach scaling, and your understanding of reliability and consistency models.",
        timestamp: "2025-04-16T15:57:00.000Z",
      },
      {
        id: "41",
        sender: "User",
        text: "That sounds challenging. How should I structure my answers to these questions?",
        timestamp: "2025-04-16T16:00:00.000Z",
      },
      {
        id: "42",
        sender: "Coach Zhang",
        text: "Start by clarifying requirements - ask about scale, traffic patterns, and specific features needed. Then outline a high-level architecture before diving into specific components.",
        timestamp: "2025-04-16T16:05:00.000Z",
      },
      {
        id: "43",
        sender: "Coach Zhang",
        text: "Always discuss potential bottlenecks and how you'd address them. This shows you're thinking about future scaling needs.",
        timestamp: "2025-04-16T16:06:00.000Z",
      },
      {
        id: "44",
        sender: "User",
        text: "What about algorithm questions? Any specific areas I should review?",
        timestamp: "2025-04-16T16:10:00.000Z",
      },
      {
        id: "45",
        sender: "Coach Zhang",
        text: "Based on the company, I'd focus on graph algorithms, dynamic programming, and tree traversal problems. These come up frequently in their interviews.",
        timestamp: "2025-04-16T16:15:00.000Z",
      },
      {
        id: "46",
        sender: "User",
        text: "I'm a bit rusty on graph algorithms. Any specific practice problems you'd recommend?",
        timestamp: "2025-04-16T16:20:00.000Z",
      },
      {
        id: "47",
        sender: "Coach Zhang",
        text: "I'd start with problems involving BFS/DFS, shortest path algorithms, and detecting cycles. There are some great problems on LeetCode - I'll send you a list of specific ones to practice.",
        timestamp: "2025-04-16T16:25:00.000Z",
      },
      {
        id: "48",
        sender: "User",
        text: "That would be incredibly helpful. Should we schedule a mock interview session to practice these concepts?",
        timestamp: "2025-04-16T16:28:00.000Z",
      },
      {
        id: "49",
        sender: "Coach Zhang",
        text: "Definitely. Let's schedule two sessions - one focused on algorithms and another on system design. That way we can give proper attention to each area.",
        timestamp: "2025-04-16T16:30:00.000Z",
      },
    ],
  },
];
