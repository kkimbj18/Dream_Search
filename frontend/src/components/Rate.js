import React from 'react'

const Rate = (props) => {
    const _makeStars = () => {
        let stars = [];
        for(let i = 0; i < 10; i+=2){
            let starClass = "star__rate";
            
            if (i < props.rating) {               
                if(i >= props.rating - props.rating%2 && props.rating % 2 !== 0){
                    starClass += ' is-half-selected';
                }else{
                    starClass += ' is-selected';
                }
            }

            stars.push(
                <label key={i} 
                    className={starClass} 
                >
                </label>
            )
        }
        return stars;
    }
    return(
        <span class="float-r">{_makeStars()}</span>
    )
}

export default Rate;