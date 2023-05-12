import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-score',
  templateUrl: './score.page.html',
  styleUrls: ['./score.page.scss'],
})
export class ScorePage implements OnInit {

  userScore?:String;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.userScore = this.activatedRoute.snapshot.params['score'];
  }
  navigate() {
    this.router.navigate(['/'])
  }
  navigateToCats() {
    this.router.navigate(['/kitten'])
  }
}
