import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppService } from './app.service';

interface Seva {
  sevaCode: string;
  sevaName: string;
  amount: number;
}

interface SevaDetail {
  sevaCode: string;
  sevaName: string;
  amount: number;
  sevaDate?: Date;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService]
})
export class AppComponent implements OnInit {
  title = 'template-form-app';
  username: string = "";
  paymentModes: string[] = ['UPI', 'CASH', 'CARD', 'CHEQUE'];
  
  nakshtrams: string[] = [
    'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira',
    'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 
    'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha',
    'Jyeshtha', 'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta',
    'Shatabhisha', 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
  ];

  raasis: string[] = [
    'Mesha', 'Vrishabha', 'Mithuna', 'Karka', 'Simha', 
    'Kanya', 'Tula', 'Vrischika', 'Dhanu', 'Makara', 'Kumbha', 'Meena'
  ];
  receiptNo: string = '';
  occasions: string[] = [];
  gotrams: string[] = [];
  selectedSeva: Seva | null = null;
  submitted: boolean = false;
  sevaDetailsArray: SevaDetail[] = [];
  sevas: Seva[] = [];
  grandTotal: number = 0;

  constructor(private appService: AppService) {}

  ngOnInit() {
    console.log('AppComponent initialized');
    this.loadGotrams();
    this.fetchOccasions();
    this.loadSevaDetails();
    // Initialize with one empty seva detail row
    this.initializeSevaDetails();
    this.getReceiptNo();
  }

  initializeSevaDetails(): void {
    if (this.sevaDetailsArray.length === 0) {
      this.addSevaDetail();
    }
  }

  getReceiptNo():void{
      this.appService.getLatestReceiptNumber().subscribe(
        (response: any) => {
          console.log("Receipt No:", response.receiptNo); 
          this.receiptNo = response.receiptNo; 
        },
        (error) => {
          console.error('Error fetching receipt number:', error);
          this.receiptNo = 'Error fetching receipt number';
        }
      );
    
    
  }
  
  loadGotrams() {
    this.appService.getGotrams().subscribe({
      next: (data) => {
        console.log('Gotrams:', data);
        this.gotrams = data;
      },
      error: (error) => {
        console.error('Error fetching gotrams:', error);
      }
    });
  }

  fetchOccasions(): void {
    this.appService.getOccasions().subscribe({
      next: (occasions: string[]) => {
        this.occasions = occasions;
      },
      error: (error) => {
        console.error('Error fetching occasions:', error);
      }
    });
  }

  loadSevaDetails(): void {
    this.appService.getSevaDetails().subscribe({
      next: (data) => {
        console.log('Backend data:', data);
        this.sevas = data;
        this.initializeSevaDetails();
      },
      error: (error) => {
        console.error('Error fetching seva details:', error);
      }
    });
  }

  onSevaNameChange(event: any, index: number): void {
    const selectedSevaName = event?.target?.value || event;
    const selectedSeva = this.sevas.find((seva) => seva.sevaName === selectedSevaName);

    if (selectedSeva) {
      this.sevaDetailsArray[index] = {
        ...this.sevaDetailsArray[index],
        sevaCode: selectedSeva.sevaCode,
        sevaName: selectedSeva.sevaName,
        amount: selectedSeva.amount
      };
      this.calculateGrandTotal();
    }
  }

  addSevaDetail(): void {
    const newSevaDetail: SevaDetail = {
      sevaCode: '',
      sevaName: '',
      amount: 0,
      sevaDate: undefined
    };
    this.sevaDetailsArray.push(newSevaDetail);
    this.calculateGrandTotal();
  }

  removeSevaDetail(index: number): void {
    if (this.sevaDetailsArray.length > 1) {
      this.sevaDetailsArray.splice(index, 1);
      this.calculateGrandTotal();
    }
  }

  calculateGrandTotal(): void {
    this.grandTotal = this.sevaDetailsArray.reduce(
      (sum, detail) => sum + (detail.amount || 0), 
      0
    );
  }


  
  onClickSubmit(formValue: any): void {
    console.log('Form submitted:', formValue);
    console.log('Seva Details:', this.sevaDetailsArray);
    this.submitted = true;
    
    // Create the complete form data object
    const formData = {
      ...formValue,
      sevaDetails: this.sevaDetailsArray,
      grandTotal: this.grandTotal
    };

    // You can add your form submission logic here
    console.log('Complete form data:', formData);
  }

  
}