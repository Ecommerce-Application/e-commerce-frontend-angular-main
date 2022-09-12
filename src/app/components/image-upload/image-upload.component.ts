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

  retrievedImage: any;
  pic_name_placeholder: string = '';

  select=true;
  upload=false;

  constructor(private http: HttpClient, private imgService: ImageService) {}

  ngOnInit(): void {
    this.getProfilePic();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.imgName = event.target.files[0].name;
    this.select = !this.select;
    this.upload = !this.upload;
  }

  onUpload() {
    this.errorMessage="";
    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.imgName);


    //Make a call to the Spring Boot Application to save the image
    this.imgService.uploadImg(uploadImageData).subscribe({
      next: (response) => {

        if (this.selectedFile) {
          this.getProfilePic();
          this.select = !this.select;
          this.upload = !this.upload;
          this.errorMessage="";
        }
      },
        error: (error) => {
        this.errorMessage="File size too large";
        this.select = !this.select;
        this.upload = !this.upload;
      }
    });
  }

  getProfilePic() {
    this.imgService.getImg().subscribe({
      next: (response: any) => {
        this.pic_name_placeholder = response.body.picName;
        this.retrievedImage = "data:" + response.body.picType + ";base64," + response.body.picByte;
        this.errorMessage="";
      },
    });
  }

}
