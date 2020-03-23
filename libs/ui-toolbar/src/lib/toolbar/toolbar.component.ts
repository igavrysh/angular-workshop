import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ui-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent implements OnInit {
  @Input() isLoggedIn;
  @Input() title;
  @Input() sidenav;
  @Output() logout = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
