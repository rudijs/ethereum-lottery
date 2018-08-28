if (!process.env.ETH_MNEMONIC)
  throw new Error("ETH_MNEMONIC env var required!");

const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");

const provider = new HDWalletProvider(
  process.env.ETH_MNEMONIC,
  "https://rinkeby.infura.io/v3/262566e4ad7149cb9e579b64b473fa96"
);
console.log(provider)

const web3 = new Web3(provider);

const deploy = async () => {
  try {
    const accounts = await web3.eth.getAccounts();
    console.log("Attemping to deploy from account", accounts[0]);
    const result = await new web3.eth.Contract(JSON.parse(interface))
    //   .deploy({ data: bytecode, arguments: ["Hi there!"] })
      .deploy({ data: '0x' + bytecode, arguments: ['Hi there!'] })
      .send({ from: accounts[0], gas: "1000000" });
    console.log("Contract deployed to", result.options.address);
  } catch (e) {
    console.log("Something blew up!", e);
  }
};

deploy();
