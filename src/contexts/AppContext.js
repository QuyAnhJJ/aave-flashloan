import React, { Component, createContext } from 'react'

import web3 from '../data/Web3Connection'
import firebaseAuth from '../firebase/FirebaseAuth'
import firebaseDB from '../firebase/FirebaseDB'

import { useCollectionData } from 'react-firebase-hooks/firestore'


export const AppContext = createContext()

class AppContextProvider extends Component {
    state = {
        newBlocksSub: null,
        FLEventSubs: null,
        latestBlockNum: null,
        connectedToMainnet: false,
        FLs: [],
        filteredFLs: [],
        pageChosenFLs: [],
        expandSearch: false,
        // pagination
        currentPage: 1,
        itemsPerPage: 10,
    }

    async componentDidMount() {
        // log in to save data on Firebase
        // email: data@data.com
        // password: d@t@123
        await firebaseAuth.login("data@data.com", "d@t@123")

        // FIREBASE DATA - V1
        // const newFLs = await firebaseDB.getAllFlashLoans()
        // this.setState({
        //     FLs: await this.convertFirebaseFLs(newFLs),
        // })

        // FIREBASE - STREAM CONNECTION MODE - V2
        // await firebaseDB.subToNewFlashLoans(async (newFL)=>{
        //     const newConvertedFL = await this.convertFirebaseFLs([newFL])
        //     if(newConvertedFL && newConvertedFL.length > 0){
        //         this.setState({
        //             FLs: [newConvertedFL[0], ...this.state.FLs],
        //         })
        //     }
        // })

        // FIREBASE - V3 - Hooks in HOC
        if (this.props.flashLoansData) {
            this.setState({
                FLs: await this.convertFirebaseFLs(this.props.flashLoansData)
            })
        }


        // WEB3 LISTENERS
        // Set up newBlockListener
        // const sub = web3.subscribeToNewBlocks((err, res) => {
        //     if (err) return
        //     this.setState({
        //         connectedToMainnet: true,
        //         latestBlockNum: res.number
        //     })
        // })
        // // Set up FL event listeners
        // const eventSubs = web3.subscribeToFLLogs()
        // // Save subs to state for unsubbing later
        // this.setState({
        //     newBlocksSub: sub,
        //     FLEventSubs: eventSubs
        // })
    }

    async componentDidUpdate(prevProps, prevState) {
        // IF BLOCK NUM HAS CHANGED
        if (prevState.latestBlockNum != this.state.latestBlockNum) {
            if (web3.flashLoans.length === 0) return

            const latestFLs = web3.flashLoans.filter((v, i, a) => a.findIndex(t => (t.tx.hash === v.tx.hash)) === i)

            let newFLs = []

            for (let i = 0; i < latestFLs.length; i++) {
                let tempFL = latestFLs[i];
                tempFL = await web3.formatFLData(tempFL)

                // Store FL in Firebase --------
                if (["0xab9c4b5d"].includes(tempFL.tx.input.substring(0, 10))) {
                    // this.storeFLInFirebase(tempFL)
                    // console.log("FL STORING DISABLED - WOULD HAVE SAVED TO DB HERE");
                }
                // -----------------------------

                newFLs.push(tempFL)
            }

            web3.clearFLs()

            this.setState({
                FLs: [...newFLs, ...this.state.FLs]
            })
        }
        // IF NEW DATA RECIEVED FROM FIREBASE SUBSCRIPTION
        else if (prevProps.flashLoansData != this.props.flashLoansData) {
            this.setState({
                FLs: await this.convertFirebaseFLs(this.props.flashLoansData)
            })
        }
    }

    killNewBlocksSub = () => {
        console.log("Unsubscribing from new blocks...");
        web3.unsubscribeFromSub(this.state.newBlocksSub)
        this.setState({
            newBlocksSub: null
        })
    }

    setSelectedFL = (FL) => {
        this.setState({
            selectedFL: FL
        })
    }

    storeFLInFirebase = async (FL) => {
        console.log("Saving FL in tx", FL.tx.hash, "in Firebase...");
        const res = await firebaseDB.storeFlashLoan(FL)
        console.log("FL Saved.");
    }

    runSearchRequest = async (address) => {
        console.log("Running search from Context:", address);
        const res = await firebaseDB.searchFLsByInteractionAddress(address)
        this.setState({
            filteredFLs: await this.convertFirebaseFLs(res),
            expandSearch: true,
        })
    }

    clearSearchFilterResults = () => {
        this.setState({
            filteredFLs: [],
            expandSearch: false,
        })
    }

    setItemsPerPage = (numItems) => {
        if (numItems < 1 || numItems > 100) return null

        this.setState({
            itemsPerPage: numItems
        })
    }

    nextPage = () => {

    }

    prevPage = () => {

    }

    convertFirebaseFLs = async (firebaseFLs) => {
        // firebaseFLs - still stringified
        if (!firebaseFLs || firebaseFLs.length === 0) {
            console.log("ERROR: firebaseFLs passed into convertFirebaseFLs is not valid");
            return []
        }

        console.log("Running convertFirebaseFL...");

        let processedFLs = []

        for (let i = 0; i < firebaseFLs.length; i++) {
            const fl = firebaseFLs[i];

            fl.decodedTX = JSON.parse(fl.decodedTX)
            fl.logs = JSON.parse(fl.logs)
            fl.tx = JSON.parse(fl.tx)
            fl.borrowData = JSON.parse(fl.borrowData)

            const tempFL = await web3.formatFLData(fl)
            processedFLs.push(tempFL)
        }

        // sort FLs with latest at top
        processedFLs = processedFLs.sort((a, b) => (a.date > b.date) ? -1 : 1)
        console.log("PROCESSED FLs", processedFLs);

        return processedFLs
    }

    render() {
        return (
            <AppContext.Provider value={{
                ...this.state,
                storeFLInFirebase: this.storeFLInFirebase,
                setSelectedFL: this.setSelectedFL,
                killNewBlocksSub: this.killNewBlocksSub,
                runSearchRequest: this.runSearchRequest,
                clearSearchFilterResults: this.clearSearchFilterResults,
            }}>
                { this.props.children}
            </AppContext.Provider >
        )
    }
}


export const AppContextWithFirestore = (props) => {
    const flashLoansRef = firebaseAuth.db.collection('flashLoans')
    const flashLoansQuery = flashLoansRef.orderBy('dateCreated', 'desc').limit(20)

    const [flashLoansData] = useCollectionData(flashLoansQuery)
    // const [filteredData] = useCollectionData(query)

    return <AppContextProvider
        flashLoansData={flashLoansData}
        {...props}
    />

}