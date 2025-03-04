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
    this.submitted = true;
  
    // Prepare the data for multiple sevas
    const formData = this.sevaDetailsArray.map((seva, index) => ({
      receipt_no: this.receiptNo,
      mobile_no: formValue.phoneNo,
      first_name: formValue["First Name"],
      last_name: formValue["Last Name"],
      address_line1: formValue["Address Line 1"],
      address_line2: formValue["Address Line 2"],
      occasion: formValue.Occasion,
      gotram: formValue.gotram,
      nakshtram: formValue.nakshtram,
      raasi: formValue.raasi,
      payment_mode: formValue.Mode,
      seva_name: seva.sevaName,
      seva_date: seva.sevaDate,
      amount: seva.amount
    }));
  console.log('formData--',formData)
    this.appService.submitMultipleSevaData(formData).subscribe({
      next: (response) => { 
        console.log('Form saved successfully:', response);
        alert('Form submitted successfully!');
        this.hardReset();
        this.getReceiptNo();
      },
      error: (error) => {
        console.error('Error saving form:', error);
        alert('Error submitting form. Please try again.');
      }
    });
  }
  hardReset(): void {
    window.location.reload();
  }
// onClickSubmit(formValue: any): void {
//   console.log('Form submitted:', formValue);
//   this.submitted = true;

//   // Prepare the form data for each seva in sevaDetailsArray
//   const formDataArray = this.sevaDetailsArray.map(seva => {
//     return {
//       receipt_no: parseInt(this.receiptNo),
//       mobile_no: formValue.phoneNo,
//       first_name: formValue["First Name"] || '',
//       last_name: formValue["Last Name"] || '',
//       address_line1: formValue["Address Line 1"] || '',
//       address_line2: formValue["Address Line 2"] || '',
//       occasion: formValue.Occasion || '',
//       gotram: formValue.gotram || '',
//       nakshtram: formValue.nakshtram || '',
//       raasi: formValue.raasi || '',
//       payment_mode: formValue.Mode || '',
//       seva_name: seva.sevaName,
//       seva_date: seva.sevaDate,
//       amount: seva.amount
//     };
//   });

//   console.log('Sending data:', formDataArray);

//   // Send an array of form data (one for each seva)
//   this.appService.submitSevaData(formDataArray).subscribe({
//     next: (response: any) => {
//       console.log('Form saved successfully:', response);
//       alert('Form submitted successfully! Receipt No: ' + this.receiptNo);

//       // Optionally handle printing the receipt or resetting the form
//       // this.printReceipt();
//       // this.resetForm();
//     },
//     error: (error: any) => {
//       console.error('Error saving form:', error);
//       alert('Error submitting form. Please try again.');
//     }
//   });
// }

}