import React, { useEffect } from "react";

import { getCoinIconURL } from "../images/CoinIcons";
import { getIconByAddress, svgs } from "../images/InteractionIcons";
import { getTokenData } from "../data/TokenData";
import {
    formatBlockNum,
    shortenHash,
    getCardDate,
    getCardTime,
    currencyFormat,
} from "../utils/utils";

export const FlashLoanListItem = (props) => {
    const { data } = props;

    useEffect(() => {
        const thisFL = document.getElementById(data.txHash);

        setTimeout(() => {
            thisFL.classList.remove("NewFL");
        }, 2100);
    }, [data.txHash]);

    const getIconArray = (tokensData) => {
        const MAX_ICONS_SHOWN = 6;

        // Reducing array to not show duplicate images (no duplicate tickers)
        tokensData = tokensData.filter(
            (v, i, a) => a.findIndex((t) => t.asset === v.asset) === i
        );

        if (!tokensData || tokensData.length == 0)
            return <img className="CoinIcon" src={getCoinIconURL("???")} />;

        let icons = tokensData.map((i) => {
            let srcImg = null;

            if (svgs.hasOwnProperty(i.ticker)) {
                srcImg = svgs[i.ticker];
            } else {
                srcImg = getCoinIconURL(i.ticker);
            }

            return (
                <a
                    key={i.asset}
                    href={"https://etherscan.io/address/" + i.asset}
                >
                    <img className="CoinIcon" src={srcImg} />
                </a>
            );
        });

        if (tokensData.length > MAX_ICONS_SHOWN) {
            let circle = (
                <div
                    key={"extraInteractions"}
                    className="CoinIcon additionalInteractionsIcon"
                >
                    <p className="CoinIconText">
                        {"+" +
                            Math.min(tokensData.length - MAX_ICONS_SHOWN, 99)}
                    </p>
                </div>
            );

            return [...icons.slice(0, MAX_ICONS_SHOWN), circle];
        } else {
            return icons;
        }
    };

    const calcTotalBorrowed = (borrowData) => {
        if (!borrowData || borrowData.length === 0) return 0;
        let acc = 0;
        for (let i = 0; i < borrowData.length; i++) {
            const token = borrowData[i];
            acc += token.valueBorrowed ? token.valueBorrowed : 0;
        }
        return acc;
    };

    return (
        <div
            className="FlashLoanListItem NewFL CardGrid"
            id={data.txHash}
            onClick={() => {
                window.open("https://etherscan.io/tx/" + data.txHash, "_blank");
            }}
        >
            <div className="FLCardSubcontainer FLCardSubcontainer1">
                <p className="FLCardTextLeft">{getCardTime(data.date)}</p>
                <p className="FLCardTextLeft">{getCardDate(data.date)}</p>
            </div>

            <div className="FLCardSubcontainer FLCardSubcontainer2">
                <div className="FLLoanAmountContainer">
                    <h2 className="FLDollarText FLCardTextLeft">
                        {currencyFormat(
                            calcTotalBorrowed(data.borrowData),
                            "USD"
                        )}
                    </h2>
                </div>
                <div className="FLBorrowedTokensContainer">
                    <p className="FLCardTextLeft">
                        {" "}
                        in {getIconArray(data.borrowData)}{" "}
                    </p>
                </div>
            </div>

            <div className="FLCardSubcontainer FLCardSubcontainer3">
                <div className="FLFromAddrContainer">
                    <p className="FLCardTextLeft">
                        From:{" "}
                        <a href={"https://etherscan.io/address/" + data.from}>
                            {" "}
                            {shortenHash(data.from)}{" "}
                        </a>
                    </p>
                </div>
                <div className="InteractionsContainer">
                    {getIconArray(
                        data.interactions.map((addr) => {
                            if (getIconByAddress(addr) !== "???") {
                                return {
                                    asset: addr,
                                    ticker: getIconByAddress(addr),
                                };
                            } else {
                                return {
                                    asset: addr,
                                    ticker: getTokenData(addr).ticker,
                                };
                            }
                        })
                    )}
                </div>
            </div>

            <div className="FLCardSubcontainer FLCardSubcontainer4">
                <div className="FLTxContainer">
                    <p className="FLCardTextLeft">
                        TX:{" "}
                        <a href={"https://etherscan.io/tx/" + data.txHash}>
                            {shortenHash(data.txHash)}
                        </a>
                    </p>
                </div>
                <div className="FLBlockContainer">
                    <p className="FLCardTextLeft">
                        Block:{" "}
                        <a href={"https://etherscan.io/block/" + data.block}>
                            {formatBlockNum(data.block)}
                        </a>
                    </p>
                </div>
            </div>

            {/* Removing until v1 also supported */}
            {/* <div className='FlashLoanViewButton'>
                <Button type="primary" shape="circle"
                    onClick={() => {
                        window.open('https://etherscan.io/address/0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9', '_blank')
                    }}
                >
                    <p className='VersionTag'>V2</p>
                </Button>
            </div> */}
        </div>
    );
};
