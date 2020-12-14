import React from 'react'
import InfoForm from './InfoForm'

const EditMyInfo = (props) => {
    return(
        <InfoForm onSubmit={props.onSubmit} info={props.data} />
    )
}

export default EditMyInfo;