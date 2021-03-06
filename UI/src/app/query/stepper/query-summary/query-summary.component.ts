import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Attribute } from 'src/app/api/models/attribute.model';
import {
  IClusterRequest,
  ClusterType,
  DataProcessors,
  Database,
} from 'src/app/api/models/cluster-request.model';
import { QueryService } from 'src/app/api/query.service';

@Component({
  selector: 'app-query-summary',
  templateUrl: './query-summary.component.html',
  styleUrls: ['./query-summary.component.scss'],
})
export class QuerySummaryComponent implements OnInit, OnChanges {
  @Input() request: IClusterRequest;

  tableSource: Observable<MatTableDataSource<AttributeDisplay>>;
  columnsToDisplay: string[] = ['name', 'weight'];

  constructor(private queryService: QueryService) {}

  ngOnInit(): void {}

  ngOnChanges() {
    this.tableSource = this.queryService.getAttributes().pipe(
      map((attributes: Attribute[]) => {
        var table: any[] = [];
        for (let attributeKey of Object.keys(this.request.attributes)) {
          let cur = {
            name: attributes.find(
              (attribute) => attribute.database_name === attributeKey
            ).display_name,
            weight: this.request?.attributes[attributeKey],
          };
          table.push(cur);
        }
        return new MatTableDataSource(table);
      })
    );
  }

  get usingDBScan(): boolean {
    return this.request?.cluster_type == ClusterType.DBScan;
  }

  getRequestParam(param: string): any {
    switch (param) {
      case 'n_clusters':
        return this.request?.n_clusters == null ? 0 : this.request.n_clusters;
      case 'n_samples':
        return this.request?.n_samples == null ? 0 : this.request.n_samples;
      case 'eps':
        return this.request?.eps == null ? 0 : this.request.eps;
      case 'standardizer':
        return this.request?.standardizer == null
          ? 'Standard'
          : this.standardizer;
      case 'cluster_type':
        return this.request?.cluster_type == null
          ? 'Undefined'
          : this.clusterMethod;
      case 'database':
        return this.request?.database == null
          ? 'Undefined'
          : this.request.database;
      case 'temporal_val':
        return this.request?.time_steps == null ||
          this.request?.starting_time_step == null
          ? 0
          : this.timeStepString;
      default:
        return 'Undefined';
    }
  }

  get timeStepString(): string {
    return this.useTimeStepRange
      ? 'min:  ' +
          this.request?.starting_time_step +
          '   |   max:  ' +
          (this.request?.time_steps + this.request?.starting_time_step)
      : '' + this.request?.time_steps;
  }

  get useTimeStepRange(): boolean {
    return this.request?.time_steps != this.request?.starting_time_step;
  }

  get clusterMethod(): string {
    switch (this.request?.cluster_type) {
      case ClusterType.DBScan:
        return ClusterType.d_DBScan;
      case ClusterType.KMeans:
        return ClusterType.d_KMeans;
      default:
        return 'Undefined';
    }
  }

  get standardizer(): string {
    switch (this.request?.standardizer) {
      case DataProcessors.MinMax:
        return DataProcessors.d_MinMax;
      case DataProcessors.ABS:
        return DataProcessors.d_ABS;
      case DataProcessors.Standard:
        return DataProcessors.d_Standard;
      default:
        return 'Undefined';
    }
  }
}

export interface AttributeDisplay {
  name: string;
  weight: number;
}
