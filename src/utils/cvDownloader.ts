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
  skills: [
    "Languages: C++, C#, Python, TypeScript, SQL",
    "Engines & Graphics: Unreal Engine 5, Unity 3D, OpenGL, SDL2, ECS Architecture",
    "VR/XR & Simulation: OpenXR, Zero-GC Diagnostics, Monte Carlo Physics",
    "AI & Data: LangChain, Vector Search (RAG), FastAPI, Data Pipelines",
    "Certifications: Cisco C++ Advanced, Cisco Networking & Cybersecurity, IBM SQL & Data",
  ],
  projects: [
    {
      title: "Archura Engine",
      tech: "C++ | OpenGL | SDL2 | ECS",
      desc: "Custom 3D game engine featuring entity component system architecture, PBR rendering pipeline, and custom memory management.",
      link: "https://github.com/AybarsBarut",
    },
    {
      title: "Anayasal RAG AI System",
      tech: "Python | LangChain | Vector Embeddings | FastAPI",
      desc: "Domain-specific Retrieval-Augmented Generation AI system trained on the Turkish Constitution for instant legal reference.",
      link: "https://github.com/AybarsBarut",
    },
    {
      title: "Unity Zero-GC Runtime Diagnostics",
      tech: "Unity 3D | C# | Profiler API",
      desc: "High-performance event system and real-time profiler overlay with zero GC allocations during execution loop.",
      link: "https://github.com/AybarsBarut",
    },
    {
      title: "Plasma Logic Simulation",
      tech: "Python | Monte Carlo | Computational Physics",
      desc: "Educational simulation modeling plasma discharge physics to construct virtual digital logic gates.",
      link: "https://github.com/AybarsBarut",
    },
  ],
  education: [
    {
      degree: "B.S. Computer Engineering",
      institution: "Computer Engineering Department",
      details: "Specialized in Computer Graphics, Simulation, and Systems Programming",
    },
  ],
};

/**
 * Downloads CV as PDF (Prints via HTML window or generates styled printable document)
 */
export function downloadCVPdf() {
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${CV_DATA.name} - Curriculum Vitae</title>
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; margin: 40px; color: #1a1a1a; line-height: 1.6; }
    h1 { color: #1e1b4b; margin-bottom: 4px; font-size: 28px; }
    .subtitle { color: #4338ca; font-weight: bold; font-size: 16px; margin-bottom: 8px; }
    .contact { font-size: 13px; color: #555; margin-bottom: 20px; border-bottom: 2px solid #6366f1; padding-bottom: 12px; }
    .section-title { font-size: 18px; color: #1e1b4b; text-transform: uppercase; letter-spacing: 1px; margin-top: 24px; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; }
    .project-item { margin-bottom: 14px; }
    .project-title { font-weight: bold; font-size: 15px; color: #0f172a; }
    .tech-stack { font-size: 12px; color: #4f46e5; font-weight: bold; }
    ul { margin-top: 6px; padding-left: 20px; }
    li { margin-bottom: 4px; }
    @media print {
      body { margin: 0; }
    }
  </style>
</head>
<body>
  <h1>${CV_DATA.name}</h1>
  <div class="subtitle">${CV_DATA.title}</div>
  <div class="contact">
    📍 ${CV_DATA.location} | ✉️ ${CV_DATA.email} <br>
    🔗 GitHub: ${CV_DATA.github} | LinkedIn: ${CV_DATA.linkedin}
  </div>

  <div class="section-title">Summary</div>
  <p>${CV_DATA.summary}</p>

  <div class="section-title">Technical Capabilities & Skills</div>
  <ul>
    ${CV_DATA.skills.map(s => `<li>${s}</li>`).join('')}
  </ul>

  <div class="section-title">Key Engineering Projects</div>
  ${CV_DATA.projects.map(p => `
    <div class="project-item">
      <div class="project-title">${p.title} <span class="tech-stack">(${p.tech})</span></div>
      <div>${p.desc}</div>
    </div>
  `).join('')}

  <div class="section-title">Education</div>
  ${CV_DATA.education.map(e => `
    <div>
      <strong>${e.degree}</strong> - ${e.institution} <br>
      <em>${e.details}</em>
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
    // Fallback direct download as HTML/PDF printable
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
      <w:r><w:rPr><w:italic/><w:color w:val="555555"/></w:rPr><w:t>Location: ${CV_DATA.location} | GitHub: ${CV_DATA.github} | LinkedIn: ${CV_DATA.linkedin}</w:t></w:r>
    </w:p>
    <w:p><w:r><w:t></w:t></w:r></w:p>
    
    <w:p>
      <w:r><w:rPr><w:b/><w:sz w:val="26"/><w:color w:val="1E1B4B"/></w:rPr><w:t>SUMMARY</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:t>${CV_DATA.summary}</w:t></w:r>
    </w:p>

    <w:p>
      <w:r><w:rPr><w:b/><w:sz w:val="26"/><w:color w:val="1E1B4B"/></w:rPr><w:t>TECHNICAL SKILLS</w:t></w:r>
    </w:p>
    ${CV_DATA.skills.map(s => `<w:p><w:r><w:t>• ${s}</w:t></w:r></w:p>`).join('')}

    <w:p>
      <w:r><w:rPr><w:b/><w:sz w:val="26"/><w:color w:val="1E1B4B"/></w:rPr><w:t>KEY PROJECTS</w:t></w:r>
    </w:p>
    ${CV_DATA.projects.map(p => `
      <w:p>
        <w:r><w:rPr><w:b/></w:rPr><w:t>${p.title} (${p.tech})</w:t></w:r>
      </w:p>
      <w:p>
        <w:r><w:t>${p.desc}</w:t></w:r>
      </w:p>
    `).join('')}

    <w:p>
      <w:r><w:rPr><w:b/><w:sz w:val="26"/><w:color w:val="1E1B4B"/></w:rPr><w:t>EDUCATION</w:t></w:r>
    </w:p>
    ${CV_DATA.education.map(e => `
      <w:p>
        <w:r><w:rPr><w:b/></w:rPr><w:t>${e.degree} - ${e.institution}</w:t></w:r>
      </w:p>
      <w:p>
        <w:r><w:t>${e.details}</w:t></w:r>
      </w:p>
    `).join('')}
  </w:body>
</w:wordDocument>`;

  const blob = new Blob([docxContent], { type: 'application/msword' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Fahri_Aybars_Barut_CV.docx`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
