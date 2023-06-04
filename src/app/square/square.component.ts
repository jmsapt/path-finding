import { Component } from '@angular/core';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss']
})
export class SquareComponent {
  toggle = true;
  status = "Enable";

  enableDisableRule() {
    this.toggle = !this.toggle;
    this.status = this.toggle ? 'Enable' : 'Disable';
  }
}
