import Link from "next/link";
import React from "react";

export default function HomePage() {
    return (
        <main>
            <h1> CPRG 306: Web Development 2 - Assignments </h1>
            <div>
              <Link href="/week-2" className="text-blue-500 hover:underline">Week 2</Link>
              <Link href="/week-3" className="text-blue-500 hover:underline ml-4">Week 3</Link>
                <Link href="/week-4" className="text-blue-500 hover:underline ml-4">Week 4</Link>
            </div>
        </main>
    );
}