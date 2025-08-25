import {Link} from "react-router";
interface ResumeCardProps {
    resume: {
        id: string;
        companyName?: string;
        jobTitle?: string;
        imagePath?: string | null;
        feedback?: string | null;
    };
}

export const ResumeCard = ({ resume }: ResumeCardProps) => {
    const { id, companyName, jobTitle, imagePath } = resume;
    const titleId = `resume-title-${id}`;
    return (
        <Link to={`/resume/${id}`} className="resume-card animate-in fade-in duration-1000">
            <div className="resume-card-header">
                <div className="flex flex-col gap-2">
                    {companyName && <h2 className="!text-black font-bold break-words">{companyName}</h2>}
                    {jobTitle && <h3 className="text-lg break-words text-gray-500">{jobTitle}</h3>}
                    {!companyName && !jobTitle && <h2 className="!text-black font-bold">Resume</h2>}
                </div>
            </div>
        </Link>
    )
}
