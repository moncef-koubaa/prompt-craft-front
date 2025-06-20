import { apolloClient } from './API/apollo-client';
import apiClientAuth from './API/authenticated';
import GetAuctions from '@/graphql/auction.graphql';
import getAuction from '@/graphql/auctionById.graphql';

export default class AuctionService {
  static async getAuctions(filter = {}) {
    console.log('Fetching auctions with filter:', filter);

    try {
      const response = await apolloClient.query({
        query: GetAuctions,
        variables: {
          filter: {
            ...filter,
          },
        },
      });
      return response;
    } catch (error) {
      console.error('Error fetching auctions:', error);
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
      console.error('Error fetching auction by ID:', error);
      throw error;
    }
  }
  static async getAuctionById(id) {
    console.log('Fetching auction by ID:', id);
    if (!id) {
      throw new Error('Auction ID is required');
    }
    try {
      const response = await apolloClient.query({
        query: getAuction,
        variables: {
          id: id.toString(),
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching auction by ID:', error);
      throw error;
    }
  }

  static async createAuction(auctionData) {
    try {
      const response = await apiClientAuth.post('/auctions', auctionData);
      return response.data;
    } catch (error) {
      console.error('Error creating auction:', error);
      throw error;
    }
  }
}
