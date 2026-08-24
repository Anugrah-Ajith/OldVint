export default function Loading() {
    return (
        <div className="min-h-screen pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
                {/* Hero Skeleton */}
                <div className="w-full h-64 md:h-96 bg-bg-muted rounded-2xl animate-pulse"></div>

                {/* Grid Skeleton */}
                <div>
                    <div className="h-8 w-48 bg-bg-muted mb-6 animate-pulse rounded-md"></div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="flex flex-col gap-3">
                                <div className="aspect-[3/4] w-full bg-bg-muted rounded-xl animate-pulse"></div>
                                <div className="h-4 w-3/4 bg-bg-muted animate-pulse rounded"></div>
                                <div className="h-4 w-1/4 bg-bg-muted animate-pulse rounded"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
