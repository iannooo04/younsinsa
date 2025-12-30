import {
    Users,
    ShoppingBag,
    ListOrdered,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight
} from "lucide-react";

export default async function AdminDashboardPage() {
    // We can fetch real stats here later
    const stats = [
        { name: "Total Revenue", value: "$45,231.89", change: "+20.1%", trend: "up", icon: TrendingUp },
        { name: "Users", value: "+2350", change: "+180.1%", trend: "up", icon: Users },
        { name: "Sales", value: "+12,234", change: "+19%", trend: "up", icon: ShoppingBag },
        { name: "Active Orders", value: "573", change: "-201", trend: "down", icon: ListOrdered },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
                <p className="text-muted-foreground">Welcome back to your administration panel.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <div key={stat.name} className="card bg-base-100 shadow-sm border border-base-200">
                        <div className="card-body p-6">
                            <div className="flex items-center justify-between space-y-0 pb-2">
                                <span className="text-sm font-medium">{stat.name}</span>
                                <stat.icon size={16} className="text-muted-foreground" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-bold">{stat.value}</span>
                                <div className="flex items-center pt-1">
                                    {stat.trend === "up" ? (
                                        <ArrowUpRight size={14} className="text-success mr-1" />
                                    ) : (
                                        <ArrowDownRight size={14} className="text-error mr-1" />
                                    )}
                                    <span className={`text-xs ${stat.trend === "up" ? "text-success" : "text-error"}`}>
                                        {stat.change}
                                    </span>
                                    <span className="text-xs text-muted-foreground ml-1">from last month</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="card bg-base-100 shadow-sm border border-base-200 col-span-4">
                    <div className="card-body">
                        <h3 className="card-title text-lg font-medium">Recent Activity</h3>
                        <div className="space-y-4 pt-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        {i}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">User logged in</p>
                                        <p className="text-xs text-muted-foreground">Admin user accessed the dashboard</p>
                                    </div>
                                    <div className="text-xs text-muted-foreground">2m ago</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-sm border border-base-200 col-span-3">
                    <div className="card-body">
                        <h3 className="card-title text-lg font-medium">Quick Actions</h3>
                        <div className="flex flex-col gap-2 pt-4">
                            <button className="btn btn-primary btn-sm">Add New Product</button>
                            <button className="btn btn-outline btn-sm">View Reports</button>
                            <button className="btn btn-ghost btn-sm text-error">System Maintenance</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
