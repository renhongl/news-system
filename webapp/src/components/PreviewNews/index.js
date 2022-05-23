import React from 'react'

export default function Index({ markdown }) {
    return (
        <div style={{
            marginTop: '20px',
            marginBottom: '20px',
            padding: '20px',
            border: '1px solid #ebebeb'
        }} dangerouslySetInnerHTML={{
            __html: markdown
        }}></div>
    )
}
