import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { CoursesService } from './courses.service';
import getSymbolFromCurrency from 'currency-symbol-map'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatTableModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'adcore-ui';

  dataSource = [];

  displayedColumns: string[] = ['CourseName', 'Location', 'Start', 'Length', 'Price'];

  constructor(private coursesService: CoursesService) {

  }


  getDifferenceinDays(startDate: string, endDate: string) {
    const start: Date = new Date(startDate);
    const end: Date = new Date(endDate);

    // Calculate the difference in milliseconds
    const differenceInMilliseconds: number = end.getTime() - start.getTime();

    // Convert milliseconds to days
    const millisecondsInOneDay: number = 1000 * 60 * 60 * 24;
    const differenceInDays: number = Math.floor(differenceInMilliseconds / millisecondsInOneDay);

    return differenceInDays
  }



  ngOnInit() {
    this.coursesService.getCourses().subscribe((courses: any) => {
      // process the configuration.
      console.log('data', courses);

      const updatedCourses = courses.map((course: any) => ({
        ...course,
        Location: `${course.City}, ${course.Country}, ${course.University}`,
        Start: course.StartDate,
        Length: this.getDifferenceinDays(course.StartDate, course.EndDate),
        Price: '' + getSymbolFromCurrency(course.Currency) + Math.round(course.Price)
      }));

      this.dataSource = updatedCourses;
    });
  }
}
