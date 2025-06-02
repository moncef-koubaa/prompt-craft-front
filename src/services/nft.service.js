import { apolloClient } from "./API/apollo-client";
import GetNft from "@/graphql/nft.graphql";
import GetNfts from "@/graphql/getNFTs.graphql";
export default class NftService {
  static async getNft(id) {
    try {
        console.log("Fetching NFT with ID:", id);
        
      const response = await apolloClient.query({
        query: GetNft,
        variables: { id },
      });
      console.log("hello");
      
      console.log("NFT fetched successfully:", response.data.getNft);
      
      return response.data.getNft;
    } catch (error) {
      console.error("Error fetching NFT:", error);
      throw error;
    }
  }
  static async getNFTs(filter = {}) {
    try {
      const response = await apolloClient.query({
        query: GetNfts,
        variables: {
          filter: {
            ...filter,
          },
        },
      });
      return response;
    } catch (error) {
      console.error("Error fetching NFTs:", error);
      throw error;
    }
  }
}
