import { SplitText } from "gsap-trial/SplitText";
import gsap from "gsap";
import { smoother } from "../Navbar";

export function initialFX() {
  document.body.style.overflowY = "auto";
  smoother.paused(false);
  document.getElementsByTagName("main")[0].classList.add("main-active");
  gsap.to("body", {
    backgroundColor: "#0b080c",
    duration: 0.5,
    delay: 1,
  });

  // Intro text entrance animation
  var introText = new SplitText(
    [".landing-info h3", ".landing-intro h2", ".landing-intro h1"],
    {
      type: "words,chars",
      wordsClass: "split-word",
    }
  );
  gsap.set(".split-word", { display: "inline-block", marginRight: "0.35em" });
  gsap.fromTo(
    introText.chars,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      duration: 1.0,
      ease: "power3.out",
      y: 0,
      stagger: 0.02,
      delay: 0.2,
    }
  );

  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.0,
      ease: "power1.inOut",
      delay: 0.1,
    }
  );

  // Setup SplitText for the 2 rotating tagline pairs
  let TextProps = { type: "chars", charsClass: "split-h2" };

  var pair1Line1 = new SplitText(".landing-h2-1", TextProps); // "Full-Stack"
  var pair1Line2 = new SplitText(".landing-h2-info", TextProps); // "Developer"
  var pair2Line1 = new SplitText(".landing-h2-2", TextProps); // "IoT & Embedded"
  var pair2Line2 = new SplitText(".landing-h2-info-1", TextProps); // "Systems"

  const pair1Chars = [...pair1Line1.chars, ...pair1Line2.chars];
  const pair2Chars = [...pair2Line1.chars, ...pair2Line2.chars];

  // Ensure inline-block so transform translateY works reliably in all browsers
  gsap.set([...pair1Chars, ...pair2Chars], { display: "inline-block" });

  // Initial state: Pair 1 visible, Pair 2 hidden below
  gsap.set(pair1Chars, { opacity: 1, y: 0 });
  gsap.set(pair2Chars, { opacity: 0, y: 40 });

  // Entrance animation for Pair 1
  gsap.fromTo(
    pair1Chars,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.02,
      delay: 0.4,
      onComplete: () => {
        startLoop(pair1Chars, pair2Chars);
      },
    }
  );
}

function startLoop(pair1Chars: Element[], pair2Chars: Element[]) {
  const tl = gsap.timeline({ repeat: -1 });

  tl.to({}, { duration: 3.5 })
    // Move Pair 1 OUT (up) and Pair 2 IN (from below)
    .to(pair1Chars, {
      opacity: 0,
      y: -40,
      duration: 0.7,
      ease: "power3.inOut",
      stagger: 0.015,
    })
    .to(
      pair2Chars,
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.inOut",
        stagger: 0.015,
      },
      "<"
    )
    .to({}, { duration: 3.5 })
    // Move Pair 2 OUT (up) and Pair 1 IN (from below)
    .to(pair2Chars, {
      opacity: 0,
      y: -40,
      duration: 0.7,
      ease: "power3.inOut",
      stagger: 0.015,
    })
    .to(
      pair1Chars,
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.inOut",
        stagger: 0.015,
      },
      "<"
    )
    // Clean reset for next loop iteration
    .set(pair1Chars, { y: 0 })
    .set(pair2Chars, { y: 40 });
}
