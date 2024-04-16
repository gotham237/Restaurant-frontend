import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const getUsers = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/v1/users");
    const users = await response.data;
  
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export function useUsers() {
  const {
    isLoading,
    data: users,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  return { isLoading, error, users };
}
