import React from 'react'

const MyInfo = (props) => {
    return (
        <div class="card mt-4">

            <div class="card-body">
                <label>Nickname</label>
                <h4 class="card-title">{props.data?.n_name}</h4>
                <hr />
                <label>Name</label>
                <p class="card-text pcontent">{props.data?.name}</p>
                <label>Birth</label>
                <p class="card-text pcontent">{props.data?.birth_y+"-"+props.data?.birth_m}</p>
                <label>Region</label>
                <p class="card-text pcontent">{props.data?.region}</p>
                <label>Major</label>
                <p class="card-text pcontent">{props.data?.major}</p>
                <label>Dream</label>
                <p class="card-text pcontent">{props.data?.dream}</p>
            </div>
        </div>
    )
}

export default MyInfo;