import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-card-save-error',
  templateUrl: './card-save-error.component.html',
  styleUrls: ['./card-save-error.component.scss']
})
export class CardSaveErrorComponent {
  error = this.route.snapshot.paramMap.get('error');

  constructor(private route: ActivatedRoute) {}
}
