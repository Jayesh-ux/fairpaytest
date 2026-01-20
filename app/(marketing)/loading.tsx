export default function Loading() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
            {/* Hero skeleton */}
            <div className="container mx-auto px-4 py-20">
                <div className="max-w-4xl mx-auto space-y-8 animate-pulse">
                    <div className="h-16 bg-muted rounded-lg w-3/4 mx-auto"></div>
                    <div className="h-8 bg-muted rounded-lg w-1/2 mx-auto"></div>
                    <div className="flex gap-4 justify-center">
                        <div className="h-12 bg-muted rounded-lg w-32"></div>
                        <div className="h-12 bg-muted rounded-lg w-32"></div>
                    </div>
                </div>
            </div>

            {/* Services skeleton */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-48 bg-muted rounded-lg"></div>
                    ))}
                </div>
            </div>
        </div>
    );
}
