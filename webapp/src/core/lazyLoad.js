
import React from 'react'

export default function lazyLoad(path) {
    const Component = React.lazy(() => import(path))

    return (
        <React.Suspense fallback={<div>loading...</div>}>
            <Component></Component>
        </React.Suspense>
    )
}
