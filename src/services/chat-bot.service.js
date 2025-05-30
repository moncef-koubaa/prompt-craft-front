import apiClientAuth from "./API/authenticated";
export default class ChatBotService  {
    static async getChatBotResponse(message) {
        console.log("Chatbot message:", message);
        try {
            const response = await apiClientAuth.post("/ai/image-url", {
                prompt: message,
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching chatbot response:", error);
            throw error;
        }
    }

    static async mintImage(data){
        console.log("Minting image with data:", data);
        const response = await apiClientAuth.post("/nft", data);
        return response.data;    
    }

}