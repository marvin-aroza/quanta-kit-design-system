import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('quanta-kit-angular-docs');

  onPrimaryClick() {
    alert('Primary button clicked!');
  }

  onSecondaryClick() {
    alert('Secondary button clicked!');
  }

  onOutlineClick() {
    alert('Outline button clicked!');
  }

  onGhostClick() {
    alert('Ghost button clicked!');
  }
}
