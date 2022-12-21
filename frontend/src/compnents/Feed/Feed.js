import React from 'react'
import './Feed.css'

function Feed() {
    return (
        <>
            <section className='feed-content'>
                <form>
                    <input
                        id='tweet-input'
                        type='textarea'
                        placeholder="What's happening"
                    />
                    <button className='submit-button'>Tweet</button>
                </form>
                <tweet>
                    <p>User</p>
                    <p>Tweet Content</p>
                </tweet>
                <tweet>
                    <p>User</p>
                    <p>Tweet Content</p>
                </tweet><tweet>
                    <p>User</p>
                    <p>Tweet Content</p>
                </tweet><tweet>
                    <p>User</p>
                    <p>Tweet Content</p>
                </tweet><tweet>
                    <p>User</p>
                    <p>Tweet Content</p>
                </tweet><tweet>
                    <p>User</p>
                    <p>Tweet Content</p>
                </tweet><tweet>
                    <p>User</p>
                    <p>Tweet Content</p>
                </tweet><tweet>
                    <p>User</p>
                    <p>Tweet Content</p>
                </tweet><tweet>
                    <p>User</p>
                    <p>Tweet Content</p>
                </tweet>
            </section>
        </>
    )
}

export default Feed
