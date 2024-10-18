import {Component, Input} from '@angular/core';
import {Task} from "../../model/task.entity";
import {
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelDescription,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {Checkpoint} from "../../model/checkpoint.entity";
import {NgForOf, TitleCasePipe} from "@angular/common";
import {ReplaceUnderscorePipe} from "../../../shared/utilities/replace-underscore.pipe";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from "@angular/material/table";

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
    NgForOf,
    ReplaceUnderscorePipe,
    TitleCasePipe,
    MatTable,
    MatHeaderCellDef,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow
  ],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.css'
})
export class TaskDetailComponent {
  @Input() task!: Task;
  @Input() checkpoints!: Checkpoint[];
}
