import apiClientAuth from './API/authenticated';
import { io } from 'socket.io-client';

export default class BidsService {
  // Initialize Socket.IO connection
  static async connectToRoom(auctionId, token) {
    if (this.socket) {
      this.disconnect();
    }

    this.socket = io(process.env.VUE_APP_WS_URL, {
      auth: { token },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    this.socket.on('exception', (error) => {
      console.error('WebSocket error:', error);
      this.callbacks.exception.forEach((cb) => cb(error));
    });

    // Setup event listeners
    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server');
      this.socket.emit('joinAuction', auctionId);
    });

    this.socket.on('newBid', (bid) => {
      console.log('New bid received:', bid);
      this.callbacks.newBid.forEach((cb) => cb(bid));
    });

    this.socket.on('auctionEnded', (data) => {
      this.callbacks.auctionEnded.forEach((cb) => cb(data));
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });
  }

  // Disconnect from current room
  static disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  // Register callback for events
  static on(event, callback) {
    if (this.callbacks[event]) {
      this.callbacks[event].push(callback);
    }
  }

  // Remove callback
  static off(event, callback) {
    if (this.callbacks[event]) {
      this.callbacks[event] = this.callbacks[event].filter(
        (cb) => cb !== callback
      );
    }
  }

  // HTTP API Methods
  static async joinAuction(auctionId) {
    console.log(`Joining auction ${auctionId}`);
    return apiClientAuth.post(`/auctions/join/${auctionId}`);
  }

  static async getBidHistory(auctionId) {
    return apiClientAuth.get(`/auctions/${auctionId}/bids`);
  }

  static async getAuctionDetails(auctionId) {
    return apiClientAuth.get(`/auctions/${auctionId}`);
  }

  static async isParticipant(auctionId) {
    return apiClientAuth.get(`/auctions/${auctionId}/participant`);
  }
}
BidsService.socket = null;
BidsService.callbacks = {
  newBid: [],
  auctionEnded: [],
  error: [],
  exception: [],
};
