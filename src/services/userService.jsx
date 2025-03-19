import axios from 'axios';
;
const API_URL = "http://localhost:5000/api"; //  backend URL


const route="users"

export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/${route}`);
    console.log(response)
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}
export const getuserbymail=async(email)=>{
  try{
    const response=await axios.get(`${API_URL}/${route}/${email}`)
    if (response){
      console.log("user email exists")
    }else{
      console.log("user doesnt exist")
    }

  }catch(error){
      console.error("an error occured:",error)
  }
}
export const updateUserpassword = async (email, newPassword) => {
  try {
    const response = await axios.put(`${API_URL}/${route}/${email}`, { email,newPassword });
    return response.data;
  } catch (error) {
    console.error("Error updating password:", error);
    throw error; // Rethrow error for proper handling in calling function
  }
};
export const deleteUser = async (userId) => {
  try {
    await axios.delete(`${API_URL}/${route}/${userId}`);
  } catch (error) {
    console.error("Error deleting user:", error);
  }
}
export const  updateUser= async (email,password)=>{
  try{
    await axios.put(`${API_URL}/${route}/${email}`,password)
  }catch(error){
    console.error({message:"an error occured"},error)
  }


}