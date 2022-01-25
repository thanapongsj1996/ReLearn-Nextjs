import React, { SyntheticEvent, useState } from 'react'
import type { NextPage } from 'next'
import Layout from '../layouts/Layout'
import { useRouter } from 'next/router'

const Register: NextPage = () => {

    const router = useRouter()

    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault()

        await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/register`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                name,
                username,
                password
            })
        })

        await router.push('/login')
    }


    return (
        <Layout>
            <form onSubmit={submit}>
                <h1 className="h3 mb-3 fw-normal">Please register</h1>

                <input className="form-control" placeholder="Name" required onChange={e => setName(e.target.value)} />
                <input className="form-control" placeholder="Username" required onChange={e => setUsername(e.target.value)} />
                <input type="password" className="form-control" placeholder="Password" required onChange={e => setPassword(e.target.value)} />
                <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
            </form>
        </Layout>
    )
}

export default Register
