import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login-error',
  templateUrl: './login-error.component.html',
  styleUrls: ['./login-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginErrorComponent implements OnInit {

  errorMessage!: string;

  constructor(
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.errorMessage = params.error;
      this.cd.detectChanges();
    })
  }

}
