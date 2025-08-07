import React, { useEffect, useState } from "react";
import api from "../services/api";
import { FaChartLine, FaInfoCircle } from "react-icons/fa";

export default function Reports() {
  const [overdueBooks, setOverdueBooks] = useState([]);
  const [popularGenres, setPopularGenres] = useState([]);
  const [totalBorrows, setTotalBorrows] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReportData();
  }, []);

  async function fetchReportData() {
    setLoading(true);
    try {
      const overdueRes = await api.get("/borrow-records/reports/overdue");

      setOverdueBooks(overdueRes.data || []);
      console.log(overdueRes.data);

      const popularRes = await api.get(
        "/borrow-records/reports/popular-genres"
      );
      setPopularGenres(popularRes.data || []);

      const borrowsRes = await api.get("/borrow-records/reports/summary");
      setTotalBorrows(borrowsRes.data || []);
    } catch {
      setOverdueBooks([]);
      setPopularGenres([]);
      setTotalBorrows([]);
    }
    setLoading(false);
  }

  return (
    <div className="p-1 min-h-screen bg-gray-50 ">
      <h1 className="text-3xl font-bold flex">Reports</h1>
      <div className="text-gray-600 mb-6 flex">
        Library analytics and reports
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex  gap-2 mb-2 text-3xl font-semibold">
              <FaInfoCircle /> Overdue Books
            </div>
            <div className="text-gray-500 mb-4 flex">
              Books that are past their due date
            </div>
            {overdueBooks.length === 0 ? (
              <div className="text-gray-400">No overdue books.</div>
            ) : (
              overdueBooks.map((b) => (
                <div
                  key={b.id}
                  className="bg-red-50 rounded-lg p-4 mb-4 flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-lg mb-1">{b.book_id}</div>
                    <div className="text-gray-700 text-sm mb-1">
                      Member: {b.member_id}
                    </div>
                    <div className="text-gray-700 text-sm">
                      Due: {b.due_date}
                    </div>
                  </div>
                  <span className="bg-red-500 text-white px-4 py-1 rounded-full text-xs font-semibold">
                    {b.daysOverdue} days overdue
                  </span>
                </div>
              ))
            )}
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center gap-2 mb-2 text-3xl font-semi bold">
              <FaChartLine /> Popular Genres
            </div>
            <div className="text-gray-500 mb-4 flex">
              Most borrowed book genres
            </div>
            {popularGenres.length === 0 ? (
              <div className="text-gray-400">No data.</div>
            ) : (
              <div className="space-y-3">
                {popularGenres.map((g, i) => (
                  <div key={g.id} className="flex items-center gap-4">
                    <span className="w-6 text-right">#{i + 1}</span>
                    <span className="flex-1">{g.genre_name}</span>
                    <div className="flex-1 flex items-center gap-2">
                      <div
                        className="h-2 bg-blue-500 rounded-full"
                        style={{
                          width: `${Math.max(
                            10,
                            (g.borrow_count /
                              (popularGenres[0]?.borrow_count || 1)) *
                              100
                          )}%`,
                        }}
                      ></div>
                      <span className="text-xs text-gray-600">
                        {g.borrow_count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {totalBorrows.length === 0 ? (
        <div className="text-gray-400">No overdue books.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col">
            <div className="mb-1 flex font-semibold text-md">
              Total Borrows This Month
            </div>
            <div className="text-3xl font-bold flex ">
              {totalBorrows.totalBorrowsThisMonth}
            </div>
            <div className="text-sm text-gray-500 flex pt-2">
              % from last month
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col">
            <div className="mb-1 flex font-semibold text-md">
              Average Borrow Duration
            </div>
            <div className="text-3xl font-bold flex ">
              {totalBorrows.averageBorrowDuration} days
            </div>
            <div className="text-sm text-gray-500 flex pt-2">
              days from last month
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col">
            <div className="mb-1 flex font-semibold text-md">Return Rate</div>
            <div className="text-3xl font-bold flex">
              {totalBorrows.returnRate} %
            </div>
            <div className="text-sm text-gray-500 flex pt-2">
              % from last month
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
