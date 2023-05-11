import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { take } from 'rxjs';
import { AccountService } from 'src/app/services/account-data/account.service';
import { User } from 'src/app/services/account-data/models/user';
import { MembersService } from 'src/app/services/members-data/members.service';
import { Member } from 'src/app/services/members-data/models/member';
import { Photo } from 'src/app/services/members-data/models/photo';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input()
  member!: Member;

  uploader!: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  user!: User;

  constructor(private accountService: AccountService,
    private memberService: MembersService) {
    accountService.currentUser$.pipe((take(1))).subscribe({
      next: user => {
        if (user) this.user = user;
      }
    })
  }

  ngOnInit(): void {
    this.initializeUploader();
  }

  fileOverBase(e: any) {
    this.hasBaseDropZoneOver = e;
  }

  setMainPhoto(photo: Photo) {
    this.memberService.setMainPhoto(photo.id).subscribe({
      next: () => {
        if (this.user && this.member) {
          this.user.photoUrl = photo.url;
          this.accountService.setCurrentUser(this.user);
          this.member.photoUrl = photo.url;
          this.member.photos.forEach((p) => {
            if (p.isMain) p.isMain = false;
            if (p.id == photo.id) p.isMain = true;
          })
        }
      }
    })
  }

  deletePhoto(photo: Photo) {
    this.memberService.deletePhoto(photo.id).subscribe({
      next: () => {
        if (this.user && this.member) {
          this.member.photos = this.member.photos.filter((p) => p.id != photo.id);
        }
      }
    })
  }


  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + "users/add-photo",
      authToken: "Bearer " + this.user.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    }

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const photo = JSON.parse(response);
        this.member.photos.push(photo);
        if (photo.isMain && this.user && this.member) {
          this.user.photoUrl = photo.url;
          this.member.photoUrl = photo.url;
          this.accountService.setCurrentUser(this.user);
        } 
      }
      
    }
  }

}
