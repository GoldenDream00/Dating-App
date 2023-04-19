import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { MembersService } from 'src/app/services/members-data/members.service';
import { Member } from 'src/app/services/members-data/models/member';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  member!: Member;
  hasSocials = false;
  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];

  constructor(private memberService: MembersService, private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.loadMember();
    this.galleryOptions = [
      {
        width: '500px',
        height: '600px',  
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false,
      }
    ];   
  }

  getImages() {
    if (!this.member) return [];
    const imagesUrl: NgxGalleryImage[] = [];
    for (const photo of this.member.photos) {
      imagesUrl.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url,
      })     
    }
    return imagesUrl;
  }

  loadMember() {
    const username = this.route.snapshot.paramMap.get('username');
    if(!username) return
    this.memberService.getMember(username).subscribe({
      next: member => {
        this.member = member;
        this.hasSocials = !!member.instagramUrl || !!member.linkedInUrl || !!member.twitterUrl || !!member.facebookUrl;
        this.galleryImages = this.getImages();
      }
    })
  } 
}
