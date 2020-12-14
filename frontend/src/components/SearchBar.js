import React, { useState, useEffect, useRef } from 'react'
import Select from 'react-select'

const SearchBar = (props) => {
    const [opt, setOpt] = useState();
    const input = useRef();
    const onChangeSearchOpt = (e) => {
        setOpt(e);
    };
    useEffect(() => {
        setOpt(searchOpt[0]);
    }, []);
    const submit = async () => {
        await props.onSubmit(opt.value, input.current.value);
        input.current.value = "";
    };
    const searchOpt = [
        { value: "title", label: "Title" },
        { value: "content", label: "Content" },
        { value: "author", label: "Author" },
        { value: "major", label: "Major" },
        { value: "dream", label: "Dream" }
    ];
    return (
        <div>
            <input class="form-control my-0 py-1 lime-border" ref={input} type="text" placeholder="Article Search" aria-label="Search" />
            <div class="md-form form-sm form-2 pl-0 btn-sm">
                <Select className="select" onChange={onChangeSearchOpt} options={searchOpt} value={opt} />
                <button class="btn btn-success btn-sm float-r" onClick={()=>submit()}>Search</button>
            </div>
        </div>
    )
}

export default SearchBar;