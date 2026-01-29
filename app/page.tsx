import Link from "next/link";
import React from "react";

export default function HomePage() {
    return (
        <main>
            <h1> CPRG 306: Web Development 2 - Assignments </h1>
            <div>
              <Link href="/week-2">Week 2</Link>
            </div>
        </main>
    );
}