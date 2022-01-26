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

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/register`, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({
                    name,
                    username,
                    password
                })
            })
            const resJson = await response.json()
            if (!resJson.id) {
                alert('Username is taken, please try another username.')
            } else {
                await router.push('/login')
            }
        } catch (err) {
            console.log(err)
            alert('There was an error, please try again..')
        }

    }


    return (
        <Layout>
            <form onSubmit={submit} className="form-signin">
                <h1 className="h3 mb-3 fw-normal">Please register</h1>

                <input className="form-control my-1" placeholder="Profile name" required onChange={e => setName(e.target.value)} />
                <input className="form-control my-1" placeholder="Username for login" required onChange={e => setUsername(e.target.value)} />
                <input type="password" className="form-control my-1" placeholder="Password for login" required onChange={e => setPassword(e.target.value)} />
                <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
            </form>
        </Layout>
    )
}

export default Register
