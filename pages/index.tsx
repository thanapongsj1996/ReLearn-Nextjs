import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import cookie from 'js-cookie'
import Layout from '../layouts/Layout'
import Post from '../components/Post'

type Post = {
  id: number
}

const Home: NextPage = () => {

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
    }
  }

  const getAllPosts = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/posts`, {
        credentials: 'include'
      })
      const postsJson = await response.json() as Post[]
      setPosts(postsJson)
    } catch (e) {
      console.log(e)
      setAuth(false)
    }
  }

  return (
    <Layout auth={auth}>
      <div className="p-5 mb-4 bg-light rounded-3">
        <div className="container-fluid">
          <h1 className="display-5 fw-bold">มาบ่นกันเถอะ</h1>
        </div>
      </div>
      <div className="row my-4">
        {posts.map(p => <Post post={p} key={p.id} />)}
      </div>
    </Layout>
  )
}

export default Home
