import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'button-group',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button-group.component.html',
  styleUrls: ['./button-group.component.scss']
})
export class ButtonGroupComponent {
  @Input() buttons: { label: string, variant?: string }[] = [];

  handleClick(btn: any) {
    alert(`You clicked ${btn.label}`);
  }
}
