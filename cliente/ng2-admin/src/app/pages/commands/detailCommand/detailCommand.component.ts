import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {ActivatedRoute, Router, Params} from "@angular/router";

@Component({
  selector: 'detail-command',
  encapsulation: ViewEncapsulation.None,
  template: require('./detailCommand.html')
})

export class DetailCommandComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    ) {}

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let id = +params['id']; // (+) converts string 'id' to a number
      debugger
      // this.service.getHero(id).then(hero => this.hero = hero);
    });
  }

}
