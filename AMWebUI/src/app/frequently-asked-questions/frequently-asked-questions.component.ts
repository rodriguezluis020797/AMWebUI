import { Component } from '@angular/core';

@Component({
  selector: 'am-frequently-asked-questions',
  imports: [],
  templateUrl: './frequently-asked-questions.component.html',
  styleUrl: './frequently-asked-questions.component.css'
})
export class FrequentlyAskedQuestionsComponent {
  scrollTo(id: string) {
    console.clear()
    console.log('id', id)
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
