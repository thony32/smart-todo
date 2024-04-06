import React from "react"

const SkeletonLoader = () => {
    return (
        <div className="w-2/3 px-8 py-4 rounded-md bg-primary/10 flex flex-col justify-center gap-4">
            <div className="flex justify-between w-full">
                <div className="h-4 bg-secondary animate-pulse rounded-full w-4"></div>
                <div className="h-4 bg-secondary animate-pulse rounded w-3/4"></div>
            </div>
            <div className="h-16 bg-secondary animate-pulse rounded w-full"></div>
        </div>
    )
}

export default SkeletonLoader
