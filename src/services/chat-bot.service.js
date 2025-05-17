import apiClientUnAuth from "./API/not-authenticated";
export default class ChatBotService  {
    static async getChatBotResponse(message) {
        console.log("Chatbot message:", message);
        try {
            const response = await apiClientUnAuth.post("/ai/image-url", {
                prompt: message,
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching chatbot response:", error);
            throw error;
        }
    }

}