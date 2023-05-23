import { Component } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent {
  emailFormControl = new FormControl('', [Validators.required]);
}
