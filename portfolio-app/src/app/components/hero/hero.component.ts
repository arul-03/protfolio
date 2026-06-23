import { Component, inject, OnInit } from '@angular/core';
import { ThreeBackgroundComponent } from '../three-background/three-background.component';
import { PORTFOLIO } from '../../data/portfolio.data';
import { ResumeService } from '../../services/resume.service';

interface CodeLine {
  parts: { text: string; type: string }[];
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [ThreeBackgroundComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements OnInit {
  portfolio = PORTFOLIO;
  private resumeService = inject(ResumeService);

  typedText = '';
  visibleLines = 0;
  private fullText = 'Angular Developer';
  private charIndex = 0;

  codeLines: CodeLine[] = [
    {
      parts: [
        { text: 'const', type: 'keyword' },
        { text: ' developer', type: 'plain' },
        { text: ' = ', type: 'plain' },
        { text: '{', type: 'bracket' },
      ],
    },
    {
      parts: [
        { text: '  name', type: 'property' },
        { text: ': ', type: 'plain' },
        { text: `'${PORTFOLIO.name}'`, type: 'string' },
        { text: ',', type: 'plain' },
      ],
    },
    {
      parts: [
        { text: '  role', type: 'property' },
        { text: ': ', type: 'plain' },
        { text: `'${PORTFOLIO.title}'`, type: 'string' },
        { text: ',', type: 'plain' },
      ],
    },
    {
      parts: [
        { text: '  location', type: 'property' },
        { text: ': ', type: 'plain' },
        { text: `'${PORTFOLIO.location}'`, type: 'string' },
        { text: ',', type: 'plain' },
      ],
    },
    {
      parts: [
        { text: '  skills', type: 'property' },
        { text: ': [', type: 'bracket' },
        { text: `'Angular'`, type: 'string' },
        { text: ', ', type: 'plain' },
        { text: `'TypeScript'`, type: 'string' },
        { text: ', ', type: 'plain' },
        { text: `'WebSocket'`, type: 'string' },
        { text: '],', type: 'bracket' },
      ],
    },
    {
      parts: [
        { text: '  experience', type: 'property' },
        { text: ': ', type: 'plain' },
        { text: `'1.3 years'`, type: 'string' },
        { text: ',', type: 'plain' },
      ],
    },
    {
      parts: [
        { text: '  available', type: 'property' },
        { text: ': ', type: 'plain' },
        { text: 'true', type: 'boolean' },
      ],
    },
    {
      parts: [{ text: '};', type: 'bracket' }],
    },
  ];

  ngOnInit(): void {
    this.typeWriter();
    this.revealCodeLines();
  }

  downloadResume(): void {
    this.resumeService.downloadResume();
  }

  scrollToContact(): void {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }

  private typeWriter(): void {
    if (this.charIndex < this.fullText.length) {
      this.typedText += this.fullText.charAt(this.charIndex);
      this.charIndex++;
      setTimeout(() => this.typeWriter(), 100);
    }
  }

  private revealCodeLines(): void {
    const interval = setInterval(() => {
      this.visibleLines++;
      if (this.visibleLines >= this.codeLines.length) {
        clearInterval(interval);
      }
    }, 280);
  }
}
