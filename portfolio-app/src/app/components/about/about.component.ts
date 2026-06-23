import { Component, ElementRef, AfterViewInit, QueryList, ViewChildren } from '@angular/core';
import { PORTFOLIO } from '../../data/portfolio.data';

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent implements AfterViewInit {
  portfolio = PORTFOLIO;

  stats = [
    { value: '1.3+', label: 'Years Experience' },
    { value: '2+', label: 'Enterprise Projects' },
    { value: '10+', label: 'Technologies' },
  ];

  @ViewChildren('reveal') revealElements!: QueryList<ElementRef>;

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    this.revealElements.forEach((el) => observer.observe(el.nativeElement));
  }
}
