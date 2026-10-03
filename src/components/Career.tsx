import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          MY EDUCATION <span>&</span>
          <br /> QUALIFICATION
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Tech in Computer Science & Engineering</h4>
                <h5>S.B. Jain Institute of Technology, Management & Research, Nagpur</h5>
              </div>
              <h4>Aug 2023 – Present</h4>
            </div>
            <p>CGPA: 7.63 </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Higher Secondary (XII)</h4>
                <h5>Dinbai Vidyalaya & Jr College, Digras, Yavatmal</h5>
              </div>
              <h4>Feb 2022</h4>
            </div>
            <p>Percentage: 73.17 %</p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Secondary School (X)</h4>
                <h5>R F Mehta Rashtriya Vidyalaya, Digras, Yavatmal</h5>
              </div>
              <h4>Mar 2020</h4>
            </div>
            <p>Percentage: 92.20 %</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;



