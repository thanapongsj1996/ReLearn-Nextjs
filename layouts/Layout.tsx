import Head from 'next/head'
import cookie from 'js-cookie'
import React, { FunctionComponent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

type Props = {
    children: any,
    auth?: boolean
}

const Layout: FunctionComponent<Props> = (props) => {

    const router = useRouter()
    const logout = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/logout`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            credentials: 'include'
        })

        await cookie.remove('user')
        await router.push('/login')
    }

    const createPost = async () => {
        const text = prompt('Please input something..')
        if (text) {
            const resposne = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/posts`, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ body: text })
            })
            const resJson = await resposne.json()
            if (!resJson.error) {
                alert('Your post is added')
                location.reload()
            } else {
                alert('There was some errors, try again..')
            }
        }
    }

    let menu

    if (!props.auth) {
        menu = (
            <ul className="navbar-nav me-auto mb-2 mb-md-0 flex-row">
                <li className="nav-item px-2">
                    <Link href="/login">
                        <a className="nav-link active" aria-current="page">Login</a>
                    </Link>
                </li>
                <li className="nav-item px-2">
                    <Link href="/register">
                        <a className="nav-link active" aria-current="page">Register</a>
                    </Link>
                </li>
            </ul>
        )
    } else {
        menu = (
            <ul className="navbar-nav me-auto mb-2 mb-md-0">

                <li className="nav-item px-2">
                    <button className="btn btn-primary" onClick={e => createPost()}>Create post</button>
                </li>
                <li className="nav-item px-2">
                    <Link href="/profile">
                        <a className="nav-link active" aria-current="page">Profile</a>
                    </Link>
                </li>
                <li className="nav-item px-2">
                    <a href="#" className="nav-link active" aria-current="page" onClick={logout}>Logout</a>
                </li>
            </ul>
        )
    }

    return <>
        <Head>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
                rel="stylesheet"
                integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
                crossOrigin="anonymous" />
        </Head>

        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
            <div className="container">
                <Link href="/"><a className="navbar-brand">บ่นบ่น</a></Link>
                <div>{menu}</div>
            </div>
        </nav>


        <main className="container py-4">
            {props.children}
        </main>
    </>
}

export default Layout
