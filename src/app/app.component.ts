import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CoursesService } from './courses.service';
import getSymbolFromCurrency from 'currency-symbol-map'
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DialogOverviewExampleDialogComponent } from './dialog-overview-example-dialog/dialog-overview-example-dialog.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatTooltipModule, MatButtonModule, MatIconModule, MatSortModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'adcore-ui';

  dataSource: any;

  displayedColumns: string[] = ['CourseName', 'Location', 'Start', 'Length', 'Price'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  readonly dialog = inject(MatDialog);


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
  openDialog(): void {
    this.dialog.open(DialogOverviewExampleDialogComponent);


  }


  ngOnInit() {
    this.coursesService.getCourses().subscribe((courses: any) => {
      // process the configuration.
      console.log('data', courses);
      this.coursesService.courseData = [...courses];

      const updatedCourses = courses.map((course: any) => ({
        ...course,
        Location: `${course.City}, ${course.Country}, ${course.University}`,
        Start: course.StartDate,
        Length: this.getDifferenceinDays(course.StartDate, course.EndDate),
        Price: '' + getSymbolFromCurrency(course.Currency) + Math.round(course.Price).toLocaleString()
      }));

      this.dataSource = new MatTableDataSource(updatedCourses);
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort

    });
  }

  ngAfterViewInit() {
  }
}
