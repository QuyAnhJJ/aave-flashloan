import UNI_POOL_USDC from './uni-pool-images/uniswap_pool_usdc.svg'
import UNI_POOL_DAI from './uni-pool-images/uniswap_pool_dai.svg'
import UNI_POOL_USDT from './uni-pool-images/uniswap_pool_usdt.svg'
import UNI_POOL_CRV from './uni-pool-images/uniswap_pool_crv.svg'
import UNI_POOL_AAVE from './uni-pool-images/uniswap_pool_aave.svg'
import UNI_POOL_LINK from './uni-pool-images/uniswap_pool_link.svg'
import UNI_POOL_SUSD from './uni-pool-images/uniswap_pool_susd.svg'
import UNI_POOL_WBTC from './uni-pool-images/uniswap_pool_wbtc.svg'
import UNI_POOL_KNC from './uni-pool-images/uniswap_pool_knc.svg'
import UNI_POOL_TUSD from './uni-pool-images/uniswap_pool_tusd.svg'
import UNI_POOL_GUSD from './uni-pool-images/uniswap_pool_gusd.svg'
import UNI_POOL_ETH from './uni-pool-images/uniswap_pool_eth.svg'

import AAVE_LP_2 from './aave-version-images/AAVE_V2_logo.svg'
import AAVE_LP_1 from './aave-version-images/AAVE_V1_logo.svg'

export const svgs = {
    "UNI-POOL-USDC": UNI_POOL_USDC,
    "UNI-POOL-DAI": UNI_POOL_DAI,
    "UNI-POOL-USDT": UNI_POOL_USDT,
    "UNI-POOL-CRV": UNI_POOL_CRV,
    "UNI-POOL-AAVE": UNI_POOL_AAVE,
    "UNI-POOL-LINK":UNI_POOL_LINK,
    "UNI-POOL-SUSD":UNI_POOL_SUSD,
    "UNI-POOL-WBTC":UNI_POOL_WBTC,
    "UNI-POOL-KNC":UNI_POOL_KNC,
    "UNI-POOL-TUSD":UNI_POOL_TUSD,
    "UNI-POOL-GUSD": UNI_POOL_GUSD,
    "UNI-POOL-ETH": UNI_POOL_ETH,

    "AAVE-LP-2": AAVE_LP_2,
    "AAVE-LP-1": AAVE_LP_1,
}

export const getIconByAddress = (address) => {
    const addressIconMap = {
        "0x7FBa4B8Dc5E7616e59622806932DBea72537A56b" : "UNI-POOL-USDC",
        "0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc" : "UNI-POOL-USDC",
        "0x3dA1313aE46132A397D90d95B1424A9A7e3e0fCE" : "UNI-POOL-CRV", 
        "0xDFC14d2Af169B0D36C4EFF567Ada9b2E0CAE044f" : "UNI-POOL-AAVE",
        "0xa2107FA5B38d9bbd2C461D6EDf11B11A50F6b974": "UNI-POOL-LINK",
        "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11": "UNI-POOL-DAI",
        "0x0d4a11d5EEaaC28EC3F61d100daF4d40471f1852": "UNI-POOL-USDT",
        "0x5ac13261c181a9c3938BfE1b649E65D10F98566B": "UNI-POOL-USDT",
        "0xf80758aB42C3B07dA84053Fd88804bCB6BAA4b5c": "UNI-POOL-SUSD",
        "0xd3d2E2692501A5c9Ca623199D38826e513033a17": "UNI-POOL-ETH",
        "0xBb2b8038a1640196FbE3e38816F3e67Cba72D940": "UNI-POOL-WBTC",
        "0xf49C43Ae0fAf37217bDcB00DF478cF793eDd6687": "UNI-POOL-KNC",
        "0xb4d0d9df2738abE81b87b66c80851292492D1404": "UNI-POOL-TUSD",
        "0x61247D8aCa1C485A50728E1336d9b26c8339e701": " UNI-POOL-GUSD",

        "0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9": "AAVE-LP-2",
        "0x398eC7346DcD622eDc5ae82352F02bE94C62d119": "AAVE-LP-1",
        
    }

    return addressIconMap.hasOwnProperty(address) ? addressIconMap[address] : "???"
}
