import React from 'react'

type Props = { post: any, name?: string, canBeDeleted?: boolean }

const Post = ({ post, name, canBeDeleted }: Props) => {

    const formattedDateTime = (date: string) => {
        const d = new Date(date).toLocaleDateString('th-TH', { timeZone: 'Asia/Bangkok' })
        const t = new Date(date).toLocaleTimeString('th-TH', { timeZone: 'Asia/Bangkok' })
        return t + ' ' + d
    }

    const onDelete = async () => {
        const isConfirm = confirm('Do you want to delete this post?')
        if (isConfirm) {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/posts/${post.id}`, {
                credentials: 'include',
                method: 'DELETE'
            })

            if (response.ok) {
                location.reload()
            } else {
                alert('There was error, please try again..')
            }
        }
    }

    return (
        <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3 my-2">
            <div className="card">
                <div className="card-body">

                    <div className="d-flex w-100">
                        <div className="my-1">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="40"
                                height="40"
                                fill="currentColor"
                                className="bi bi-person"
                                viewBox="0 0 16 16"
                            >
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                            </svg>
                        </div>
                        <div className="px-2">
                            <strong className="card-text">{post.user ? post.user.name : name}</strong><br />
                            <span className="text-muted">{formattedDateTime(post.createdAt)}</span>
                        </div>
                        {
                            canBeDeleted && <div className="ms-auto">
                                <svg
                                    onClick={() => onDelete()}
                                    style={{ cursor: 'pointer' }}
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    fill="currentColor"
                                    className="bi bi-trash"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                </svg>
                            </div>
                        }
                    </div>

                    <h4 className="card-title mt-3">{post.body}</h4>
                </div>
            </div>
        </div>
    )
}

export default Post
