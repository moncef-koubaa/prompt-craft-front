import apiClientAuth from "./API/authenticated";

export default class AuctionService {
    static async getAuctions() {
        try{
            const response = await apiClientAuth.get("/auctions");
            console.log("Response from getAuctions:", response);
        
            return response.data;
        }
        catch (error) {
            console.error("Error fetching auctions:", error);
            throw error;
        }
    }

    static async getAuctionsByUserId(id) {
        try {
            const response = await apiClientAuth.get(`/auctions/${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.data;
        } catch (error) {
            console.error("Error fetching auction by ID:", error);
            throw error;
        }
    }
}