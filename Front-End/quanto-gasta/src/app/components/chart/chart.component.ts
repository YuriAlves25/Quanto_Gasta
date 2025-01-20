import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Chart, ChartModule } from 'angular-highcharts';
import { MonthExpenses } from '../../model/month-expenses';
import { Observable } from 'rxjs';
import { AppMaterialImports } from '../../shared/app-material/app-material-imports';


@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [
    ChartModule,
    AppMaterialImports
  ],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent implements OnInit, OnChanges {
  @Input() expenseData!: Observable<MonthExpenses[]>;
  chart?: Chart;

  ngOnInit() {
    this.expenseData.subscribe(data => this.updateChart(data));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['expenseData'] && changes['expenseData'].currentValue) {
      this.expenseData.subscribe(data => this.updateChart(data));
    }
  }

  private updateChart(expenseData: MonthExpenses[]) {
    if (expenseData && expenseData.length) {
      this.initChart(expenseData);
    } else {
      this.chart = undefined;
    }
  }

  private initChart(expenseData: MonthExpenses[]) {
    const sortedData = expenseData
      .map(item => ({
        x: new Date(item.date).getTime(),
        y: item.total
      }))
      .sort((a, b) => a.x - b.x);

    this.chart = new Chart({
      chart: { type: 'line' },
      title: { text: '' },
      xAxis: { type: 'datetime', title: { text: 'Mês/Ano' } },
      yAxis: { title: { text: 'Gasto (R$)' } },
      series: [
        { name: 'Gasto', type: 'line', data: sortedData }
      ]
    });
  }
}
