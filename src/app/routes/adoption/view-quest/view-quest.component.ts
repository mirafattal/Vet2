import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-view-quest',
  standalone: true,
  imports: [
    MatDialogModule,
    MatCardModule,
    MatDividerModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './view-quest.component.html',
  styleUrls: ['./view-quest.component.scss']
})
export class ViewQuestComponent implements OnInit {

  petName: string;
  questionnaire: any;
  questionnaireDetails: { question: string; answer: string }[] = [];

  constructor( @Inject(MAT_DIALOG_DATA) public data: any) {
    this.petName = data.petName; // Access the petName directly
    this.questionnaire = data.questionnaire; // Optionally access the full questionnaire
    this.questionnaireDetails = [
      { question: 'What is Your Occupation?', answer: this.questionnaire.occupation || 'N/A' },
      { question: 'What is Your Salary?', answer: this.questionnaire.salary || 'N/A' },
      { question: 'Are you married?', answer: this.questionnaire.isMarried ? 'Yes' : 'No' },
      { question: 'Do you Have Children?', answer: this.questionnaire.hasChildren ? 'Yes' : 'No' },
      { question: 'Have you owned a pet before?', answer: this.questionnaire.hasOwnedPetBefore ? 'Yes' : 'No' },
      { question: 'Are all adults in your household aware of the adoption?', answer: this.questionnaire.isHouseholdAware ? 'Yes' : 'No' },
      { question: 'Has anyone in your household experienced allergies or asthma?', answer: this.questionnaire.hasAllergiesAsthma ? 'Yes' : 'No' },
      { question: 'Who will be responsible for the dog\'s care?', answer: this.questionnaire.whoWillBeReponsible || 'N/A' },
      { question: 'Who will provide for your pet if you become ill or unable to care for him/her?', answer: this.questionnaire.ifSick || 'N/A' },
      { question: 'How many hours a day will your pet be left alone?', answer: this.questionnaire.leftAlone || 'N/A' },
      { question: 'What is your Reason for adoption?', answer: this.questionnaire.reasonForAdoption || 'N/A' },
    ];
  }

  ngOnInit() {

  }

}
