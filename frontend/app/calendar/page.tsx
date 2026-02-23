"use client";

import Link from "next/link";
import { FaHome } from "react-icons/fa";
import Calendar from "@/components/Calendar";

export default function CalendarPage() {
  return (
    <div>
      {/* Navigation bar */}
      <nav className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            Portfolio
          </h1>
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            <FaHome />
            Back Home
          </Link>
        </div>
      </nav>

      {/* Calendar content */}
      <Calendar />
    </div>
  );
}
