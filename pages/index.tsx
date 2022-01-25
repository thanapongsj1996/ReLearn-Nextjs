import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Layout from '../layouts/Layout'

type Post = {
  body: string
}

const Home: NextPage = () => {

  const [posts, setPosts] = useState([] as Post[])
  const [auth, setAuth] = useState(false as boolean)

  useEffect(() => {
    getAllPosts()
  }, [])

  const getAllPosts = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/posts`, {
        credentials: 'include'
      })
      const postsJson = await response.json() as Post[]
      setPosts(postsJson)
      setAuth(true)
    } catch (e) {
      console.log(e)
      setAuth(false)
    }
  }

  return (
    <Layout auth={auth}>
      Home
      {posts.map(post => <div>{post.body}</div>)}
    </Layout>
  )
}

export default Home
