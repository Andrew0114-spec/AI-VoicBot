/* eslint-disable no-useless-catch */
import customAxios from "../serverCalls";

export const registerUser = async (userData: object) => {
  try {
    const response = await customAxios.post("/users/signup", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (userData: object) => {
  try {
    // console.log(userData);
    const response = await customAxios.post("/users/signin", userData);
    const { token } = response.data;
    localStorage.setItem("authToken", token); // Store the token in localStorage
    return response.data;
  } catch (error) {
    throw error;
  }
};
