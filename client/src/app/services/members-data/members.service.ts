import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Member } from './models/member';
import { map, of } from 'rxjs';
import { Photo } from './models/photo';
import { PaginatedResult } from './models/pagination';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];
  paginatedResult: PaginatedResult<Member[]> = new PaginatedResult<Member[]>

  constructor(private http: HttpClient) { }

  getMembers(page?: number, itenPerPage?: number) {
    let params = new HttpParams();

    if (page && itenPerPage) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itenPerPage);
    }

    return this.http.get<Member[]>(`${this.baseUrl}users`, {observe: 'response', params}).pipe(
      map((response) => {
        if (response.body) {
          this.paginatedResult.result = response.body;
        }
        const pagination = response.headers.get('Pagination');
        if (pagination) {
          this.paginatedResult.pagination = JSON.parse(pagination);
        }

        return this.paginatedResult;
      })
    );
  }

  getMember(username: string) {
    const member = this.members.find((member) => member.userName == username);
    if (member) return of(member);
    return this.http.get<Member>(`${this.baseUrl}users/${username}`);
  }

  updateMember(member: Member) {
    return this.http.put(`${this.baseUrl}users`, member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = { ...this.members[index], ...member }
      }
      )
    );
  }

  setMainPhoto(photoId: number) {
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {})
  }

  deletePhoto(photoId: number) {
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId, {})
  }
}