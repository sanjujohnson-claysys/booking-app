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
  colorScheme = 'cool';
  // Get the current date as a string
startDate: string = new Date().toISOString().slice(0, 10);

// Initialize endDate as an empty string
endDate: string = '';

// Create a variable to store the two weeks later date
twoWeeksLater: Date = new Date(this.startDate);



  
  

  constructor(private dataService: GraphDataService) {
    this.twoWeeksLater.setDate(this.twoWeeksLater.getDate() + 14);

// Initialize endDate as a string representing the date two weeks later
this.endDate = this.twoWeeksLater.toISOString().slice(0, 10);
  }
  
  ngOnInit(): void {
    // Initialize the component with data
    
    this.fetchData();
  }
  

  fetchData() {
    // Assuming your GraphDataService returns an observable of the data
    this.dataService.fetchData(this.startDate, this.endDate).subscribe(
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
  return data.map(item => {
    // Extract the date part (YYYY-MM-DD) from the timestamp
    const datePart = item.bookingDate.split('T')[0];

    return {
      name: datePart, // Use the formatted date as the name
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
    };
  });
}

}