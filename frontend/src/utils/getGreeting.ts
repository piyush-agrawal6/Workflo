// utils/getGreeting.ts
export const getGreeting = () => {
  const now = new Date();
  const hours = now.getUTCHours() + 5.5; 

  if (hours >= 5 && hours < 12) {
    return "Good morning";
  } else if (hours >= 12 && hours < 17) {
    return "Good afternoon";
  } else if (hours >= 17 && hours < 21) {
    return "Good evening";
  } else {
    return "Good night";
  }
};
