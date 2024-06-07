import React, { useState, useContext, useRef } from 'react'
import { AppContext } from '../contexts/AppContext'
import firebaseDB from '../firebase/FirebaseDB'
import web3 from '../data/Web3Connection'

export const FlashLoanStream = () => {

    const { storeFLInFirebase } = useContext(AppContext)

    const createFakeFL = async () => {
        const rand4Digs = Math.floor(1000 + Math.random() * 9000)

        let tempFL = {
            block: 11815337,
            borrowData: [
                {
                    asset: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
                    ticker: "USDC",
                    tokenValue: 1,
                    tokensBorrowed: 6477.145,
                    valueBorrowed: 6477.145
                }
            ],
            date: new Date(),
            decodedTX: {
                args: [
                    "0xbcC4371cc40592794bF5b727C17cf7DE37Ac180A",
                    ["0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"],
                    ["0x0182116439"],
                    ["0x02"]
                ]
            },
            from: "0xDf0aA860fb3aE87b29e1a3ac9b0D119b8180c685",
            interactions: [
                "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
                "0x3dfd23A6c5E8BbcFc9581d2E864a68feb6a076d3",
                "0x398eC7346DcD622eDc5ae82352F02bE94C62d119",
                "0x69948cC03f478B95283F7dbf1CE764d0fc7EC54C",
                "0x408e41876cCCDC0F92210600ef50372656052a38",
                "0xCC12AbE4ff81c9378D670De1b57F8e0Dd228D77a",
                "0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9",
                "0xFC4B8ED459e00e5400be803A9BB3954234FD50e3",
                "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
                "0x9ff58f4fFB29fA2266Ab25e75e2A8b3503311656",
                "0xBcca60bB61934080951369a648Fb03DF4F96263C",
                "0x619beb58998eD2278e08620f97007e1116D5D25b"
            ],
            logs: [
                { address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48" },
                { address: "0x3dfd23A6c5E8BbcFc9581d2E864a68feb6a076d3" },
                { address: "0x398eC7346DcD622eDc5ae82352F02bE94C62d119" },
                { address: "0x69948cC03f478B95283F7dbf1CE764d0fc7EC54C" },
                { address: "0x408e41876cCCDC0F92210600ef50372656052a38" },
                { address: "0xCC12AbE4ff81c9378D670De1b57F8e0Dd228D77a" },
                { address: "0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9" },
                { address: "0x619beb58998eD2278e08620f97007e1116D5D25b" }
            ],
            tx: {
                blockHash: "0xadc0ecee2e24360e0921d4230d8df9e85c40f230367bc57b9b6ca72a9b491e71",
                blockNumber: 11815337,
                from: "0xDf0aA860fb3aE87b29e1a3ac9b0D119b8180c685",
                gas: 2972817,
                gasPrice: "95000000000",
                hash: "0x9AB"+rand4Digs+"5092c3b76d5b65c673bb8a1ac1d2d0de5381dc0bd3bb80cae10025da4",
                input: "0xab9c4b5d000000000000000000000000bcc4371cc40592794bf5b727c17cf7de37ac180a00000000000000000000000000000000000000000000000000000000000000e000000000000000000000000000000000000000000000000000000000000001200000000000000000000000000000000000000000000000000000000000000160000000000000000000000000df0aa860fb3ae87b29e1a3ac9b0d119b8180c68500000000000000000000000000000000000000000000000000000000000001a000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb4800000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000182116439000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000000200000000000000000000000069948cc03f478b95283f7dbf1ce764d0fc7ec54c000000000000000000000000fc4b8ed459e00e5400be803a9bb3954234fd50e300000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000007b6abbba183090b8f8000000000000000000000000000000000000000000000000000000000027c2292"
            },
            txHash: "0x9AB"+rand4Digs+"5092c3b76d5b65c673bb8a1ac1d2d0de5381dc0bd3bb80cae10025da5",
            version: 2
        }
        tempFL = await web3.formatFLData(tempFL)
        storeFLInFirebase(tempFL)
    }

    return (
        <div>
            <button onClick={createFakeFL}>Create FL</button>
        </div>
    )
}
