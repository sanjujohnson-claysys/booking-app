import { Component, OnInit } from '@angular/core';
import { GraphDataService } from 'src/app/graph-data.service'; // Correct the import path
import { Color, NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  data: any[] = [];
  startDate: string = '';
  endDate: string = '';
   colorScheme = 'cool';

  constructor(private dataService: GraphDataService) {}

  ngOnInit(): void {
    // Initialize the component with data
    this.fetchData();
  }

  fetchData() {
    // Assuming your GraphDataService returns an observable of the data
    this.dataService.fetchData("2023-09-27", "2023-09-30").subscribe(
      (result) => {
        // Assuming result is an array of objects with the structure you provided
        this.data = this.processData(result);
      },
      (error) => {
        // Handle errors if needed
        console.error('Error fetching data:', error);
      }
    );
  }
  

  // Function to process the data for ngx-charts
  processData(data: any[]): any[] {
    // Process and structure the data for the chart
    return data.map(item => ({
      name: item.bookingDate, // Use the date as the name
      series: [
        {
          name: 'Morning',
          value: item.morningCount
        },
        {
          name: 'Afternoon',
          value: item.afternoonCount
        }
      ]
    }));
  }
}
