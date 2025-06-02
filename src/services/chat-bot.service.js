import apiClientAuth from "./API/authenticated";
import apiNotifClient from "@/services/API/notif-client";
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
        const createNftResponse = await apiClientAuth.post("/nft", data);
        const subscribeResponse = await apiNotifClient.post('/sse/subscribe', {
            nftId: createNftResponse.data.id,
            events: 'auctionStarted,auctionEnded,sold,newBid',
        });
        const response =  subscribeResponse.data+ createNftResponse.data;
        return response.data;    
    }

}