let  ethers = require("ethers");
let { uniswap_Factory_address, uniswap_Rounter_address, from_address, to_address } = require ("./Address_List");
let {uniswap_Rounter_ABI,pair_ABI,uniswap_Factory_ABI,ERC_20_ABI} = require ("./ABI");

let provider = new ethers.providers.JsonRpcProvider("https://eth-mainnet.g.alchemy.com/v2/lU2_kD0On7bc7fyV5h6gwgWjbR8ldfcU") // Alchemy Ethereum Mainnet
// https://bsc-dataseed1.binance.org/        ---->          search RPC of BNB mainnet

// console.log("provider=",provider);
let Factory_Instance = new ethers.Contract(uniswap_Factory_address,uniswap_Factory_ABI,provider);
let Router_Instance = new ethers.Contract(uniswap_Rounter_address,uniswap_Rounter_ABI,provider);
let Token0_Instance = new ethers.Contract(from_address,ERC_20_ABI,provider);
let Token1_Instance = new ethers.Contract(to_address,ERC_20_ABI,provider);

let Price_Fetch= async(i)=>  // i WETH convert to DAI
{
    let decimal_1 = await Token0_Instance.decimals(); // meaning meaning ?????
    let decimal_2 = await Token1_Instance.decimals();
    console.log("decimals_places of token0 =",decimal_1,"   token1 =",decimal_2);
    
    let amountIn =ethers.utils.parseUnits(i,decimal_1).toString(); // convert into wei wrt decimal places (18 by default in ERC20)
    console.log("amountIn =",amountIn)
    try
    {
        let getAmountsOut = await Router_Instance.getAmountsOut(amountIn,[from_address,to_address]); // swap
        let human_format = ethers.utils.formatUnits(getAmountsOut[1].toString(),decimal_2) // read smart contract -> found -> real value at index 1
        console.log(i,"WETH =",human_format,"DAI");
    }
    catch(error)
    {
        console.log(error);
    }
    
}
Price_Fetch("19"); // 19 WETH