import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GraphType } from '../clusteredData';


@Component({
  selector: 'app-configure-graph',
  templateUrl: './configure-graph.component.html',
  styleUrls: ['./configure-graph.component.scss']
})
export class ConfigureGraphComponent implements OnInit {

  public graphType: GraphType = GraphType.Graph_2_Attr;
  public canApply: boolean = true;
  public GraphTypeEnum = GraphType;

  private attributes: string[];
  private numAttrSelected: number = 0;
  private attrsSelected: boolean[];
  private disabledCheckboxes: boolean[];

  constructor(
    public dialogRef: MatDialogRef<ConfigureGraphComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.attributes = new Array(data['attrs'].length);
    this.attrsSelected = new Array(data['attrs'].length);
    this.disabledCheckboxes = new Array(data['attrs'].length);
    for(let i = 0; i < data['attrs'].length; i++){
      this.attributes[i] = data['attrs'][i];
      this.disabledCheckboxes[i] = true;
    }
    this.graphType = data.graphType
    this.numAttrSelected = 0;

    for(let i = 0; i < this.attributes.length; i++){
      this.disabledCheckboxes[i] = false;
      this.attrsSelected[i] = false;
    }
  }

  ngOnInit(): void {
  }

  graphSelect(event){
    this.numAttrSelected = 0;

    for(let i = 0; i < this.attributes.length; i++){
      this.disabledCheckboxes[i] = false;
      this.attrsSelected[i] = false;
    }
  }

  attrChecked(event) {
    if(event){
      this.numAttrSelected++;

      if ( this.graphType == GraphType.Graph_3_Attr ){
        if( this.numAttrSelected == 3 ){
          this.disableUncheckedBoxes(true);
          this.canApply = false;
        }
      } else if ( this.graphType == GraphType.Graph_2_Attr ){
        if( this.numAttrSelected == 2 ){
          this.disableUncheckedBoxes(true);
          this.canApply = false;
        }
      } else if ( this.graphType == GraphType.Graph_1_Attr ){
        if( this.numAttrSelected == 1 ){
          this.disableUncheckedBoxes(true);
          this.canApply = false;
        }
      }
    } else {
      this.numAttrSelected--;
      if ( this.graphType == GraphType.Graph_3_Attr ){
        if( this.numAttrSelected == 2 ){
          this.disableUncheckedBoxes(false);
          this.canApply = true;
        }
      } else if ( this.graphType == GraphType.Graph_2_Attr ){
        if( this.numAttrSelected == 1 ){
          this.disableUncheckedBoxes(false);
          this.canApply = true;
        }
      } else if ( this.graphType == GraphType.Graph_1_Attr ){
        if( this.numAttrSelected == 0 ){
          this.disableUncheckedBoxes(false);
          this.canApply = true;
        }
      }
    }
  }

  disableUncheckedBoxes(disable: boolean): void {
    if(disable){
      for(let i = 0; i < this.attrsSelected.length; i++){
        this.disabledCheckboxes[i] = !this.attrsSelected[i];
      }
    } else {
      //enable
      for(let i = 0; i < this.disabledCheckboxes.length; i++){
        this.disabledCheckboxes[i] = false;
      }
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  getAttrList(): any {
    let returnObject = {};
    let attrReturn: string[] = new Array(this.numAttrSelected);
    let index: number = 0;
    for(let i = 0; i < this.attrsSelected.length; i++){
      if(this.attrsSelected[i] == true){
        attrReturn[index++] = this.attributes[i];
      }
    }
    returnObject['attrs'] = attrReturn;
    returnObject['graphType'] = this.graphType;

    return returnObject;
  }
}
