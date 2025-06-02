import { apolloClient } from './API/apollo-client';
import apiClientAuth from './API/authenticated';
import apiNotifClient from './API/notif-client';
import GetNft from '@/graphql/nft.graphql';
import GetNfts from "@/graphql/getNFTs.graphql";
export default class NftService {
  static async getNft(id) {
    try {
      console.log('Fetching NFT with ID:', id);

      const response = await apolloClient.query({
        query: GetNft,
        variables: { id },
      });
      console.log('NFT fetched successfully:', response.data.getNft);

      return response.data.getNft;
    } catch (error) {
      console.error('Error fetching NFT:', error);
      throw error;
    }
  }

  static async likeNft(id) {
    try {
      const likeResponse = await apiClientAuth.post(`/nft/like/${id}`);
      console.log(likeResponse);
      const subscribeResponse = await apiNotifClient.post('/sse/subscribe/', {
        nftId: id,
        events: 'auctionStarted,auctionEnded,sold',
      });
      console.log(subscribeResponse);
    } catch (error) {
      console.error('Error creating auction:', error);
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
