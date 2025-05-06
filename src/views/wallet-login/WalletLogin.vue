<template>
  <div class="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
    <div class="max-w-md w-full bg-gray-800 rounded-xl shadow-xl overflow-hidden">
      <div class="p-8">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold mb-2">NFT Marketplace</h1>
          <p class="text-gray-400">Connect your wallet to continue</p>
        </div>

        <div v-if="!isConnected" class="space-y-4">
          <button
              @click="connectWallet('metamask')"
              class="w-full flex items-center justify-between p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          >
            <div class="flex items-center">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJZaVpfhv3kgZA46GoqfVNIFhR6pXIdX4_Rg&s" alt="MetaMask" class="w-8 h-8 mr-3" />
              <span class="font-medium">MetaMask</span>
            </div>
            <ArrowRight class="h-5 w-5 text-gray-400" />
          </button>

          <button
              @click="connectWallet('walletconnect')"
              class="w-full flex items-center justify-between p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          >
            <div class="flex items-center">
              <img src="https://raw.githubusercontent.com/WalletConnect/walletconnect-assets/master/Icon/Blue%20(Default)/Icon.svg" alt="WalletConnect" class="w-8 h-8 mr-3" />
              <span class="font-medium">WalletConnect</span>
            </div>
            <ArrowRight class="h-5 w-5 text-gray-400" />
          </button>

          <button
              @click="connectWallet('coinbase')"
              class="w-full flex items-center justify-between p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          >
            <div class="flex items-center">
              <img src="https://altcoinsbox.com/wp-content/uploads/2022/12/coinbase-logo.jpg" alt="Coinbase Wallet" class="w-8 h-8 mr-3" />
              <span class="font-medium">Coinbase Wallet</span>
            </div>
            <ArrowRight class="h-5 w-5 text-gray-400" />
          </button>
        </div>

        <div v-else class="text-center">
          <div class="mb-6 bg-gray-700 rounded-lg p-4 break-all">
            <p class="text-sm text-gray-400 mb-1">Connected Wallet</p>
            <p class="font-mono">{{ shortenAddress(account) }}</p>
          </div>

          <div class="flex justify-center">
            <button
                @click="disconnectWallet"
                class="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            >
              Disconnect Wallet
            </button>
            <button
                @click="proceedToMarketplace"
                class="ml-4 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
            >
              Enter Marketplace
            </button>
          </div>
        </div>

        <div v-if="error" class="mt-6 p-4 bg-red-900/50 border border-red-700 rounded-lg text-center">
          <p class="text-red-300">{{ error }}</p>
        </div>

        <div class="mt-8 text-center text-gray-500 text-sm">
          <p>By connecting your wallet, you agree to our</p>
          <p class="mt-1">
            <a href="#" class="text-purple-400 hover:text-purple-300">Terms of Service</a> and
            <a href="#" class="text-purple-400 hover:text-purple-300">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ethers } from 'ethers';
import { ArrowRight } from 'lucide-vue-next';

const isConnected = ref(false);
const account = ref('');
const error = ref('');
const provider = ref(null);

onMounted(() => {
  // Check if user was previously connected
  checkConnection();
});

async function checkConnection() {
  try {
    // Check if MetaMask is installed
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        account.value = accounts[0];
        isConnected.value = true;
      }
    }
  } catch (err) {
    console.error('Error checking connection:', err);
  }
}

async function connectWallet(walletType) {
  error.value = '';

  try {
    if (walletType === 'metamask') {
      if (!window.ethereum) {
        error.value = 'MetaMask is not installed. Please install MetaMask to continue.';
        return;
      }

      provider.value = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      account.value = accounts[0];
      isConnected.value = true;

      // Listen for account changes
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          account.value = accounts[0];
        }
      });
    }
    else if (walletType === 'walletconnect' || walletType === 'coinbase') {
      // In a real implementation, you would use the WalletConnect or Coinbase SDK
      error.value = `${walletType === 'walletconnect' ? 'WalletConnect' : 'Coinbase Wallet'} integration requires additional setup.`;
    }
  } catch (err) {
    console.error('Error connecting wallet:', err);
    error.value = err.message || 'Failed to connect wallet. Please try again.';
  }
}

function disconnectWallet() {
  isConnected.value = false;
  account.value = '';
  provider.value = null;
  // Note: There's no standard way to disconnect in MetaMask, this just clears our state
}

function proceedToMarketplace() {
  // Navigate to the marketplace page
  // In a real app, you would use Vue Router
  alert('Navigating to marketplace...');
}

function shortenAddress(address) {
  if (!address) return '';
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}
</script>