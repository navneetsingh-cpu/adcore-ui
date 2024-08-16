import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  courseData = [];
  refresh: Subject<any> = new Subject();

  constructor(private http: HttpClient) { }

  triggerRefresh() {
    this.refresh.next(false);
  }

  listenForRefresh() {
    return this.refresh.asObservable();
  }

  getCourses(): any {
    return this.http.get<any>('api/courses/')
  }
  deleteCourse(id: string): any {
    return this.http.delete<any>(`api/courses/${id}`)
  }
  saveCourse(obj: any): any {
    return this.http.post<any>('api/courses/', obj)
  }
}
