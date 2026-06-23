import { Injectable } from '@angular/core';
import { PORTFOLIO } from '../data/portfolio.data';

@Injectable({ providedIn: 'root' })
export class ResumeService {
  async downloadResume(): Promise<void> {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const margin = 18;
    let y = margin;
    const lineHeight = 6;
    const pageWidth = doc.internal.pageSize.getWidth();

    const addLine = (text: string, size = 10, bold = false) => {
      if (y > 280) {
        doc.addPage();
        y = margin;
      }
      doc.setFontSize(size);
      doc.setFont('helvetica', bold ? 'bold' : 'normal');
      const lines = doc.splitTextToSize(text, pageWidth - margin * 2);
      doc.text(lines, margin, y);
      y += lines.length * (lineHeight * (size / 10));
    };

    addLine(PORTFOLIO.name, 22, true);
    addLine(`${PORTFOLIO.title} — ${PORTFOLIO.subtitle}`, 12, true);
    addLine(`${PORTFOLIO.location} | ${PORTFOLIO.phone} | ${PORTFOLIO.email}`, 9);
    y += 4;

    addLine('PROFESSIONAL SUMMARY', 11, true);
    addLine(PORTFOLIO.summary, 9);
    y += 3;

    addLine('TECHNICAL SKILLS', 11, true);
    PORTFOLIO.skills.forEach((cat) => {
      addLine(`${cat.title}: ${cat.items.join(', ')}`, 9);
    });
    y += 3;

    addLine('PROFESSIONAL EXPERIENCE', 11, true);
    PORTFOLIO.experience.forEach((exp) => {
      addLine(`${exp.company} | ${exp.period}`, 10, true);
      exp.projects.forEach((project) => {
        addLine(`Project: ${project.name}`, 9, true);
        project.highlights.forEach((h) => addLine(`• ${h}`, 9));
      });
    });
    y += 3;

    addLine('PROJECTS', 11, true);
    PORTFOLIO.projects.forEach((p) => {
      addLine(`${p.title}: ${p.description}`, 9);
    });
    y += 3;

    addLine('EDUCATION', 11, true);
    addLine(`${PORTFOLIO.education.degree} (${PORTFOLIO.education.period})`, 9, true);
    addLine(`${PORTFOLIO.education.institution} — CGPA: ${PORTFOLIO.education.cgpa}`, 9);
    y += 3;

    addLine('CERTIFICATION', 11, true);
    addLine(`${PORTFOLIO.certification.title} (${PORTFOLIO.certification.year})`, 9, true);
    addLine(`${PORTFOLIO.certification.institution}`, 9);

    doc.save('Arul_S_Resume.pdf');
  }
}
