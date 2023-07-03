import { useState } from 'react'

function CommentsPage() {

    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')

    const fetchComments = async() => {

        const response = await fetch('/api/comments')
        const data = await response.json()
        setComments(data)

    }

    const submitComment = async () => {
        
        const response = await fetch('api/comments', {
            method: 'POST',
            body: JSON.stringify({comment}),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json()

    }

    const deleteComment = async (commentId) => {
        const response = await fetch(`/api/comments/${commentId}`, {
            method: 'DELETE',
        })

        const data = await response.json()

        fetchComments()
    }

    return(
        <>

            <input 
                type='text'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            >
            </input>

            <button onClick={submitComment}>Submit comment</button>

            <button onClick={fetchComments}>Load comments</button>
            {comments.map((comment) => {
                return(
                    <div key={comment.id}>
                        {comment.id} {comment.text} 
                        <br></br>
                        <button onClick={() => deleteComment(comment.id)}>Delete</button>
                        <hr></hr>
                    </div>
                )
            })}
        </>
    )

}

export default CommentsPage