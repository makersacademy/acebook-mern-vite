// define a function to make the API call to the backend to go get the user data that you need for the profile

// this function will return a promise...that resolves with the fetched user data

// import this service to the component where it gets called (ProfilePicture)


// setting the backend_url as a constant so you can get access to it whenever

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


export const fetchProfileData = async (token) => {
    const requestOptions = {
        method: "GET",
        headers: {
        Authorization: `Bearer ${token}`, 
        },

    }

    const response = await fetch(`${BACKEND_URL}/users`, requestOptions);

// how will it know whose info you are retrieving?

  if (response.status !== 200) {
    throw new Error("Unable to fetch user info");
  }

  const profileData = await response.json();
  return profileData;
};


