import web3 from './web3';
import { AbiItem } from 'web3-utils';

const address = '0xcEf0893356Cf6f318451ef2ACb4A5493912A5c7C';
const abi = [
	{
		inputs: [],
		stateMutability: "nonpayable",
		type: "constructor",
		signature: "constructor"
	},
	{
		inputs:[
			{
				internalType: "string",
				name: "_name",
				type: "string"
			}
		],
		name: "enter",
		outputs: [],
		stateMutability: "payable",
		type: "function",
		payable: true,
		signature: "0x9d4ff8ad"
},
{
		inputs: [],
		name: "getBalance",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function",
		constant: true,
		signature: "0x12065fe0"
	},
	{
		inputs: [],
		name: "getPlayers",
		outputs: [
			{
				components: [
					{
						internalType: "string",
						name: "name",
						type: "string"
					},
					{
						internalType: "address payable",
						name: "wallet",
						type: "address"
					}
				],
				internalType: "struct Lottery.Player[]",
				name: "",
				type: "tuple[]"
			}
		],
		stateMutability: "view",
		type: "function",
		constant: true,
		signature: "0x8b5b9ccc"
	},
	{
		inputs: [],
		name: "manager",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function",
		constant: true,
		signature: "0x481c6a75"
	},
	{
		inputs: [],
		name: "pickWinner",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
		signature: "0x5d495aea"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		name: "players",
		outputs: [
			{
				internalType: "string",
				name: "name",
				type: "string"
			},
			{
				internalType: "address payable",
				name: "wallet",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function",
		constant: true,
		signature: "0xf71d96cb"
	}
];

export default new web3.eth.Contract(abi as AbiItem[], address);

