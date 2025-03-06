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

  formData: any = {
    phoneNo: '',
    firstName: '',
    lastName: '',
    addressLine1: '',
    addressLine2: '',
    occasion: '',
    gotram: '',
    nakshtram: '',
    raasi: '',
    mode: ''
  };
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
      first_name: formValue.firstName,
      last_name: formValue.lastName,
      address_line1: formValue.addressLine1,
      address_line2: formValue.addressLine2,
      occasion: formValue.occasion,
      gotram: formValue.gotram,
      nakshtram: formValue.nakshtram,
      raasi: formValue.raasi,
      payment_mode: formValue.mode,
      seva_name: seva.sevaName,
      seva_date: seva.sevaDate,
      amount: seva.amount
    }));
  console.log('formData--',formData)
    this.appService.submitMultipleSevaData(formData).subscribe({
      next: (response) => { 
        console.log('Form saved successfully:', response);
        alert('Form submitted successfully!');
        this.printSevaDetails(formData);
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
  fetchFormDetails(mobileNo: string): void {
    this.appService.getFormDetailsByMobileNo(mobileNo).subscribe(
      data => {
        if (data) {
          this.patchFormValues(data);
        } else {
          console.log('No data found, please enter details manually.');
        }
      },
      error => {
        console.error('Error fetching form details:', error);
      }
    );
  }

  patchFormValues(data: any): void {
    this.formData = {
      phoneNo: data.mobile_no,
      firstName: data.first_name,
      lastName: data.last_name,
      addressLine1: data.address_line1,
      addressLine2: data.address_line2,
      occasion: data.occasion,
      gotram: data.gotram,
      nakshtram: data.nakshtram,
      raasi: data.raasi,
      mode: data.payment_mode
    };
  }
  printSevaDetails(formData: any[]): void {
    // Create a new window for printing
    const printWindow = window.open('', '_blank', 'width=600,height=800');
    
    if (!printWindow) {
      alert('Please disable pop-up blocker to print the receipt');
      return;
    }
      const printContent = `
      <html>
        <head>
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
          <title>Seva Details Receipt</title>
          <style>
            @page {
              size: 400px 600px;
              margin: 0;
            }
            body { 
              font-family: 'Open Sans', sans-serif;
              width: 600px;
              max-width: 600px;
              margin: 0 auto;
              padding: 0;
              box-sizing: border-box;
              color: #333;
            }
            .receipt-container {
              border: 2px solid #2c3e50;
              width: 500px;
              margin: 50px auto;
              padding: 20px;
              box-sizing: border-box;
              box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }
            .receipt-header {
              text-align: center;
              margin-bottom: 20px;
            }
            .receipt-header h1 {
              font-family: 'Montserrat', sans-serif;
              margin: 0;
              font-size: 16px;
              font-weight: 700;
              color: #2c3e50;
              text-transform: uppercase;
              letter-spacing: 1px;
            }
            .receipt-header h2 {
              font-family: 'Montserrat', sans-serif;
              margin: 5px 0;
              font-size: 12px;
              font-weight: 600;
              color: #34495e;
            }
            .receipt-header h3 {
              margin: 5px 0;
              font-size: 10px;
              color: #7f8c8d;
            }
            .divider {
              border-top: 1px solid #2c3e50;
              margin: 15px 0;
            }
            .details-section h3,
            .seva-section h3 {
              font-family: 'Montserrat', sans-serif;
              font-size: 14px;
              font-weight: 700;
              color: #2c3e50;
              border-bottom: 2px solid #2c3e50;
              padding-bottom: 5px;
              margin-bottom: 10px;
            }
            .details-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 10px;
            }
            .detail-item {
              display: flex;
              margin-bottom: 5px;
            }
            .detail-label {
              font-family: 'Montserrat', sans-serif;
              font-weight: 600;
              margin-right: 5px;
              min-width: 100px;
              color: #2c3e50;
            }
            .detail-value {
              flex-grow: 1;
              color: #34495e;
            }
            .full-width-item {
              grid-column: 1 / -1;
            }
            .seva-details {
              width: 100%;
              border-collapse: collapse;
              margin-top: 15px;
            }
            .seva-details th {
              font-family: 'Montserrat', sans-serif;
              font-weight: 700;
              background-color: #f4f6f7;
              color: #2c3e50;
              padding: 8px;
              border-bottom: 2px solid #2c3e50;
            }
            .seva-details td {
              padding: 8px;
              border-bottom: 1px solid #ecf0f1;
            }
            .total-row {
              font-weight: bold;
              background-color: #f4f6f7 !important;
              border-top: 2px solid #2c3e50;
            }
            .receipt-footer {
              text-align: center;
              margin-top: 20px;
              font-size: 10px;
              color: #7f8c8d;
              font-style: italic;
            }
          </style>
        </head>
        <body>
          <div class="receipt-container">
            <div class="receipt-header">
              <h1>SRI SRINGERI JAGADGURU MAHASAMSTHANM</h1>
              <h2>SRI SHANKARA MATHAM, MOTI NAGAR</h2>
              <h3>HYDERABAD PH.NO. 040-23833837</h3>
            </div>
            
            <div class="divider"></div>
            
            <div class="details-section">
              <h3>Personal Details</h3>
              <div class="details-grid">
                <div class="detail-item">
                  <span class="detail-label">Receipt No:</span>
                  <span class="detail-value">${this.receiptNo}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Date:</span>
                  <span class="detail-value">${new Date().toLocaleDateString()}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Name:</span>
                  <span class="detail-value">${formData[0].first_name} ${formData[0].last_name}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Mobile:</span>
                  <span class="detail-value">${formData[0].mobile_no}</span>
                </div>
                <div class="detail-item full-width-item">
                  <span class="detail-label">Address:</span>
                  <span class="detail-value">${formData[0].address_line1}, ${formData[0].address_line2}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Occasion:</span>
                  <span class="detail-value">${formData[0].occasion}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Gotram:</span>
                  <span class="detail-value">${formData[0].gotram}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Nakshtram:</span>
                  <span class="detail-value">${formData[0].nakshtram}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Raasi:</span>
                  <span class="detail-value">${formData[0].raasi}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Payment Mode:</span>
                  <span class="detail-value">${formData[0].payment_mode}</span>
                </div>
              </div>
            </div>
            
            <div class="divider"></div>
            
            <div class="seva-section">
              <h3>Seva Details</h3>
              <table class="seva-details">
                <thead>
                  <tr>
                    <th style="width: 40%">Seva Name</th>
                    <th style="width: 30%">Seva Date</th>
                    <th style="width: 30%; text-align: right;">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  ${formData.map(seva => `
                    <tr>
                      <td>${seva.seva_name}</td>
                      <td>${seva.seva_date ? new Date(seva.seva_date).toLocaleDateString() : 'N/A'}</td>
                      <td style="text-align: right;">₹${seva.amount.toFixed(2)}</td>
                    </tr>
                  `).join('')}
                </tbody>
                <tfoot>
                  <tr class="total-row">
                    <td colspan="2">Total Amount</td>
                    <td style="text-align: right;">₹${this.grandTotal.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            
            <div class="receipt-footer">
              <p>Thank you for your generous contribution</p>
            </div>
          </div>
        </body>
      </html>
    `;
  
    // Write the content to the new window
    printWindow.document.write(printContent);
    
    // Close the document writing
    printWindow.document.close();
    
    // Trigger print
    printWindow.print();
  }
}