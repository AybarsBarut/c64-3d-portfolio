/**
 * Client-side CV Downloader for Fahri Aybars Barut
 * Generates downloadable PDF and DOCX files dynamically.
 */

export const CV_DATA = {
  name: "Fahri Aybars Barut",
  title: "Computer Engineer | Simulation & VR/XR Developer",
  location: "Ankara, Turkey",
  email: "fahriaybarsbarut@gmail.com",
  github: "https://github.com/AybarsBarut",
  linkedin: "https://linkedin.com/in/fahriaybarsbarut1853",
  summary: `Passionate Computer Engineering graduate focused on real-time systems, graphics programming, simulation engineering, and immersive VR/XR application development. Experienced in custom C++ engine development, Unity zero-allocation architectures, Unreal Engine 5 simulations, and LLM-powered RAG AI systems.`,
  education: [
    {
      degree: "B.S. Computer Engineering (Bilgisayar Mühendisliği)",
      institution: "Sivas Cumhuriyet Üniversitesi Mühendislik Fakültesi",
      details: "Specialized in Real-time Systems, Graphics Programming, and Computer Simulation Architecture.",
    },
  ],
  skills: [
    "Languages: C++, C#, Python, TypeScript, SQL, Kotlin, PowerShell",
    "Engines & Graphics: Unreal Engine 5, Unity 3D, OpenGL, SDL2, ECS Architecture",
    "VR/XR & Simulation: OpenXR, Zero-GC Diagnostics, Monte Carlo Physics",
    "AI & Data: LangChain, Vector Search (RAG), FastAPI, Data Pipelines",
  ],
  certificates: [
    {
      name: "Artificial Intelligence Fundamentals",
      issuer: "IBM",
      date: "Jul 2026",
      url: "https://www.credly.com/badges/0387ce1f-7b17-456f-8447-1ee63e9a4e0d",
      displayUrl: "credly.com/badges/0387ce1f-7b17-456f-8447-1ee63e9a4e0d",
    },
    {
      name: "C++ Advanced",
      issuer: "Cisco",
      date: "May 2026",
      url: "https://www.credly.com/badges/e3fd7bf4-1a87-4a69-a980-6851f18b52ce",
      displayUrl: "credly.com/badges/e3fd7bf4-1a87-4a69-a980-6851f18b52ce",
    },
    {
      name: "LFS101: Introduction to Linux",
      issuer: "The Linux Foundation",
      date: "May 2026",
      url: "https://ti-user-certificates.s3.amazonaws.com/e0df7fbf-a057-42af-8a1f-590912be5460/2421a6bd-14d8-4a49-bf23-6761173d3824-aybars-barut-c6a11912-7e73-4976-8e27-50d72f2ebb3c-certificate.pdf",
      displayUrl: "linuxfoundation.org/lfs101",
    },
    {
      name: "Model Context Protocol: Advanced Topics",
      issuer: "Anthropic",
      date: "Apr 2026",
      url: "https://verify.skilljar.com/c/ambpyq92zawf",
      displayUrl: "verify.skilljar.com/c/ambpyq92zawf",
    },
    {
      name: "Networking Basics",
      issuer: "Cisco",
      date: "May 2026",
      url: "https://www.credly.com/badges/ed18adc3-b434-46b4-a316-7799e4024489",
      displayUrl: "credly.com/badges/ed18adc3-b434-46b4-a316-7799e4024489",
    },
    {
      name: "Data Fundamentals",
      issuer: "IBM",
      date: "May 2026",
      url: "https://www.credly.com/badges/77a3e590-eec3-4ced-8496-ab86c62281af",
      displayUrl: "credly.com/badges/77a3e590-eec3-4ced-8496-ab86c62281af",
    },
    {
      name: "Endpoint Security",
      issuer: "Cisco",
      date: "May 2026",
      url: "https://www.credly.com/badges/cfc7b96f-0c5a-4373-a715-194571f5d083",
      displayUrl: "credly.com/badges/cfc7b96f-0c5a-4373-a715-194571f5d083",
    },
    {
      name: "Introduction to Cybersecurity",
      issuer: "Cisco",
      date: "Apr 2026",
      url: "https://www.credly.com/badges/29885bb6-4b12-45c2-ae0d-4d4c18ab7180",
      displayUrl: "credly.com/badges/29885bb6-4b12-45c2-ae0d-4d4c18ab7180",
    },
  ],
  projects: [
    {
      title: "Archura Game Engine (SDL2 / C++)",
      tech: "C++ | OpenGL | SDL2 | ECS",
      desc: "Custom 3D game engine featuring entity component system architecture, PBR rendering pipeline, and custom memory management.",
      link: "https://github.com/AybarsBarut/Archura-Game-Engine-SDL",
    },
    {
      title: "Anayasal RAG AI System",
      tech: "Python | LangChain | Vector Embeddings | FastAPI",
      desc: "Domain-specific Retrieval-Augmented Generation AI system trained on the Turkish Constitution for instant legal reference.",
      link: "https://github.com/AybarsBarut/AnayasalRAGai",
    },
    {
      title: "Archura SyncGuard",
      tech: "PowerShell | GitHub API | Windows Automation",
      desc: "Reusable PowerShell GitHub version controller and Windows auto updater with SemVer checks and zip sync.",
      link: "https://github.com/AybarsBarut/Archura-SyncGuard",
    },
    {
      title: "Archura AirPrint Receiver for Android",
      tech: "Kotlin | Jetpack Compose | mDNS / IPP",
      desc: "Local-first AirPrint receiver for Android allowing wireless photo and document printing from iOS & Mac.",
      link: "https://github.com/AybarsBarut/Archura-Airprint-Reciever-For-Android",
    },
  ],
};

/**
 * Downloads CV as PDF (Prints via HTML window with strict 1-page layout & zero headers/footers)
 */
export function downloadCVPdf() {
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${CV_DATA.name} - Curriculum Vitae</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 6mm 10mm;
    }
    @media print {
      html, body {
        margin: 0 !important;
        padding: 0 !important;
        background: #ffffff !important;
      }
      @page { margin: 6mm 10mm; }
    }
    * { box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      margin: 0;
      padding: 0;
      color: #0f172a;
      line-height: 1.25;
      font-size: 10px;
    }
    h1 {
      color: #1e1b4b;
      margin: 0 0 1px 0;
      font-size: 19px;
      letter-spacing: -0.5px;
    }
    .subtitle {
      color: #4338ca;
      font-weight: 700;
      font-size: 11.5px;
      margin-bottom: 3px;
    }
    .contact {
      font-size: 9.5px;
      color: #475569;
      margin-bottom: 5px;
      border-bottom: 1.5px solid #6366f1;
      padding-bottom: 3px;
    }
    .contact a { color: #3730a3; text-decoration: none; font-weight: 600; }
    .section-title {
      font-size: 10.5px;
      color: #1e1b4b;
      text-transform: uppercase;
      font-weight: 800;
      letter-spacing: 0.8px;
      margin-top: 6px;
      margin-bottom: 2px;
      border-bottom: 1px solid #cbd5e1;
      padding-bottom: 1px;
    }
    .summary-text { margin: 0 0 3px 0; color: #334155; }
    .project-item { margin-bottom: 4px; }
    .project-title { font-weight: 700; font-size: 10.5px; color: #0f172a; }
    .tech-stack { font-size: 9px; color: #4f46e5; font-weight: 600; }
    .project-desc { color: #334155; }
    ul { margin: 1px 0 3px 0; padding-left: 14px; }
    li { margin-bottom: 1px; color: #334155; }
    .cert-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2px 10px; margin-top: 2px; }
    .cert-item { color: #1e293b; font-size: 9.5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .cert-link { color: #4f46e5; font-weight: 600; text-decoration: none; }
    .edu-item { margin-bottom: 2px; }
  </style>
</head>
<body>
  <h1>${CV_DATA.name}</h1>
  <div class="subtitle">${CV_DATA.title}</div>
  <div class="contact">
    📍 ${CV_DATA.location} | ✉️ ${CV_DATA.email} | 
    🔗 GitHub: <a href="${CV_DATA.github}">${CV_DATA.github}</a> | 
    LinkedIn: <a href="${CV_DATA.linkedin}">${CV_DATA.linkedin}</a>
  </div>

  <div class="section-title">Professional Summary</div>
  <p class="summary-text">${CV_DATA.summary}</p>

  <div class="section-title">Education</div>
  ${CV_DATA.education.map(e => `
    <div class="edu-item">
      <strong>${e.degree}</strong> — <em>${e.institution}</em> <br>
      <span style="color:#64748b;">${e.details}</span>
    </div>
  `).join('')}

  <div class="section-title">Technical Capabilities & Skills</div>
  <ul>
    ${CV_DATA.skills.map(s => `<li>${s}</li>`).join('')}
  </ul>

  <div class="section-title">Certifications & Credentials (${CV_DATA.certificates.length})</div>
  <div class="cert-grid">
    ${CV_DATA.certificates.map(c => `
      <div class="cert-item">
        📜 <strong>${c.name}</strong> (${c.issuer}) 
        <a class="cert-link" href="${c.url}" target="_blank">🔗 Verify</a>
      </div>
    `).join('')}
  </div>

  <div class="section-title">Key Engineering Projects</div>
  ${CV_DATA.projects.map(p => `
    <div class="project-item">
      <div class="project-title">${p.title} <span class="tech-stack">(${p.tech})</span></div>
      <div class="project-desc">${p.desc}</div>
    </div>
  `).join('')}

  <script>
    window.onload = function() {
      window.print();
    }
  </script>
</body>
</html>
  `;

  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const printWindow = window.open(url, '_blank');
  if (!printWindow) {
    const a = document.createElement('a');
    a.href = url;
    a.download = `Fahri_Aybars_Barut_CV.html`;
    a.click();
  }
}

/**
 * Downloads CV as Word DOCX File format (valid OpenXML / Word Doc)
 */
export function downloadCVDocx() {
  const docxContent = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<?mso-application progid="Word.Document"?>
<w:wordDocument xmlns:w="http://schemas.microsoft.com/office/word/2003/wordml">
  <w:body>
    <w:p>
      <w:r><w:rPr><w:b/><w:sz w:val="36"/><w:color w:val="1E1B4B"/></w:rPr><w:t>${CV_DATA.name}</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:rPr><w:b/><w:sz w:val="24"/><w:color w:val="4338CA"/></w:rPr><w:t>${CV_DATA.title}</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:rPr><w:italic/><w:color w:val="555555"/></w:rPr><w:t>Location: ${CV_DATA.location} | Email: ${CV_DATA.email} | GitHub: ${CV_DATA.github} | LinkedIn: ${CV_DATA.linkedin}</w:t></w:r>
    </w:p>
    <w:p><w:r><w:t></w:t></w:r></w:p>
    
    <w:p>
      <w:r><w:rPr><w:b/><w:sz w:val="26"/><w:color w:val="1E1B4B"/></w:rPr><w:t>PROFESSIONAL SUMMARY</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:t>${CV_DATA.summary}</w:t></w:r>
    </w:p>
    <w:p><w:r><w:t></w:t></w:r></w:p>

    <w:p>
      <w:r><w:rPr><w:b/><w:sz w:val="26"/><w:color w:val="1E1B4B"/></w:rPr><w:t>EDUCATION</w:t></w:r>
    </w:p>
    ${CV_DATA.education.map(e => `
    <w:p>
      <w:r><w:rPr><w:b/></w:rPr><w:t>${e.degree} - ${e.institution}</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:rPr><w:italic/></w:rPr><w:t>${e.details}</w:t></w:r>
    </w:p>
    `).join('')}
    <w:p><w:r><w:t></w:t></w:r></w:p>

    <w:p>
      <w:r><w:rPr><w:b/><w:sz w:val="26"/><w:color w:val="1E1B4B"/></w:rPr><w:t>TECHNICAL CAPABILITIES &amp; SKILLS</w:t></w:r>
    </w:p>
    ${CV_DATA.skills.map(s => `
    <w:p>
      <w:r><w:t>• ${s}</w:t></w:r>
    </w:p>
    `).join('')}
    <w:p><w:r><w:t></w:t></w:r></w:p>

    <w:p>
      <w:r><w:rPr><w:b/><w:sz w:val="26"/><w:color w:val="1E1B4B"/></w:rPr><w:t>CERTIFICATIONS &amp; CREDENTIALS (${CV_DATA.certificates.length})</w:t></w:r>
    </w:p>
    ${CV_DATA.certificates.map(c => `
    <w:p>
      <w:r><w:rPr><w:b/></w:rPr><w:t>${c.name} (${c.issuer}, ${c.date})</w:t></w:r>
      <w:r><w:t> - Link: ${c.url}</w:t></w:r>
    </w:p>
    `).join('')}
    <w:p><w:r><w:t></w:t></w:r></w:p>

    <w:p>
      <w:r><w:rPr><w:b/><w:sz w:val="26"/><w:color w:val="1E1B4B"/></w:rPr><w:t>KEY ENGINEERING PROJECTS</w:t></w:r>
    </w:p>
    ${CV_DATA.projects.map(p => `
    <w:p>
      <w:r><w:rPr><w:b/></w:rPr><w:t>${p.title}</w:t></w:r>
      <w:r><w:rPr><w:color w:val="4F46E5"/></w:rPr><w:t> (${p.tech})</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:t>${p.desc}</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:rPr><w:italic/></w:rPr><w:t>URL: ${p.link}</w:t></w:r>
    </w:p>
    `).join('')}
  </w:body>
</w:wordDocument>
  `;

  const blob = new Blob([docxContent], { type: 'application/msword' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Fahri_Aybars_Barut_CV.doc`;
  a.click();
}
