import axios from "axios";

const API_URL = "http://localhost:5000/api"; //  backend URL

const orders="orders"

export const getOrders = async ({email, filename}) => {
  try {
    if (email){
      const response = await axios.get(`${API_URL}/${orders}/${email}`);
      console.log(response)
      return response.data;
    }

    if (filename){
      const response_2=await axios.get(`${API_URL}/fileupload/download/${filename}`)
      return response_2.data
    
    }
    
    
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
};


export const createOrder = async ({ formData, orderData }) => {
  try {
    console.log("Order Data:", orderData);

    // Check if formData contains a file before uploading
    if (formData) {
        const response_1=await axios.post(`${API_URL}/fileupload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });console.log("file data:",response_1.data)
    }

    // Send the order even if no file is uploaded
    if (orderData && Object.keys(orderData).length > 0) {
      const response = await axios.post(`${API_URL}/orders`, orderData);
      console.log("Order Response:", response.data);
    } else {
      console.warn("No order data provided.");
    }
  } catch (error) {
    console.error("Error creating order:", error);
  }
};
export const downloadFile=async (fileName)=>{
  try{
    const response_2=await axios.get(`${API_URL}/fileupload/download/${fileName}`)
    return response_2.data
  }catch(err){
    console.error({err})
  }
}


export const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await axios.put(`${API_URL}/${orders}/${orderId}`, { status });
    return response.data;
  } catch (error) {
    console.error("Error updating order:", error);
  }
};

export const deleteOrder = async (orderId) => {
  try {
    await axios.delete(`${API_URL}/${orders}/${orderId}`);
  } catch (error) {
    console.error("Error deleting order:", error);
  }
};
