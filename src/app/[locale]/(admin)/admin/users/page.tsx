import { getUsers } from "@/lib/admin/users";
import { Link } from "@/i18n/routing";
import { Search } from "lucide-react";

interface Props {
    searchParams: Promise<{
        page?: string;
        query?: string;
    }>;
}

export default async function AdminUsersPage({ searchParams }: Props) {
    const resolvedParams = await searchParams;
    const page = Number(resolvedParams.page) || 1;
    const query = resolvedParams.query || "";
    const limit = 10;

    const { users, pagination } = await getUsers({ page, limit, query });

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Users</h2>
                    <p className="text-muted-foreground">
                        Manage your users and view their details.
                    </p>
                </div>

                <form className="join">
                    <input
                        type="text"
                        name="query"
                        placeholder="Search users..."
                        defaultValue={query}
                        className="input input-bordered join-item w-full sm:w-xs"
                    />
                    <button type="submit" className="btn btn-primary join-item">
                        <Search size={16} />
                    </button>
                </form>
            </div>

            <div className="card bg-base-100 shadow-sm border border-base-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Info</th>
                                <th>Level</th>
                                <th>Referral</th>
                                <th>Joined</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center py-8 text-muted-foreground">
                                        No users found matching your search.
                                    </td>
                                </tr>
                            ) : (
                                users.map((user) => (
                                    <tr key={user.id}>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar placeholder">
                                                    <div className="bg-neutral text-neutral-content rounded-full w-10">
                                                        <span className="text-xs">{user.name.substring(0, 2).toUpperCase()}</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{user.name}</div>
                                                    <div className="text-xs opacity-50">{user.country?.name || "Global"}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="text-sm">{user.email}</div>
                                            <div className="text-xs opacity-50">{user.username}</div>
                                        </td>
                                        <td>
                                            <span className="badge badge-ghost badge-sm">
                                                Lv. {user.info?.level ?? 1}
                                            </span>
                                        </td>
                                        <td className="font-mono text-sm">{user.info?.referralCode || "-"}</td>
                                        <td className="text-sm">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </td>
                                        <td>
                                            <button className="btn btn-ghost btn-xs">Edit</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {pagination.totalPages > 1 && (
                <div className="flex justify-center">
                    <div className="join">
                        {page > 1 && (
                            <Link
                                href={`/admin/users?page=${page - 1}&query=${query}`}
                                className="join-item btn btn-sm"
                            >
                                «
                            </Link>
                        )}
                        <button className="join-item btn btn-sm btn-active">
                            Page {page} of {pagination.totalPages}
                        </button>
                        {page < pagination.totalPages && (
                            <Link
                                href={`/admin/users?page=${page + 1}&query=${query}`}
                                className="join-item btn btn-sm"
                            >
                                »
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
