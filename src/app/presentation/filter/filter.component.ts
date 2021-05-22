import { Component, Input, OnChanges } from '@angular/core';
import { Member } from 'src/app/application';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html'
})
export class FilterComponent implements OnChanges {

  @Input()
  members: Member[];

  constructor() { }

  ngOnChanges(): void {
    this.members = this.members || [];
    this.members = this.members
      .sort((m1: Member, m2: Member) => {
        return m1.getDisplayName().localeCompare(m2.getDisplayName());
      })
  }

}
