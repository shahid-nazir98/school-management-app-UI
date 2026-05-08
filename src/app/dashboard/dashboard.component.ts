import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar'
import { Chart,registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,MatCardModule,MatToolbarModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  data: any = {};
  pieChart!: Chart;
  barChart!: Chart;
  lineChart!: Chart;
  attendanceChart!: Chart;
  loading = true;


  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    this.api.getDashboard().subscribe(res => {
      this.data = res;
      this.loading = false;
    });
      this.loadCharts(this.data);
  }

  logout() {
  localStorage.removeItem('token');
  this.router.navigate(['/']);
}

loadCharts(data: any) {

  this.createBarChart(data.monthlyFees || [2000,1000,4000,6000,500,1000,2000,7000,10000.3000,2000,12000.4000]);
  this.createLineChart(data.studentGrowth);
  this.createPieChart(data.totalFees ||1000, data.pendingFees|| 2000);
  this.createAttendanceChart(data.present, data.absent);

}
createAttendanceChart(present: number, absent: number) {

  if (this.attendanceChart) this.attendanceChart.destroy();

  if (!present && !absent) {
    present = 70;
    absent = 30;
  }

  this.attendanceChart = new Chart('attendanceChart', {
    type: 'pie',
    data: {
      labels: ['Present', 'Absent'],
      datasets: [{
        data: [present, absent],
        backgroundColor: ['#4caf50', '#f44336']
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }
  });
}
createPieChart(totalFees: number, pendingFees: number) {

  if (this.pieChart) this.pieChart.destroy();

  this.pieChart = new Chart('pieChart', {
    type: 'doughnut',
    data: {
      labels: ['Collected', 'Pending'],
      datasets: [{
        data: [totalFees, pendingFees],
       // cutout: '65%'
      }]
    },
    options: {
       responsive: true,
    maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }
  });
}
createLineChart(studentGrowth: number[]) {

  if (this.lineChart) this.lineChart.destroy();
   if (!studentGrowth || studentGrowth.length === 0) {
    studentGrowth = [5, 10, 15, 20, 25, 30, 35,30,40,10,50,60]; // temp fallback
  }

  this.lineChart = new Chart('lineChart', {
    type: 'line',
    data: {
      labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      datasets: [{
        label: 'Students Growth',
        data: studentGrowth,
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      responsive: true,
  maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      }
    }
  });
}
createBarChart(monthlyFees: number[]) {

  if (this.barChart) this.barChart.destroy();

  this.barChart = new Chart('barChart', {
    type: 'bar',
    data: {
      labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      datasets: [{
        label: 'Fees Collected (₹)',
        data: monthlyFees,
        borderRadius: 6,
        barThickness: 18
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
  tooltip: {
    callbacks: {
      label: (ctx) => `₹ ${ctx.raw}`
    }
  }
},
      scales: {
        x: { grid: { display: false } },
        y: { beginAtZero: true }
      }
    }
  });
}
onFilterChange(event: any) {
  const value = event.target.value;

  this.api.getDashboard().subscribe(res => {
    this.data = res;
    this.loadCharts(this.data); // 🔥 re-render charts
  });
}
}