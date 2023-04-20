import { CanDeactivateFn } from "@angular/router";
import { MemberEditComponent } from "../modules/members/member-edit/member-edit.component";

export const preventUnsavedChanges: CanDeactivateFn<MemberEditComponent> = (component: MemberEditComponent) => {
    if (component.formGroup.dirty) {
        return confirm('Are you sure you want to continue? Any unsaved changes will be lost!');
    }
    return true;
  }