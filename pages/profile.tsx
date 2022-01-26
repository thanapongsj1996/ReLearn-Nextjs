import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import cookie from 'js-cookie'
import Layout from '../layouts/Layout'
import Post from '../components/Post'
import { useRouter } from 'next/router'

type Post = {
    id: number
}
type UserProfile = {
    username: string,
    createAt: string,
    name: string
}

const Profile: NextPage = () => {
    const router = useRouter()

    const [profile, setProfile] = useState({} as UserProfile)
    const [posts, setPosts] = useState([] as Post[])
    const [auth, setAuth] = useState(false as boolean)

    useEffect(() => {
        getAllPosts()
        setAuthStatus()
    }, [])

    const setAuthStatus = async () => {
        const user = await cookie.get('user')
        if (user && user !== '') {
            setAuth(true)
        } else {
            await router.push('/login')
        }
    }

    const getAllPosts = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/user`, {
                credentials: 'include'
            })
            const resJson = await response.json()

            setPosts(resJson.posts)
            setProfile({
                username: resJson.username,
                createAt: resJson.createdAt,
                name: resJson.name
            })

            const user = await cookie.get('user')
            if (user && user !== '') {
                setAuth(true)
            }
        } catch (e) {
            console.log(e)
            setAuth(false)
        }
    }

    return (
        <Layout auth={auth}>
            <div className="p-5 mb-4 bg-light rounded-3">
                <div className="container-fluid">
                    <h1 className="display-5 fw-bold">{profile.name}</h1>
                    <p className="col-md-8 fs-4">
                        You have {posts ? posts.length : 0} post{posts ? posts.length <= 1 ? '' : 's' : ''}
                    </p>
                </div>
            </div>

            <div className="row my-4">
                {posts && posts.length > 0 && posts.map(p => <Post post={p} name={profile.name} canBeDeleted={true} key={p.id} />)}
            </div>
        </Layout>
    )
}

export default Profile;
