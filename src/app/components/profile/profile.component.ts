import {Component, Input, OnInit} from '@angular/core';
import {UIRouterGlobals} from "@uirouter/angular";
import {Mir4CollectionService} from "@services/mir4-collection.service";
import {ProfileInterface} from "@interfaces/profile.interface";
import {ChartConfiguration, ChartOptions, ChartType} from "chart.js";
import moment from "moment";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile!: ProfileInterface;
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ],
    datasets: []
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  };
  public lineChartLegend = true;

  constructor(
    private uiRouterGlobals: UIRouterGlobals,
    private mir4CollectionService: Mir4CollectionService
  ) {
  }

  ngOnInit() {
    const {ign} = this.uiRouterGlobals.params;

    this.mir4CollectionService.getProfileData(ign)
      .subscribe((profile) => {
        this.profile = profile;
        this.prepChart();
      })
  }

  prepChart() {
    const yearToCheck = 2023;
    let startingPs;

    let idx = 0;
    let data = [0, 0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0]
    for (let date of this.profile.updatedAts) {
      const year = moment.unix(date).year();
      const month = moment.unix(date).format('MMMM')
      if (year === yearToCheck) {
        if (!startingPs) {
          startingPs = this.profile.powerScores[idx];
          idx++;
          continue;
        }


        const monthIdx = this.lineChartData.labels.findIndex((label) => label === month);
        let dailyPS = this.profile.powerScores[idx];
        let gainedPs = dailyPS - startingPs;

        if (dailyPS < startingPs) {
          gainedPs = 0;
        }

        data[monthIdx] = gainedPs + data[monthIdx];
        startingPs = dailyPS;
      }
      idx++;
    }


    this.lineChartData.datasets.push({
      data,
      label: 'Monthly gained PS',
      fill: true,
      tension: 0.5,
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)'
    });
  }
}
