import { useEffect, useRef } from "react";
import "./styles/WhatIDo.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WhatIDo = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };
  useEffect(() => {
    if (ScrollTrigger.isTouch) {
      containerRef.current.forEach((container) => {
        if (container) {
          container.classList.remove("what-noTouch");
          container.addEventListener("click", () => handleClick(container));
        }
      });
    }
    return () => {
      containerRef.current.forEach((container) => {
        if (container) {
          container.removeEventListener("click", () => handleClick(container));
        }
      });
    };
  }, []);
  return (
    <div className="whatIDO">
      <div className="what-box">
        <h2 className="title">
          <div>
            W<span className="hat-h2">HAT</span>
          </div>
          <div>
            I<span className="do-h2"> DO</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
              <line
                x1="100%"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
            </svg>
          </div>
          {/* Pillar 1: Full-Stack Web Applications */}
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 0)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>

            <div className="what-content-in">
              <h3>FULL-STACK WEB</h3>
              <h4>Focus & Architecture</h4>
              <p>
                Building end-to-end scalable web applications using React,
                Next.js, FastAPI, Node.js, and PostgreSQL with modern UI/UX and
                secure REST APIs.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">React JS</div>
                <div className="what-tags">Next.js</div>
                <div className="what-tags">FastAPI</div>
                <div className="what-tags">Node.js</div>
                <div className="what-tags">TypeScript</div>
                <div className="what-tags">PostgreSQL</div>
                <div className="what-tags">Tailwind CSS</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>

          {/* Pillar 2: IoT & Embedded Systems */}
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 1)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>

            <div className="what-content-in">
              <h3>IoT & EMBEDDED</h3>
              <h4>Hardware & Mesh Networks</h4>
              <p>
                Designing off-grid decentralized emergency SOS systems,
                multi-hop LoRa mesh networks, real-time GPS tracking, and
                ESP32-S3 microcontroller firmware.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">ESP32-S3</div>
                <div className="what-tags">LoRa SX1262</div>
                <div className="what-tags">C++</div>
                <div className="what-tags">Flutter</div>
                <div className="what-tags">BLE</div>
                <div className="what-tags">GPS</div>
                <div className="what-tags">MQTT</div>
                <div className="what-tags">Sensors</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>

          {/* Pillar 3: AI & Cloud Integration */}
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 2)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>

            <div className="what-content-in">
              <h3>AI & CLOUD</h3>
              <h4>Intelligent Services</h4>
              <p>
                Integrating intelligent recommendation models, resume parsing,
                and real-time AI chatbots using OpenAI, Groq, and Gemini APIs.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">OpenAI API</div>
                <div className="what-tags">Groq API</div>
                <div className="what-tags">Gemini API</div>
                <div className="what-tags">Supabase</div>
                <div className="what-tags">Vercel</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;

function handleClick(container: HTMLDivElement) {
  container.classList.toggle("what-content-active");
  container.classList.remove("what-sibling");
  if (container.parentElement) {
    const siblings = Array.from(container.parentElement.children);

    siblings.forEach((sibling) => {
      if (sibling !== container) {
        sibling.classList.remove("what-content-active");
        sibling.classList.toggle("what-sibling");
      }
    });
  }
}
