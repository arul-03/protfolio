import { Component, AfterViewInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { PORTFOLIO } from '../../data/portfolio.data';

@Component({
  selector: 'app-projects',
  standalone: true,
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent implements AfterViewInit {
  portfolio = PORTFOLIO;

  @ViewChildren('reveal') revealElements!: QueryList<ElementRef>;

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    this.revealElements.forEach((el) => observer.observe(el.nativeElement));
  }
}
