import type { Route } from "./+types/home";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {usePuterStore} from "~/lib/puter";
import {useNavigate} from "react-router";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resume Analyser" },
    { name: "description", content: "Analysing your Resume within seconds!" },
  ];
}

export default function Home() {
  const {isLoading, auth, kv} = usePuterStore();
  const navigate = useNavigate();

  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);


  useEffect(() => {
        if (!auth.isAuthenticated) navigate('/auth?next=/');
      }, [auth.isAuthenticated]
  )

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);

      const resumes = (await kv.list('resume:*', true)) as KVItem[];

      const parsedResumes = resumes ?.map((resume) => (
          JSON.parse(resume.value) as Resume
      ))

      console.log("parsedResumes", parsedResumes);

      setResumes(parsedResumes || []);
      setLoadingResumes(false);
    }
    loadResumes();
  }, []);

  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <Navbar/>
    <section className="main-section">
      <div className="page-heading py-16">
        <h1>Get Feedback of your Resume Instantly!</h1>
        {!loadingResumes && resumes?.length === 0 ? (
            <h2>
              No Resumes Found! Upload your first resume to get Feedback instantly.
            </h2> ): (<h2>Simple.Sleek.Stylish</h2>)
        }
      </div>
      {!loadingResumes && (
          <div className="flex flex-col items-center justify-center">
            <img src="/images/resume-scan-2.gif" className="w-[200px]" />
          </div>
      )}


      {!loadingResumes && resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume) => (
                <ResumeCard key={resume.id} resume={resume}/>
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
    </main>;
}
