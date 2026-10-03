import { useRef, useEffect } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";

interface Project {
  index: number;
  title: string;
  category: string;
  description: string;
  tools: string;
  link: string;
  image: string;
}

const PROJECTS: Project[] = [
  {
    index: 1,
    title: "HealthQ – Next-Gen Clinical AI Platform",
    category: "AI / Healthcare (HackWhack 3.0 National 2nd Runner-Up)",
    description:
      "Comprehensive, modern healthcare platform designed to streamline patient experience, empower medical providers, and intelligently manage hospital traffic using AI medical triage, wait-time forecasting, and smart scheduling.",
    tools:
      "Next.js, React, FastAPI, Gemini AI, PostgreSQL, Tailwind CSS, REST APIs",
    link: "https://health-q-three.vercel.app/",
    image: "/images/healthq.png",
  },
  {
    index: 2,
    title: "InternBridge AI – Skill-Verified Internship Ecosystem",
    category: "AI / Full Stack",
    description:
      "AI-powered internship ecosystem featuring automated skill verification, smart resume parsing, GitHub repository analysis, vector-based candidate matching, and automated applicant tracking.",
    tools:
      "Next.js 14, TypeScript, FastAPI, Supabase, Tailwind CSS, Gemini 1.5 Flash, GitHub API, Recharts",
    link: "https://internbridge-ai.vercel.app/",
    image: "/images/internbridge.png",
  },
  {
    index: 3,
    title: "Piyush Lomte Portfolio Website (v1)",
    category: "Web / Portfolio",
    description:
      "Personal responsive portfolio website showcasing technical projects, skills, certifications, and web development work with SEO-friendly structure and GitHub Pages deployment.",
    tools: "HTML5, CSS3, JavaScript, Mobirise, sitemap.xml, GitHub Pages",
    link: "https://piyushlomte.github.io",
    image: "/images/portfolio_v1.png",
  },
  {
    index: 4,
    title: "Software Quality Audit Checklist Manager",
    category: "QA / Software Engineering",
    description:
      "ISO/IEC 25010-aligned software quality governance platform with weighted compliance scoring, automated milestone verdicts (Approved/Conditional/Rejected), Corrective Action Plan (CAP) tracking, and executive PDF reporting.",
    tools:
      "React 19, Vite 8, Tailwind CSS v4, Chart.js, Lucide Icons, html2pdf.js, LocalStorage, Render",
    link: "https://seqa-audit-manager.onrender.com/",
    image: "/images/seqa_audit.png",
  },
  {
    index: 5,
    title: "Chikitsa Smart – Smart Healthcare & AI Disease Prediction",
    category: "AI / Healthcare (Hackathon Top 10 Finalist)",
    description:
      "Healthcare web application developed by Team Abhiyanta, qualifying as a Top 10 Finalist at Code League 1.0 Hackathon (GHRCE Nagpur). Features AI symptom-based disease prediction, live hospital & admin dashboard KPIs, dynamic priority queue management, smart doctor scheduling, emergency surfacing, Twilio SMS/Email alerts, and AI helpdesk.",
    tools:
      "Python, Flask, SQLite, HTML5, CSS3, JavaScript, AI Disease Prediction, Twilio API, Vercel",
    link: "https://chikitsa-smart.vercel.app/",
    image: "/images/chikitsa_smart.png",
  },
];

// Tripled array for seamless infinite looping
const TRIPLED_PROJECTS = [...PROJECTS, ...PROJECTS, ...PROJECTS];

const Work = () => {
  const flexRef = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef<boolean>(false);

  const currentPosRef = useRef<number>(0);
  const targetPosRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const startYRef = useRef<number>(0);
  const startTargetRef = useRef<number>(0);
  const requestRef = useRef<number | null>(null);

  // Measure exact pixel distance for 1 set of 5 cards
  const getOneSetWidth = (): number => {
    if (!flexRef.current) return 0;
    const children = flexRef.current.children;
    if (children.length >= 10) {
      const card0 = children[0].getBoundingClientRect();
      const card5 = children[5].getBoundingClientRect();
      const width = card5.left - card0.left;
      if (width > 100) return width;
    }
    return flexRef.current.scrollWidth / 3;
  };

  useEffect(() => {
    let setWidth = getOneSetWidth();
    if (setWidth > 0) {
      currentPosRef.current = setWidth;
      targetPosRef.current = setWidth;
    }

    const updatePosition = () => {
      if (flexRef.current) {
        const exactSetWidth = getOneSetWidth();

        // Continuous smooth auto-gliding loop
        if (!isPausedRef.current && !isDraggingRef.current) {
          targetPosRef.current += 1.2;
        }

        // Smooth Lerp animation
        currentPosRef.current +=
          (targetPosRef.current - currentPosRef.current) * 0.12;

        // Exact seamless loop wrapping (Zero glitch / zero gap)
        if (exactSetWidth > 0) {
          if (targetPosRef.current >= exactSetWidth * 2) {
            targetPosRef.current -= exactSetWidth;
            currentPosRef.current -= exactSetWidth;
          } else if (targetPosRef.current <= 0) {
            targetPosRef.current += exactSetWidth;
            currentPosRef.current += exactSetWidth;
          }
        }

        flexRef.current.style.transform = `translate3d(${-currentPosRef.current}px, 0, 0)`;
      }

      requestRef.current = requestAnimationFrame(updatePosition);
    };

    requestRef.current = requestAnimationFrame(updatePosition);

    const handleResize = () => {
      const sw = getOneSetWidth();
      if (sw > 0) {
        currentPosRef.current = sw;
        targetPosRef.current = sw;
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  // Strict single-axis wheel listener: process horizontal scroll (deltaX) ONLY
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 2) {
      targetPosRef.current += e.deltaX * 1.2;
    }
  };

  // Drag handlers with strict horizontal axis locking
  const handleDragStart = (clientX: number, clientY: number) => {
    isDraggingRef.current = true;
    startXRef.current = clientX;
    startYRef.current = clientY;
    startTargetRef.current = targetPosRef.current;
  };

  const handleDragMove = (clientX: number, clientY: number) => {
    if (!isDraggingRef.current) return;
    const deltaX = clientX - startXRef.current;
    const deltaY = clientY - startYRef.current;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      targetPosRef.current = startTargetRef.current - deltaX * 1.4;
    }
  };

  const handleDragEnd = () => {
    isDraggingRef.current = false;
  };

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        {/* Centered Header with Gradient Text Effect */}
        <div className="work-header-row centered-header">
          <h2>
            MY WORK <span>&</span> PROJECTS
          </h2>
        </div>

        {/* Viewport framed cleanly within section container */}
        <div
          className="work-slider-viewport"
          onWheel={handleWheel}
          onMouseMove={(e) => handleDragMove(e.clientX, e.clientY)}
          onMouseDown={(e) => handleDragStart(e.clientX, e.clientY)}
          onMouseUp={handleDragEnd}
          onMouseLeave={() => {
            handleDragEnd();
            isPausedRef.current = false;
          }}
          onTouchStart={(e) =>
            e.touches.length > 0 &&
            handleDragStart(e.touches[0].clientX, e.touches[0].clientY)
          }
          onTouchMove={(e) =>
            e.touches.length > 0 &&
            handleDragMove(e.touches[0].clientX, e.touches[0].clientY)
          }
          onTouchEnd={handleDragEnd}
        >
          {/* Infinite Track Container */}
          <div className="work-flex" ref={flexRef}>
            {TRIPLED_PROJECTS.map((project, idx) => (
              <div
                className="work-box"
                key={`${project.index}-${idx}`}
                onMouseEnter={() => (isPausedRef.current = true)}
                onMouseLeave={() => (isPausedRef.current = false)}
              >
                <div className="work-info">
                  <div className="work-title">
                    <div>
                      <h4>{project.title}</h4>
                      <p>{project.category}</p>
                    </div>
                  </div>
                  <p className="work-description">{project.description}</p>
                  <h4>Tools and features</h4>
                  <p>{project.tools}</p>
                </div>
                <WorkImage image={project.image} alt="" link={project.link} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
