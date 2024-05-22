import React from 'react';
import '../css/style.css'; // This goes up one directory level from components

function WelcomePage() {
  return (
    <div>
      <h1>Welcome to the IRF Pre-Admissions and Patient Registry System</h1>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => window.location.href='/register'} style={{ marginRight: '10px' }}>Navigate to the registration</button>
        <button onClick={() => window.location.href='/login'}>Navigate to the login</button>
      </div>
      <section>
        <h2>About IRF Pre-Admissions and Patient Registry System</h2>
        <p>
          The IRF Pre-Admissions and Patient Registry System is designed to streamline the operations
          at the IRF by replacing the existing manual processes used for patient tracking and admissions.
          With this system, staff can manage patient data more efficiently, view real-time updates, and
          make informed decisions with access to comprehensive analytics and reporting tools.
        </p>
      </section>
      <section>
        <h2>About IRF Department</h2>
        <p>
          The IRF Department at Hospital La Concepcion in Mayaguez, Puerto Rico, is dedicated to providing
          high-quality rehabilitative care to patients. This department is a pivotal part of the hospital's
          commitment to excellence in healthcare, focusing on individual patient care and specialized
          rehabilitation treatments.
        </p>
      </section>
    </div>
  );
}

export default WelcomePage;
