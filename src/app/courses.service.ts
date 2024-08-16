import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  courseData = [];
  refresh: Subject<any> = new Subject();
  editData: any;

  constructor(private http: HttpClient) { }

  triggerRefresh() {
    this.refresh.next(false);
  }

  listenForRefresh() {
    return this.refresh.asObservable();
  }

  getCourses(): any {
    return this.http.get<any>('https://adcore-backend-4.onrender.com/courses/')
  }
  deleteCourse(id: string): any {
    return this.http.delete<any>(`https://adcore-backend-4.onrender.com/courses/${id}`)
  }

  editCourse(id: string, object: any): any {
    return this.http.put<any>(`https://adcore-backend-4.onrender.com/courses/${id}`, object);
  }
  saveCourse(obj: any): any {
    return this.http.post<any>('https://adcore-backend-4.onrender.com/courses/', obj)
  }
}
