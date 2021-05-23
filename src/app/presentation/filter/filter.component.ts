import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Member } from '../../application';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html'
})
export class FilterComponent implements OnInit, OnDestroy {

  @Input()
  members: Member[];

  @Output()
  filterChange: EventEmitter<Member[]>;

  @Output()
  close: EventEmitter<void>;

  formGroup: FormGroup;

  private subscriprions: Subscription[];
  private selectedMembers: Member[];

  constructor(private fb: FormBuilder) {
    this.subscriprions = [];
    this.filterChange = new EventEmitter();
    this.close = new EventEmitter();
  }

  ngOnDestroy(): void {
    this.subscriprions.forEach(s => s.unsubscribe());
  }

  ngOnInit(): void {
    this.members = this.members || [];
    this.selectedMembers = this.members;

    this.sortMembers();
    this.initFormGroup();
    this.listenFormChange();
  }

  private sortMembers() {
    this.members = this.members
      .sort((m1: Member, m2: Member) => {
        return m1.getDisplayName().localeCompare(m2.getDisplayName());
      });
  }

  private initFormGroup() {
    if (this.members.length > 0) {
      this.formGroup = this.fb.group({});
      this.members.forEach((m: Member) => {
        const ctrl = this.fb.control(this.isSelected(m));
        const ctrlName = m.getId();
        this.formGroup.addControl(ctrlName, ctrl);
      });
    }
  }

  private isSelected(member: Member) {
    const selectedIds = this.selectedMembers.map(m => m.getId());
    return selectedIds.indexOf(member.getId()) !== -1;
  }

  /**
   * Quando il valore del form cambia, leggiamo
   * il valore di tutte le checkbox ed emettiamo
   * una nuova lista di members
   */
  private listenFormChange() {
    this.subscriprions.push(
      this.formGroup
        .valueChanges
        .subscribe((form: { [memberId: string]: boolean }) => {
          this.filterChange.emit(this.getSelectedMembers(form));
        })
    );
  }

  private getSelectedMembers(form: { [memberId: string]: boolean }): Member[] {
    return Object
      .keys(form)
      .filter(memberId => form[memberId] === true)
      .map(memberId => {
        const selectedMember: Member = this.members.filter(m => m.getId() === memberId)[0];
        return selectedMember;
      });
  }
}
