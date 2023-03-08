import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {UIRouterGlobals} from "@uirouter/angular";
import {Mir4CollectionService} from "@services/mir4-collection.service";
import {ProfileInterface} from "@interfaces/profile.interface";
import {ChartConfiguration, ChartOptions, ChartType} from "chart.js";
import moment from "moment";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {BaseChartDirective} from "ng2-charts";
import {catchError} from "rxjs";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
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
  profiles: ProfileInterface[]  = [];
  form: FormGroup;
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  constructor(
    private uiRouterGlobals: UIRouterGlobals,
    private mir4CollectionService: Mir4CollectionService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    const {ign} = this.uiRouterGlobals.params;

    if (ign) {
      this.addProfile(ign);
    }

    this.form = this.fb.group({
      ign: new FormControl()
    });
  }

  submit() {
    this.addProfile(this.form.get('ign').value);
  }

  addProfile(ign) {
    this.mir4CollectionService.getProfileData(ign)
      .subscribe((profile) => {
        this.profiles.push(profile);
        this.prepChart(profile);
      })
  }

  prepChart(profile) {
    const yearToCheck = 2023;

    let data = this.lineChartData.labels.map((month) => {
      let prevDayPs;
      let yesterdayPs

      let powerscores =[];
      profile.updatedAts.forEach((date, idx) => {
        if (moment.unix(date).format('MMMM') === month && moment.unix(date).year() === yearToCheck) {
          powerscores.push(profile.powerScores[idx])
        }
      });

      if (powerscores.length) {
        let gainedPs = Math.max(...(powerscores)) - Math.min(...powerscores);
        return gainedPs
      } else {
        return 0
      }

    });

    this.lineChartData.datasets.push({
      label: profile.name,
      data
    })

    this.chart?.update()
  }
}
