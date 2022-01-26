// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const response = await fetch('https://bonbon-for-everyone.herokuapp.com/api/v1/login', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
            username: 'iamboy',
            password: 'boyboy'
        })
    })
    const resJson = await response.json()
    console.log('resJson: ', resJson)
    res.status(200).json(resJson)
}
