import React, { useState } from "react";
import SearchBar from "./SearchBar";
import Nav from "./Nav";
import VoterListItem from "./VoterListItem";
import axios from "axios";

let SearchHolder = (props) => {
    const headers = {
        'authorization': `Bearer ${localStorage.getItem("token")}`
    }
    let [loader, setLoader] = useState(false)
    let [getVals, setVals] = useState([])
    let searchData = async (e, filter, val) => {
        if (filter === "Name") {
            try {
                setLoader(true)
                let vals = await axios.get("https://votecommision.herokuapp.com/voter/search/name/" + val, { headers })
                setLoader(false)
                setVals(vals.data.data)
            } catch (err) {
                setLoader(false)
                console.log(err)
            }
        }
        else if (filter === "District") {
            try {
                setLoader(true)
                let vals = await axios.get("https://votecommision.herokuapp.com/voter/search/district/" + val, { headers })
                setLoader(false)
                setVals(vals.data.data)
            } catch (err) {
                setLoader(false)
                console.log(err)
            }
        }
        else if (filter === "EID") {
            try {
                setLoader(true)
                let vals = await axios.get("https://votecommision.herokuapp.com/voter/search/eid/" + val, { headers })
                setLoader(false)
                //console.log(vals.data.data)
                setVals([vals.data.data])
            } catch(err) {
                setLoader(false)
                console.log(err)
            }
        }
    }
    return (
        <div>
            <Nav item="search" />
            <SearchBar parentMethod={searchData} />
            {(loader) ? "Loading....." : <VoterListItem voters={getVals} />}
        </div>
    )
}

export default SearchHolder;
