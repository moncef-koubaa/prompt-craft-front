import { apolloClient } from "./API/apollo-client";
import apiClientAuth from "./API/authenticated";
import GetAuctions from "@/graphql/auction.graphql";


  
export default class AuctionService {
    static async getAuctions(filter = {}) {
        try{
            const response = await apolloClient.query({
                query: GetAuctions,
                variables: {
                  filter: {
                    ...filter
                  },
                },
              })
              return response
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

    static async createAuction(auctionData) {
        try {
            const response = await apiClientAuth.post('/auctions', auctionData);
            return response.data;
        } catch (error) {
            console.error("Error creating auction:", error);
            throw error;
        }
    }
}