import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {

  selectedFile: File | string | Blob = "";
  imgName: string = '';
  errorMessage: string = '';

  select=true;
  upload=false;

  constructor(private http: HttpClient, private imgService: ImageService) {}

  ngOnInit(): void {
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.imgName = event.target.files[0].name;
    this.select = !this.select;
    this.upload = !this.upload;
  }

  onUpload() {
    console.log(this.selectedFile);
    alert('On upload');
    
    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.imgName);


    //Make a call to the Spring Boot Application to save the image
    this.imgService.uploadImg(uploadImageData).subscribe({
      next: (response) => {
          alert('Image uploaded successfully');
          this.select = !this.select;
          this.upload = !this.upload;
      },
        error: (error) => {
          this.errorMessage="Error, please try again";
          alert('Image did not upload, please try again');
      }
    });
  }
}
