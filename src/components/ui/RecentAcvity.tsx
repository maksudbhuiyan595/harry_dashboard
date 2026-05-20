import { useDashboardOverviewQuery } from "@/app/api/dashboardApi";
import { RecentActivityType } from "@/utility/type/dashboardType";

const RecentActivity = () => {


    const { data } = useDashboardOverviewQuery(undefined);
    const userActivity: RecentActivityType[] = data?.recent_activity || [];

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
