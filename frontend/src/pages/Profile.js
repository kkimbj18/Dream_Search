import React, {useState, useEffect} from 'react'
import EditMyInfo from '../components/EditMyInfo';
import LikedArticleList from '../components/LikedArticleList';
import MyArticleList from '../components/MyArticleList';
import MyInfo from '../components/MyInfo';
import SideNav from '../components/SideNav';
import request from '../libs/request'

const Profile = () => {
    const [opt, setOpt] = useState(0);
    const [data, setData] = useState();

    useEffect(()=>{
        async function fetchData(){
            let temp = await request.getUser(window.sessionStorage.getItem('n_name'));
            setData(temp);
        }
        fetchData();
    }, []);

    const optHandler = (option) => {
        setOpt(option);
    }

    return(
        <div class="container">
            <div class="row">

                <SideNav onHandle={optHandler} />

                <div class="col-lg-8 col-md-10 mx-auto">

                    {opt === 3 &&
                        <MyInfo data={data} />
                    }
                    {opt === 4 &&
                        <MyArticleList data={data} />
                    }
                    {opt === 5 &&
                        <LikedArticleList data={data} getArticle={request.getArticle}/>
                    }
                    {opt === 6 &&
                        <EditMyInfo data={data} onSubmit={request.updateUser}/>
                    }

                </div>
            </div>
        </div>
    )
}

export default Profile;