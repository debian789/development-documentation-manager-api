import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {ActivatedRoute, Router, Params} from "@angular/router";
import {CommandsService} from "../commands.service";

@Component({
  selector: 'detail-command',
  encapsulation: ViewEncapsulation.None,
  template: require('./detailCommand.html')
})

export class DetailCommandComponent implements OnInit {

  detailData: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private commandsService:CommandsService

    ) {}

  ngOnInit() {
    let self = this
    this.route.params.forEach((params: Params) => {
      this.commandsService.getCommand(params['id'],(data) => {
        self.detailData = data;
      });
    });
  }

}
