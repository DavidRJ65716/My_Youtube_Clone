import { Outlet } from "react-router-dom"
//import { SidebarProvider } from "../contexts/SidebarContext"
import { PageHeader } from "./pageheader/PageHeader"
import { SideBarMain } from "./sidebar/SideBarMain"
import { SideBarWatch } from "./sidebar/SideBarWatch"
import { VideoPlayerProvider } from "../contexts/VideoPlayerContext"

export function LayoutMain() { 

    return (

        <div className="max-h-screen flex flex-col">
            <PageHeader />
            <div className="grid grid-cols-[auto,1fr] flex-grow overflow-auto">
                <SideBarMain />
                <Outlet />
            </div>
        </div>

    )
}

export function LayoutVideo() { 

    return (
        <VideoPlayerProvider>
            <div className="max-h-screen flex flex-col">
                <PageHeader />
                <div className="grid grid-cols-[auto,auto] flex-grow overflow-auto">
                    <SideBarWatch />
                    <div className="w-screen h-full">
                        <Outlet />
                    </div>
                </div>
            </div>
        </VideoPlayerProvider>
    )
}