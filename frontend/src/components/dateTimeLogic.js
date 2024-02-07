export const calculateTimeSincePost = (inputTimeString) => {
  const inputTime = new Date(inputTimeString);
  const currentTime = Date.now();
  const timeDifferenceInMillis = currentTime - inputTime;

  // Convert milliseconds to seconds
  const timeDifferenceInSeconds = timeDifferenceInMillis / 1000;
  if (timeDifferenceInSeconds < 60) {
    if (Math.round(timeDifferenceInSeconds) === 0) {
      return 1 + " s";
    }
    return Math.round(timeDifferenceInSeconds) + " s";
  }

  // Convert seconds to minutes
  const timeDifferenceInMinutes = timeDifferenceInSeconds / 60;
  if (timeDifferenceInMinutes < 60) {
    return Math.round(timeDifferenceInMinutes) + " m";
  }

  // Convert minutes to hours
  const timeDifferenceInHours = timeDifferenceInMinutes / 60;
  if (timeDifferenceInHours < 24) {
    return Math.round(timeDifferenceInHours) + " h";
  }

  // Convert hours to days
  const timeDifferenceInDays = timeDifferenceInHours / 24;
  if (timeDifferenceInDays < 30) {
    return Math.round(timeDifferenceInDays) + " d";
  }

  return "No Date!";
};
