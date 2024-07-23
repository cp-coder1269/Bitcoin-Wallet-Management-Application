# React Cypherock web App

## Getting Started

### Prerequisites

- Ensure you have Node.js installed.
- Obtain an API token from Blockcypher at [Blockcypher](https://www.blockcypher.com/).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/cp-coder1269/cypherock-web.git
   cd cypherock-web
   ```

2. Install all dependencies:
   ```bash
   npm install
   ```

### Running the Application

1. Start the development server:
   ```bash
   npm start
   ```

## Usage

### Generating an API Token and Creating an HD Wallet

1. Visit [Blockcypher](https://www.blockcypher.com/) and generate an API token.
2. Create a Hierarchical Deterministic (HD) wallet using the token.

### Using the App

1. **Import Wallet**:
   - Click on the "Import Wallet" button.
   - Submit the necessary information to add the wallet. The wallet will be displayed in the wallet table with balance.

2. **View Wallets**:
   - The wallets will be displayed in the wallet table with balance.
   - Press refresh icon to reload the balance.
   - Press delete icon to delete a wallet.

3. **View Transactions**:
   - The transaction table will display transactions corresponding to each address of all wallets.
   - Transactions are fetched in the background to enhance user experience without blocking the UI.

### Features

- **Wallet Table**: Displays all imported wallets.
- **Transaction Table**: Displays transactions for each wallet address.
- **Background Syncing**: Improves user experience by syncing data in the background without blocking the UI.
