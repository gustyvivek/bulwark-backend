Web3 = require('web3')
fs = require("fs")

web3 = new Web3("http://localhost:8545")
web3.eth.getAccounts(console.log).then((f)=>{account=f[0]});

bytecode = fs.readFileSync(__dirname+"/contracts/Insurance_sol_CarInsurance.bin").toString()
abi = JSON.parse(fs.readFileSync(__dirname+"/contracts/Insurance_sol_CarInsurance.abi").toString())

deployedContract = new web3.eth.Contract(abi)

//Replace the address in from with one of your address...
//The chain owner will be that address.
deployedContract.deploy({
  data: bytecode
}).send({
  from: '0xF7aA0ceD9017bd9242764342661F88D946f4D979',
  gas: 1500000,
  gasPrice: web3.utils.toWei('0.00003', 'ether')
}).then((newContractInstance) => {
  deployedContract.options.address = newContractInstance.options.address
  console.log(newContractInstance.options.address);
});

