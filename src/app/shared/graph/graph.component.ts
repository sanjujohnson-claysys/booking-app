
import { Component, OnInit } from '@angular/core';
import { GraphDataService } from 'src/app/graph-data.service'; // Correct the import path

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  data: any[] = [];
  startDate: string = '';
  endDate: string = '';
  

  constructor(private dataService: GraphDataService) {}

  ngOnInit(): void {
    // Initialize the component with data
    this.fetchData();
  }

  fetchData() {
    this.dataService.fetchData(this.startDate, this.endDate).subscribe((result) => {
      this.data = result;
    });
  }
}


