import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

//plugin que se adicionaron
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { ToastController } from 'ionic-angular';
import { File } from '@ionic-native/file';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  promoSliders: any[];
 // products: any[] = [];
  productRows:any;
  promoImagesLoaded:boolean=false;
  //parte de las tarjetas
  products: any[];
  products2: any[];
  //parte del previsualizador
  productsUp: any;
  //sliders
  file: File [];
  img1:any
  vnombre2:string
  productCount: number = 1;
  id:any //"1a0a1a0a1a0a-08a6-df2b" ;
  vnombre:any
  vprecio:any
  images:any=[]

@ViewChild('slides')  slides: Slides
active_slide_index: number = 1;
active_slide_index1: number = 1;
active_slide_index2: number = 2;
active_slide_index3: number = 3;


myForm =this.formBuilder.group({
  producto: ['', Validators.compose([Validators.minLength(1),Validators.maxLength(100), Validators.required])],
  precio: ['', Validators.compose([Validators.minLength(0),Validators.maxLength(10), Validators.pattern('[0-9]*'), Validators.required])],
     });


  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    private transfer: FileTransfer,
    public files: File,
    public toastCtrl: ToastController,
    ) {

      
        // imagenes del menu Inferior
        this.products = [{
          nam: 'Jugo',
          pre: '2',
          img: 'http://lorempixel.com/350/200', 
          idt: '',
          cat: '',
          des: '',
          ofe: '',

        },
        {
          nam: 'Piza',  
          pre: '15', 
          img: 'http://lorempixel.com/400/200',
          idt: '',
          cat: '',
          des: '',
          ofe: '',
        },
        {
        nam: 'Pan con pasta',
          pre: '5',
          img: 'http://lorempixel.com/500/300',
          idt: '',
          cat: '',
          des: '',
          ofe: '',
        }
        ]; 

        // imagenes del slider
        this.products2 = [{
          nam: 'Pepe Mensajero',
          pre: '', 
          img:  'assets/imgs/1.jpg',
          idt: '',
          cat: '',
          des: '',
          ofe: '',
        },
        {
          nam: 'Pepe Mensajero',  
          pre: '', 
          img: 'assets/imgs/2.jpg',
          idt: '',
          cat: '',
          des: '',
          ofe: '',
        },
        {
          nam: 'Pepe Mensajero',
          pre: '',
          img: 'assets/imgs/3.jpg',
          idt: '',
          cat: '',
          des: '',
          ofe: '',
        }
        ];

  }



  ionViewWillEnter() {  
    
  }
 
  ionViewDidLeave() {
  }
 
  ionViewDidLoad() {
   this.id="d9d58a" ; 
  }

  next() {
    this.slides.slideNext();
  } 

  changeListener($event) : void {
   
    if($event.target.files && $event.target.files[0])
    {
      let reader = new FileReader();

      reader.onload = (event:any) => {
        this.img1 = event.target.result;
       console.log(this.img1);
        // get the blob of the image:
        let blob: Blob = new Blob([new Uint8Array((reader.result as ArrayBuffer))]);//prueba
        // create blobURL, such that we could use it in an image element:
        let blobURL: string = URL.createObjectURL(blob);//prueba
      // console.log(blobURL)
      }

      //const file = $event.target.files[0];//prueba 
      //reader.readAsDataURL(file);//prueba
      reader.readAsDataURL($event.target.files[0]);
     
    }
      let fileList: FileList = $event.target.files;  
  //    let file: File = fileList[0];
  //    console.log(file);

 /*    if(!this.myForm.valid){  
      this.presentToast4('Error en los datos ');             
    } 
    else {

    } */

  }
 

  upload() {
    
   const fileTransfer: FileTransferObject = this.transfer.create();

    let options1: FileUploadOptions = {
       fileKey: 'file',
       fileName: 'file.jpg',
       chunkedMode:false,
       httpMethod:'post',
       mimeType:'image/jpeg',
       headers: {}
    }

      fileTransfer.upload(this.img1, 'http://localhost/habanaservicentroService/public/api/subirfoto', options1)
      .then((data) => {
        // success
        console.log(data);
        alert("success");
      }, (err) => {
        // error  
        console.log(err);
        alert("error"+JSON.stringify(err));
      });
  
}

  save(){
            
        let fil
          
          if(this.img1){
          fil=this.img1
          }else{
            fil="nohay"
          }
        
          this.productsUp =  {
                                    
            "idt":this.id,
            "fi1":fil,//this.file,
            "cat":true, //this.vestado
                
              }; 
            
          console.log(this.productsUp);

  }


}