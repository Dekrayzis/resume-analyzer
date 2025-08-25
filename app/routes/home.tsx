import type { Route } from "./+types/home";
import {Link, useNavigate} from "react-router";
import {useState} from "react";
import NavBar from "~/components/navBar";
import {resumes as mockResumes} from '~/constants'

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resume AI Analyzer" },
    { name: "description", content: "Smart feedback for your dream job!" },
  ];
}

export default function Home() {
    const navigate = useNavigate();
    const [resumes, setResumes] = useState<Resume[]>(mockResumes);
    const [loadingResumes, setLoadingResumes] = useState(false);

  return <main className="bg-[url('/images/bg-main.svg')] bg-cover)]">
      <NavBar/>
      <section className="main-section">
          <div className="page-heading">
              <h1>Track your applications and resume ratings</h1>
          </div>
          {!loadingResumes && resumes?.length === 0 ? (
              <h2>No resumes found. Upload your first resume to get feedback.</h2>
          ): (
              <h2>Review your submissions and check AI-powered feedback.</h2>
          )}
          {loadingResumes && (
              <div className="flex flex-col items-center justify-center">
                  <img src="/images/resume-scan-2.gif" className="w-[200px]" />
              </div>
          )}
          {!loadingResumes && resumes.length > 0 && (
              <div className="resumes-section">
                  {resumes.map((resume) => (
                      <div key={resume.id}>{resume.jobTitle}</div>
                  ))}
              </div>
          )}

          {!loadingResumes && resumes?.length === 0 && (
              <div className="flex flex-col items-center justify-center mt-10 gap-4">
                  <Link to="/upload" className="primary-button w-fit text-xl font-semibold">
                      Upload Resume
                  </Link>
              </div>
          )}
      </section>

      {[]}
  </main>
}
