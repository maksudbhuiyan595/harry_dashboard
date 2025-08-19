const RecentActivity = () => {
    const userActivity = [
        { name: "Sarah Johnson", action: "Created new post", time: "2 minutes ago" },
        { name: "John Doe", action: "Updated profile", time: "5 minutes ago" },
        { name: "Jane Smith", action: "Commented on a post", time: "10 minutes ago" },
        { name: "Mike Brown", action: "Shared a job listing", time: "15 minutes ago" },
        { name: "Emily White", action: "Created new business profile", time: "20 minutes ago" },
    ];

    return (
        <div
            className="rounded-lg p-6 shadow-lg lg:w-1/2"
            style={{
                background:
                    "linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), #3A3E41",
            }}
        >
            <h2 className="mb-6 text-xl font-bold text-white">Recent User Activity</h2>
            <div className="space-y-6  pt-6">
                {userActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between border-t border-gray-700">
                        <div>
                            <div className="font-semibold text-white">{activity.name}</div>
                            <div className="text-sm text-gray-400">{activity.action}</div>
                        </div>
                        <div className="text-xs text-gray-500">{activity.time}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentActivity;
