import React, { useState } from "react";

let Search = (props) => {
    let [filterVal, setFilterVal] = useState("Name")
    let [searchVal, setSearchVal] = useState("")

    let filterHandler = (e) => {
        setFilterVal(e.target.value)
    }
    let submitHandler = (e) => {
        //props.parentMethod
        e.preventDefault()
        props.parentMethod(e, filterVal, searchVal)
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <div className="input-group mt-3 mb-3 pl-4 pr-4">
                    <div className="input-group-prepend">
                        <select className="btn btn-outline-secondary dropdown-toggle" value={filterVal} type="button" onChange={filterHandler}>
                            <option className="dropdown-item">Name</option>
                            <option className="dropdown-item">District</option>
                            <option className="dropdown-item">EID</option>
                        </select>
                    </div>
                    <input type="text" className="form-control" value={searchVal} onChange={(e) => {
                        setSearchVal(e.target.value)
                    }} required />
                    <div className="input-group-append">
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Search;