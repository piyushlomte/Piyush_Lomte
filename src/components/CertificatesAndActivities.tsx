import { useState, useRef, useEffect, MouseEvent, TouchEvent } from "react";
import "./styles/CertificatesAndActivities.css";
import { FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ActivityItem {
  id: number;
  title: string;
  organization: string;
  date: string;
  image: string;
  description?: string;
}

const itemsData: ActivityItem[] = [
  {
    id: 1,
    title: "Cyber Job Simulation",
    organization: "Deloitte & Forage",
    date: "June 2026",
    image: "/images/cert_deloitte_cyber.png",
    description:
      "Completed Deloitte's virtual cyber security job simulation via Forage, gaining practical exposure to cybersecurity concepts, real-world industry scenarios, and security challenge analysis.",
  },
  {
    id: 2,
    title: "Data Analytics Job Simulation",
    organization: "Deloitte & Forage",
    date: "June 2026",
    image: "/images/cert_deloitte_data_analytics.png",
    description:
      "Completed Deloitte's virtual data analytics simulation via Forage, gaining practical experience in data analysis, forensic technology, and real-world business decision making.",
  },
  {
    id: 3,
    title: "Android Developer Virtual Internship",
    organization: "Google for Developers & AICTE EduSkills",
    date: "Jan – Mar 2025",
    image: "/images/cert_android_google.png",
    description:
      "10-week comprehensive Android development program supported by Google for Developers, focusing on modern Android architecture, Kotlin/Java, and collaborative development (Grade A).",
  },
  {
    id: 4,
    title: "Runner-Up – Hacksphere 2.0 Hackathon",
    organization: "RCOEM Nagpur & Unstop",
    date: "Mar 2024",
    image: "/images/cert_hacksphere.png",
    description:
      "Led Team Abhiyanta to Runner-Up victory in the Submission Round at Hacksphere 2.0 (RCOEM & Unstop), showcasing innovative problem solving and tech execution.",
  },
  {
    id: 5,
    title: "2nd Runner-Up – HackWhack 3.0 National Hackathon",
    organization: "SBJITMR Nagpur (Technotsav 2026)",
    date: "2026",
    image: "/images/hackwhack_runnerup.png",
    description:
      "Built 'HealthQ' (AI clinical triage & hospital flow) with Team Abhiyanta in an intense 24-hour national hackathon, winning 2nd Runner-Up trophy & certificate.",
  },
  {
    id: 6,
    title: "Technical Head – Rise In SBJIT Chapter",
    organization: "Rise In & Central DAO",
    date: "Aug 2024",
    image: "/images/risein_web3.jpg",
    description:
      "Technical Head driving Web3 initiatives and co-organizing the Farcaster Bharat event on blockchain & DApps with Central DAO at SBJIT.",
  },
  {
    id: 7,
    title: "Smart Contract & Web3 Workshop",
    organization: "Vara Network Nagpur",
    date: "Oct 2024",
    image: "/images/vara_network_workshop.jpg",
    description:
      "Hands-on smart contract development and decentralized application (dApp) architecture workshop on Vara Network blockchain in Nagpur.",
  },
  {
    id: 8,
    title: "Journey to Salesforce – Enterprise Tech Session",
    organization: "Salesforce & SBJITMR",
    date: "Oct 2026",
    image: "/images/salesforce_session.png",
    description:
      "Explored the Salesforce enterprise ecosystem, deep-diving into Apex, SOQL, DML, Lightning Web Components (LWC), automation, and cloud security architecture.",
  },
  {
    id: 9,
    title: "AI Sports & Metaverse Hackathon",
    organization: "OZ Sports Iceland & Arena",
    date: "Oct 2024",
    image: "/images/oz_sports_hackathon.png",
    description:
      "Explored AI-driven sports analytics, metaverse integration, and smart streaming technology with Gudjon Gudjonsson (CEO, OZ Sports Iceland).",
  },
  {
    id: 10,
    title: "Top 10 Finalist – Code League 1.0 Hackathon",
    organization: "GHRCE Nagpur & Team Abhiyanta",
    date: "Feb 2026",
    image: "/images/code_league_hackathon.png",
    description:
      "Pitched 'Chikitsa Smart' (AI healthcare & triage platform) to the panel of judges at GHRCE Nagpur, qualifying for the Final Round and securing a Top 10 position with special praise for UI/UX.",
  },
  {
    id: 11,
    title: "Top 30 Finalist – TECHMENTORX Hackathon",
    organization: "PCE Nagpur & Team Abhiyanta",
    date: "2024",
    image: "/images/techmentorx_hackathon.jpg",
    description:
      "Competed among 70+ engineering teams with Team Abhiyanta, qualifying into Top 30 after Round 1 with high appreciation from HOD and judges for real-world impact.",
  },
  {
    id: 12,
    title: "National Service Scheme (NSS) Volunteer",
    organization: "Ministry of Youth Affairs & Sports, Govt of India",
    date: "2023 – 2025",
    image: "/images/cert_nss_volunteer.png",
    description:
      "Awarded Certificate of Service by RTM Nagpur University & Government of India for 2 years of active social service, community impact projects, and leadership in NSS Special Camps.",
  },
  {
    id: 13,
    title: "Community Clean-Up Drives & Social Service",
    organization: "NSS Cell & SBJITMR",
    date: "2023 – 2025",
    image: "/images/nss_cleanup_drive.jpg",
    description:
      "Led community clean-up and environmental drives at Matoshree Vriddhashram (Adasa, Nagpur) to promote public sanitation, environmental awareness, and civic responsibility.",
  },
  {
    id: 14,
    title: "Certificate of Appreciation – Community Service",
    organization: "Nagpur Police (CP Dr. Ravinder Singal, IPS)",
    date: "Sept 2024",
    image: "/images/cert_nagpur_police.png",
    description:
      "Honored with a Certificate of Appreciation by Commissioner of Police Dr. Ravinder Singal (IPS) for exemplary voluntary contributions to anti-drug awareness, road safety campaigns, and community welfare.",
  },
  {
    id: 15,
    title: "Community Volunteer – Nagpur Police Outreach",
    organization: "Nagpur Police & CP Dr. Ravinder Singal (IPS)",
    date: "Sept 2024",
    image: "/images/nagpur_police_campaign.png",
    description:
      "Contributed to community outreach initiatives alongside Nagpur Police under Commissioner Dr. Ravinder Singal (IPS), spearheading anti-drug awareness and road safety campaigns for youth and citizens.",
  },
];

const CertificatesAndActivities = () => {
  const [selectedItem, setSelectedItem] = useState<ActivityItem | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const ringRef = useRef<HTMLDivElement>(null);
  const rotationYRef = useRef<number>(0);
  const targetRotationYRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const isModalOpenRef = useRef<boolean>(false);

  const startXRef = useRef<number>(0);
  const startRotationRef = useRef<number>(0);
  const totalMovedRef = useRef<number>(0);
  const requestRef = useRef<number | null>(null);

  const totalItems = itemsData.length;
  const angleStep = 360 / Math.max(totalItems, 1);

  // Adjusted radius for compact cylinder and cards (170px width)
  const radius = Math.max(200, Math.round(88 / Math.tan(Math.PI / Math.max(totalItems, 1))));

  useEffect(() => {
    isModalOpenRef.current = selectedItem !== null;
  }, [selectedItem]);

  // Keyboard Escape key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedItem(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Scroll-linked smooth cylinder rotation synced with page scroll velocity
  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: ".activities-certs-section",
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        if (!isDraggingRef.current && !isModalOpenRef.current) {
          const velocity = self.getVelocity();
          if (Math.abs(velocity) > 5) {
            targetRotationYRef.current -= velocity * 0.006;
          }
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  // Hardware-Accelerated 60fps Animation Loop with Buttery Lerp Smoothing
  useEffect(() => {
    const updateRotation = () => {
      if (!isDraggingRef.current && !isModalOpenRef.current) {
        targetRotationYRef.current -= 0.16;
      }

      rotationYRef.current += (targetRotationYRef.current - rotationYRef.current) * 0.09;

      if (ringRef.current) {
        ringRef.current.style.transform = `rotateY(${rotationYRef.current}deg)`;
      }

      requestRef.current = requestAnimationFrame(updateRotation);
    };

    requestRef.current = requestAnimationFrame(updateRotation);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  // Drag Handlers
  const handleDragStart = (clientX: number) => {
    isDraggingRef.current = true;
    setIsDragging(true);
    startXRef.current = clientX;
    startRotationRef.current = targetRotationYRef.current;
    totalMovedRef.current = 0;
  };

  const handleDragMove = (clientX: number) => {
    if (!isDraggingRef.current) return;
    const deltaX = clientX - startXRef.current;
    totalMovedRef.current = Math.abs(deltaX);
    targetRotationYRef.current = startRotationRef.current + deltaX * 0.45;
  };

  const handleDragEnd = () => {
    isDraggingRef.current = false;
    setIsDragging(false);
  };

  // Mouse Events
  const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    handleDragStart(e.clientX);
  };

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    handleDragMove(e.clientX);
  };

  // Touch Events
  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      handleDragStart(e.touches[0].clientX);
    }
  };

  const onTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      handleDragMove(e.touches[0].clientX);
    }
  };

  const handleRotateStep = (direction: "left" | "right") => {
    const step = direction === "left" ? angleStep : -angleStep;
    targetRotationYRef.current += step;
  };

  const handleCardClick = (item: ActivityItem) => {
    if (totalMovedRef.current < 10) {
      setSelectedItem(item);
    }
  };

  return (
    <section className="activities-certs-section" id="activities-certs">
      <div className="section-container activities-certs-container">
        {/* Centered Title with bottom margin spacing */}
        <div className="activities-header centered-header">
          <h2>
            EXTRACURRICULARS <span>&</span>
            <br /> CERTIFICATIONS
          </h2>
        </div>

        {/* 3D Transparent Glass Cylinder Stage with Side Controls */}
        <div className="cylinder-carousel-container">
          {/* Left Arrow Button */}
          <button
            className="cylinder-nav-btn prev"
            onClick={() => handleRotateStep("left")}
            aria-label="Rotate left"
          >
            <FaArrowLeft />
          </button>

          <div
            className="cylinder-viewport"
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={handleDragEnd}
          >
            {/* Transparent Glass Cylinder Frame Visual */}
            <div className="glass-cylinder-stage">
              <div className="glass-cylinder-top-ring"></div>
              <div className="glass-cylinder-bottom-ring"></div>
              <div className="glass-cylinder-glow"></div>

              {/* Rotatable 3D Ring */}
              <div
                ref={ringRef}
                className={`cylinder-ring ${isDragging ? "dragging" : ""}`}
              >
                {itemsData.map((item, index) => {
                  const cardAngle = index * angleStep;

                  return (
                    <div
                      key={item.id}
                      className="cylinder-card"
                      style={{
                        transform: `rotateY(${cardAngle}deg) translateZ(${radius}px)`,
                      }}
                      onClick={() => handleCardClick(item)}
                    >
                      <div className="card-glass-body">
                        <div className="card-image-wrapper">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="card-image"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "/images/placeholder.webp";
                            }}
                          />
                        </div>

                        <div className="card-content">
                          <div className="card-meta">
                            <span className="card-org">{item.organization}</span>
                            <span className="card-date">{item.date}</span>
                          </div>

                          <h3 className="card-title">{item.title}</h3>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Arrow Button */}
          <button
            className="cylinder-nav-btn next"
            onClick={() => handleRotateStep("right")}
            aria-label="Rotate right"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>

      {/* Expanded Container Preview Overlay - Automatically returns to position on mouse leave */}
      {selectedItem && (
        <div
          className="fullscreen-overlay"
          onClick={() => setSelectedItem(null)}
          onMouseLeave={() => setSelectedItem(null)}
        >
          <button
            className="fullscreen-close-btn"
            onClick={() => setSelectedItem(null)}
            aria-label="Close preview"
          >
            <FaTimes />
          </button>

          <div
            className="fullscreen-container"
            onClick={(e) => e.stopPropagation()}
            onMouseLeave={() => setSelectedItem(null)}
          >
            <img
              src={selectedItem.image}
              alt={selectedItem.title}
              className="fullscreen-image"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "/images/placeholder.webp";
              }}
            />
            <div className="fullscreen-caption">
              <h3>{selectedItem.title}</h3>
              <p>
                {selectedItem.organization} • {selectedItem.date}
              </p>
              {selectedItem.description && (
                <p className="fullscreen-description">{selectedItem.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CertificatesAndActivities;
