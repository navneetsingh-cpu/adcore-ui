import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  courseData = [];


  constructor(private http: HttpClient) { }



  getCourses(): any {
    return this.http.get<any>('api/courses/')
  }
}
