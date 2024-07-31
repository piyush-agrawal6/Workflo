// Define interfaces for the data objects
interface NavData {
  title: string;
  iconPath: string;
}

interface CardData {
  title: string;
  desc: string;
  iconPath: string;
}

interface TaskData {
  title: string;
  description: string;
  priority: string;
  status: string;
  deadline: string;
  createdAt: string;
  id: number;
}

export const navData: NavData[] = [
  { title: "Home", iconPath: "./home.svg" },
  { title: "Boards", iconPath: "./boards.svg" },
  { title: "Settings", iconPath: "./settings.svg" },
  { title: "Teams", iconPath: "./teams.svg" },
  { title: "Analytics", iconPath: "./analytics.svg" },
];

export const cardsData: CardData[] = [
  {
    title: "Introducing tags",
    desc: "Easily categorize and find your notes by adding tags. Keep your workspace clutter-free and efficient.",
    iconPath: "./card1.png",
  },
  {
    title: "Share Notes Instantly",
    desc: "Effortlessly share your notes with others via email or link. Enhance collaboration with quick sharing options.",
    iconPath: "./card2.png",
  },
  {
    title: "Access Anywhere",
    desc: "Sync your notes across all devices. Stay productive whether you're on your phone, tablet, or computer.",
    iconPath: "./card3.png",
  },
];

export const taskData: TaskData[] = [
  {
    title: "Login page UI",
    description:
      "Develop and integrate user authentication using email and password.",
    priority: "Low",
    status: "toDo",
    deadline: "2024-22-12",
    createdAt: "1 hr ago",
    id: 1,
  },
  {
    title: "Home page UI",
    description:
      "Develop and integrate user authentication using email and password.",
    priority: "Urgent",
    status: "inProgress",
    deadline: "2024-22-12",
    createdAt: "1 hr ago",
    id: 2,
  },
  {
    title: "Signup page UI",
    description:
      "Develop and integrate user authentication using email and password.",
    priority: "Medium",
    status: "underReview",
    deadline: "2024-22-12",
    createdAt: "1 hr ago",
    id: 3,
  },
  {
    title: "Task page UI",
    description:
      "Develop and integrate user authentication using email and password.",
    priority: "Urgent",
    status: "finished",
    deadline: "2024-22-12",
    createdAt: "1 hr ago",
    id: 4,
  },
  {
    title: "Task page UI",
    description:
      "Develop and integrate user authentication using email and password.",
    priority: "Urgent",
    status: "finished",
    deadline: "2024-22-12",
    createdAt: "1 hr ago",
    id: 5,
  },
];
