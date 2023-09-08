import { Suspense } from "react"
import { Outlet } from "react-router-dom"

const Layout = () => {

    
    return (
        <main >
            <Suspense fallback={<div>loading...</div>}>
                <Outlet />

            </Suspense>
        </main>
    )
}

export default Layout
