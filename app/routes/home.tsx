import type { Route } from "./+types/home";
import {useEffect, useState} from "react";
import {usePuterStore} from "~/lib/puter";
import {useNavigate} from "react-router";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import {resumes} from "../../constants";
import resume from "~/routes/resume";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resume Analyser" },
    { name: "description", content: "Analysing your Resume within seconds!" },
  ];
}

export default function Home() {
  const {isLoading, auth, fs} = usePuterStore();
  const navigate = useNavigate();

  useEffect(() => {
        if (!auth.isAuthenticated) navigate('/auth?next=/');
      }, [auth.isAuthenticated]
  )

  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <Navbar/>
    <section className="main-section">
      <div className="page-heading py-16">
        <h1>Get Feedback of your Resume Instantly!</h1>
        <h2>Simple.Sleek.Stylish</h2>
      </div>
      {resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume) => (
                <ResumeCard key={resume.id} resume={resume}/>
            ))}
          </div>
      )}
    </section>
    </main>;
}
