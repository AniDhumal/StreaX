require('@nomiclabs/hardhat-truffle5');
const { ethers, contract } = require('hardhat')
const { assert } = require('chai');
const truffleAssert = require('truffle-assertions');
const StreaXToken=artifacts.require("StreaXToken.sol");

contract ("StreaXToken",(accounts)=>{
    let [alice,bob]=accounts;
    let contractInstance;
    beforeEach(async () => {
        contractInstance = await StreaXToken.new("StreaX","SRX",{from:alice});
    });
    describe("Smart contract test suite",()=>{
        it("constructor intializes all state vars",async()=>{
            await contractInstance.name();
            await contractInstance.symbol();
            await contractInstance.decimals();
            await contractInstance.totalSupply();
            await contractInstance.owner();
        });
        it("function getBalance() returns balance of an account",async()=>{
            await contractInstance.mint(bob,1000,{from: alice})
            var result=await contractInstance.getBalance(bob);
            assert.equal(result,1000);
        });
        it("function getTotalSupply() must return apt value of total supply",async()=>{
            console.log("Initally ",await contractInstance.getBalance(bob));
            await contractInstance.mint(bob,1000,{from: alice})
            console.log("Finally " ,await contractInstance.getBalance(bob));
            await contractInstance.mint(alice,1000,{from: alice})
            var result=await contractInstance.getTotalSupply();
            assert.equal(result,2000);
        });

        it("function mint adds new tokens to the account specified",async()=>{
            await contractInstance.mint(bob,1000,{from: alice})
            assert.equal(await contractInstance.balances(bob),1000)
            var result=await contractInstance.mint(alice,5000,{from: alice})
            assert.equal(await contractInstance.balances(alice),5000)        
            await truffleAssert.eventEmitted(result.receipt, "Mint")
        })
        it("only owner allowed to call mint function. reverts otherwise",async()=>{
            await truffleAssert.reverts(contractInstance.mint(bob,1000,{from: bob}))
        })

        it("transfer() function should transfer tokens from one account to another",async()=>{
            await contractInstance.mint(alice,1000,{from:alice});
            var result=await contractInstance.transfer(bob,alice,300,{from:alice});
            var result1=await contractInstance.getBalance(alice);
            var result2 = await contractInstance.getBalance(bob);
            truffleAssert.eventEmitted(result.receipt, "Transfer");
            assert.equal(result1,700);
            assert.equal(result2,300);
        })
        it("transfer() function should revert if the amount exceeds balance",async()=>{
            await contractInstance.mint(alice,1000,{from:alice});
            await truffleAssert.reverts(contractInstance.transfer(bob,alice,3000,{from:alice}));
        })
        it("transfer() function should revert if the msg.sender is not _from",async()=>{
            await contractInstance.mint(alice,1000,{from:alice});
            await truffleAssert.reverts(contractInstance.transfer(bob,alice,400,{from:bob}));
        })
    })
});