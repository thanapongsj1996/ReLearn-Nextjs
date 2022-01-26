// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // const response = await fetch('https://bonbon-for-everyone.herokuapp.com/api/v1/login', {
    //     method: 'POST',
    //     headers: { 'Content-type': 'application/json' },
    //     credentials: 'include',
    //     body: JSON.stringify({
    //         username: 'iamboy',
    //         password: 'boyboy'
    //     })
    // })

    const response = await axios.post('https://bonbon-for-everyone.herokuapp.com/api/v1/login', {
        username: 'iamboy',
        password: 'boyboy'
    }, {
        withCredentials: true,
        headers: { 'Content-type': 'application/json' },
    })
    // const resJson = await response.json()
    console.log('resJson: ', response)
    res.status(200).json(response)
}
