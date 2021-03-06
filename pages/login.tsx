import type { NextPage } from 'next'
import cookie from 'js-cookie'
import { useRouter } from 'next/router'
import React, { SyntheticEvent, useState } from 'react'
import Layout from '../layouts/Layout'

const Login: NextPage = () => {

    const router = useRouter()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault()
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/login`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                username,
                password
            })
        })



        if (response.ok) {
            const res = await response.json()
            await cookie.set('token', res.jwt)
            await router.push('/')
        } else {
            alert('Incorrect username or password')
        }
    }

    return (
        <Layout>
            <form onSubmit={submit} className="form-signin">
                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                <input className="form-control my-1" placeholder="Username" required onChange={e => setUsername(e.target.value)} />
                <input type="password" className="form-control my-1" placeholder="Password" required onChange={e => setPassword(e.target.value)} />
                <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
            </form>
        </Layout>
    )
}

export default Login
