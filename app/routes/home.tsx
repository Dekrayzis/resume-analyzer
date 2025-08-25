import type { Route } from "./+types/home";
import { Link } from "react-router";
import { useState } from "react";
import NavBar from "~/components/navBar";
import { resumes as mockResumes } from "~/constants";
import {ResumeCard} from "~/components/ResumeCard";

type Status = "loading" | "empty" | "ready";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Resume AI Analyzer" },
        { name: "description", content: "Smart feedback for your dream job!" },
    ];
}

export default function Home() {
    const [resumes] = useState<Resume[]>(mockResumes);
    const [loadingResumes] = useState(false);

    const status: Status = loadingResumes
        ? "loading"
        : resumes.length === 0
            ? "empty"
            : "ready";

    const headings = {
        loading: "Scanning your resumes…",
        empty: "No resumes found. Upload your first resume to get feedback.",
        ready: "Review your submissions and check AI-powered feedback.",
    } as const satisfies Record<Status, string>;

    const views = {
        loading: (
            <div className="flex flex-col items-center justify-center" aria-busy>
                <img
                    src="/images/resume-scan-2.gif"
                    className="w-[200px]"
                    alt="Scanning resumes"
                />
            </div>
        ),
        empty: (
            <div className="flex flex-col items-center justify-center mt-10 gap-4">
                <Link to="/upload" className="primary-button w-fit text-xl font-semibold">
                    Upload Resume
                </Link>
            </div>
        ),
        ready: (
            <div className="resumes-section">
                {resumes.map((resume) => (
                    <ResumeCard key={resume.id} resume={resume} />
                ))}
            </div>
        ),
    } as const satisfies Record<Status, React.ReactNode>;

    return (
        <main className="bg-[url('/images/bg-main.svg')] bg-cover">
            <NavBar />
            <section className="main-section">
                <div className="page-heading">
                    <h1>Track your applications and resume ratings</h1>
                </div>
                <h2>{headings[status]}</h2>
                {views[status]}
            </section>
        </main>
    );
}
