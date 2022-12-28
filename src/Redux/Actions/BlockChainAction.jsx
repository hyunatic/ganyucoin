import user from "./user.json";

const { Blockchain, Transaction, Block } = require("./DBSCoin");
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");
const DBSCoin = new Blockchain();

//Start Exmaple Block Chain
const myKey = ec.keyFromPrivate(
  "ceeedf546d732af1256b017c17bd6b93323a11b840f922f48c222659379b2b37"
);
const myWalletAddress = myKey.getPublic("hex");
const myKey1 = ec.keyFromPrivate(
  "67e76c6fe32e7fa8e214bf48ed96c65c0e33a97906efa9ecce28670a32407467"
);
const myWalletAddress1 = myKey1.getPublic("hex");
DBSCoin.minePendingTransactions(myWalletAddress);
DBSCoin.minePendingTransactions(myWalletAddress1);

export const getChain = () => (dispatch) => {
  dispatch({ type: "START_CHAIN", payload: DBSCoin.chain });
};

export const validBlockChain = () => (dispatch) => {
  dispatch({ type: "CHECK_CHAIN", payload: DBSCoin.isChainValid() });
};

// Not Used
export const mineCoin = (username) => (dispatch) => {
  for (var i = 0; i < user.length; i++) {
    if (username === user[i].username) {
      const key = ec.keyFromPrivate(user[i].privatekey);
      const walletAddress = key.getPublic("hex");
      DBSCoin.minePendingTransactions(walletAddress);
    }
  }

  dispatch({ type: "GET_NEW_CHAIN", payload: DBSCoin.getLatestBlock() });
};

export const GetBalance = (username) => (dispatch) => {
  for (var i = 0; i < user.length; i++) {
    if (username === user[i].username) {
      const key = ec.keyFromPrivate(user[i].privatekey);
      const walletAddress = key.getPublic("hex");
      dispatch({
        type: "GET_BALANCE",
        payload: DBSCoin.getBalanceOfAddress(walletAddress),
      });
    }
  }
};

export const transferTransaction = (formData) => (dispatch) => {
  let senderkey,
    senderwalletAddress,
    receiverkey,
    receiverwalletAddress = "";

  for (var i = 0; i < user.length; i++) {
    if (formData.sender === user[i].username) {
      senderkey = ec.keyFromPrivate(user[i].privatekey);
      senderwalletAddress = senderkey.getPublic("hex");
    }
    if (formData.receiver === user[i].username) {
      receiverkey = ec.keyFromPublic(user[i].publickey, "hex");
      receiverwalletAddress = receiverkey.getPublic("hex");
    }
  }
  const tx1 = new Transaction(
    senderwalletAddress,
    receiverwalletAddress,
    formData.amount
  );
  tx1.signTransaction(senderkey);
  DBSCoin.addTransaction(tx1);
};

export const TamperBlock = (formData) => (dispatch) => {
  for (var i = 0; i < DBSCoin.chain.length; i++) {
    if (formData.hash === DBSCoin.chain[i].hash) {
      DBSCoin.chain[i].transactions[0].amount = formData.amount;
    }
  }
};
