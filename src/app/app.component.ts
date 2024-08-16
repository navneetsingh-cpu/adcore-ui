import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CoursesService } from './courses.service';
import getSymbolFromCurrency from 'currency-symbol-map'
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatTooltipModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'adcore-ui';

  dataSource: any;

  displayedColumns: string[] = ['CourseName', 'Location', 'Start', 'Length', 'Price'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private coursesService: CoursesService) {

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
        Price: '' + getSymbolFromCurrency(course.Currency) + Math.round(course.Price).toLocaleString()
      }));

      this.dataSource = new MatTableDataSource(updatedCourses);
      this.dataSource.paginator = this.paginator


    });
  }

  ngAfterViewInit() {
  }
}
