import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import React, { SyntheticEvent, useState } from 'react';
import Layout from '../layouts/Layout';

const Login: NextPage = () => {

    const router = useRouter()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault()

        await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/login`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                username,
                password
            })
        })

        await router.push('/')
    }

    return (
        <Layout>
            <form onSubmit={submit}>
                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                <input className="form-control" placeholder="Username" required onChange={e => setUsername(e.target.value)} />
                <input type="password" className="form-control" placeholder="Password" required onChange={e => setPassword(e.target.value)} />
                <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
            </form>
        </Layout>
    )
};

export default Login;