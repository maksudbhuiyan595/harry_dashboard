const StatCard = ({ title, value, percentage, icon: Icon, iconBgColor, percentageColor }: any) => (
    <div className="flex-1 rounded-lg p-5 shadow-lg" style={{ background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), #3A3E41' }}>
        <div className="flex justify-between">
            <div className="flex flex-col gap-4">
                <div className={`flex h-9 w-9 items-center justify-center rounded-md ${iconBgColor}`}>
                    <Icon className="h-6 w-6 text-white" />
                </div>
                <div>
                    <div className="text-2xl font-bold text-white">{value}</div>
                    <div className="text-sm text-gray-300">{title}</div>
                </div>
            </div>
            <div className={`text-sm font-bold ${percentageColor}`}>{percentage}</div>
        </div>
    </div>
);


export default StatCard