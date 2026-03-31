"use client";

import { useCallback, useEffect, useState } from "react";
import { getErrorLogsAction, deleteAllErrorLogsAction } from "@/actions/log-actions";
import { Trash2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LogEntry {
    id: string;
    level: string;
    message: string;
    stack: string | null;
    path: string | null;
    userId: string | null;
    details: unknown;
    createdAt: Date;
}

export default function ErrorLogsPage() {
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [levelFilter, setLevelFilter] = useState<string>("");

    const limit = 50;

    const fetchLogs = useCallback(async () => {
        setLoading(true);
        const res = await getErrorLogsAction({
            take: limit,
            skip: (page - 1) * limit,
            level: levelFilter || undefined,
        });

        if (res?.success && res.logs) {
            setLogs(res.logs as LogEntry[]);
            setTotal(res.totalCount || 0);
        }
        setLoading(false);
    }, [page, levelFilter]);

    useEffect(() => {
        fetchLogs();
    }, [fetchLogs]);

    const handleClearLogs = async () => {
        if (!confirm("모든 에러 로그를 삭제하시겠습니까? 복구할 수 없습니다.")) return;
        setLoading(true);
        const res = await deleteAllErrorLogsAction();
        if (res.success) {
            setPage(1);
            fetchLogs();
        } else {
            alert(res.message);
        }
        setLoading(false);
    };

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex justify-between items-center bg-white p-4 rounded shadow-sm border">
                <div>
                    <h1 className="text-xl font-bold text-gray-900">시스템 에러 로그</h1>
                    <p className="text-xs text-gray-500 mt-1">서버 및 애플리케이션 내역을 모니터링합니다. 현재 {total}개의 로그가 있습니다.</p>
                </div>
                <div className="flex space-x-2">
                    <select 
                        value={levelFilter} 
                        onChange={(e) => { setLevelFilter(e.target.value); setPage(1); }}
                        className="select select-bordered select-sm min-w-32 text-sm"
                    >
                        <option value="">전체 분류</option>
                        <option value="ERROR">ERROR</option>
                        <option value="WARN">WARN</option>
                        <option value="INFO">INFO</option>
                    </select>

                    <Button variant="outline" size="sm" onClick={fetchLogs} disabled={loading}>
                        <RefreshCw size={14} className={`mr-1 ${loading ? 'animate-spin' : ''}`} />
                        새로고침
                    </Button>
                    <Button variant="destructive" size="sm" onClick={handleClearLogs} disabled={loading}>
                        <Trash2 size={14} className="mr-1" />
                        일괄 삭제
                    </Button>
                </div>
            </div>

            <div className="bg-white rounded shadow-sm border overflow-hidden">
                <table className="table table-sm w-full text-sm">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="w-16 text-center">No.</th>
                            <th className="w-24 text-center">분류</th>
                            <th>메시지</th>
                            <th className="w-32">사용자 ID</th>
                            <th className="w-48 text-center">발생 일시</th>
                            <th className="w-20 text-center">상세</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="text-center py-12 text-gray-500">
                                    기록된 에러 로그가 없습니다.
                                </td>
                            </tr>
                        ) : (
                            logs.map((log, idx) => (
                                <tr key={log.id} className="hover:bg-gray-50">
                                    <td className="text-center text-gray-500">
                                        {total - ((page - 1) * limit + idx)}
                                    </td>
                                    <td className="text-center">
                                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                                            log.level === 'ERROR' ? 'bg-red-100 text-red-700' :
                                            log.level === 'WARN' ? 'bg-orange-100 text-orange-700' :
                                            'bg-blue-100 text-blue-700'
                                        }`}>
                                            {log.level}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="font-medium text-gray-800 break-all">{log.message}</div>
                                        {log.path && <div className="text-xs text-gray-400 mt-1 break-all">Path: {log.path}</div>}
                                    </td>
                                    <td className="text-gray-600 text-xs break-all">
                                        {log.userId || '-'}
                                    </td>
                                    <td className="text-center text-gray-500 text-xs">
                                        {new Date(log.createdAt).toLocaleString()}
                                    </td>
                                    <td className="text-center">
                                        <button 
                                            className="btn btn-xs btn-outline border-gray-300 text-gray-600 hover:bg-gray-100"
                                            onClick={() => alert(log.stack || JSON.stringify(log.details, null, 2) || "상세 내용이 없습니다.")}
                                        >
                                            자세히
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            
            {total > limit && (
                <div className="flex justify-center mt-6 p-4">
                    <div className="join">
                        <button 
                            className="join-item btn btn-sm" 
                            disabled={page === 1}
                            onClick={() => setPage(p => p - 1)}
                        >
                            «
                        </button>
                        <button className="join-item btn btn-sm btn-active pointer-events-none bg-white">
                            Page {page} of {Math.ceil(total / limit)}
                        </button>
                        <button 
                            className="join-item btn btn-sm" 
                            disabled={page >= Math.ceil(total / limit)}
                            onClick={() => setPage(p => p + 1)}
                        >
                            »
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
