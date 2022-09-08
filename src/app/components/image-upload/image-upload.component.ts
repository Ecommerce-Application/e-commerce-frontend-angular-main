import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {

  selectedFile: File | string | Blob = '';
  imgName: string = '';
  errorMessage: string = '';

  select=true;
  upload=false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
    this.select = !this.select;
    this.upload = !this.upload;
  }

  onUpload() {
    console.log(this.selectedFile);
    
    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.imgName);
  
    //Make a call to the Spring Boot Application to save the image
    this.http.post('http://localhost:5000/image/upload', uploadImageData, { observe: 'response' })
      .subscribe((response: { status: number; }) => {
        if (response.status === 200) {
          this.errorMessage = 'Image uploaded successfully';
        } else {
          this.errorMessage = 'Image did not upload, please try again';
        }
      }
      );
      this.select = !this.select;
      this.upload = !this.upload;
  }
}
