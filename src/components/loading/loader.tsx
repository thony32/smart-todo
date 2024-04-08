const SkeletonLoader = () => {
    return (
        <>
            {
                [...Array(Math.floor(Math.random() * 10) + 1)].map((_, index) => (
                    <div key={index} className="skeleton bg-transparent border-2 h-52 w-full"></div>
                ))
            }
        </>
    )
}

export default SkeletonLoader
