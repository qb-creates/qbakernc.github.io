import { Component, Output } from '@angular/core';
import { NgxSerial } from 'ngx-serial';

@Component({
  selector: 'app-bluetooth-listing',
  templateUrl: './bluetooth-listing.component.html',
  styleUrls: ['./bluetooth-listing.component.css']
})
export class BluetoothListingComponent{
  serial:NgxSerial;
  port:any;
  peak:number;

  @Output() heartRate = "";
  constructor() 
  { 
    let options = 
    { 
      baudRate: 115200, 
      dataBits: 8, 
      parity: 'none', 
      bufferSize: 256, 
      flowControl: 'none' 
    };
    
    this.serial = new NgxSerial(data=>{
      this.data = data;
      console.log(data);
    }, options);
  }
  @Output() data!:string;

  SearchDevices(){    
    this.serial.connect((port:any) =>{
      console.log(port);
    });
  }

  SearchBluetooth() {
    this.heartRate = "";
    let options = {
      filters: [
        {services: ['heart_rate']},
        {services: [0x1802, 0x1803]},
        {services: ['c48e6067-5295-48d3-8d5c-0395f61792b1']},
        {name: 'ExampleName'},
        {namePrefix: 'Prefix'}
      ],
      optionalServices: ['battery_service']
    } 
    
    return navigator.bluetooth.requestDevice({filters:[{services:[ 'heart_rate' ]}]})
    .then(device => {
      console.log('did we make it');
      return device.gatt.connect();
    })
    .then(server => {
      console.log('did we make it');
      return server.getPrimaryService('heart_rate');
    })
    .then(service => {
      console.log('did we make it');
      return service.getCharacteristic('heart_rate_measurement');
    })
    .then(characteristic => {
      characteristic.startNotifications().then(()=>{
        characteristic.addEventListener('characteristicvaluechanged', ()=>{
          if(characteristic.value){
            let length = characteristic.value.byteLength;
          
          let a = [];

          for (let i = 0; i < length; i++) {
            a.push(characteristic.value.getUint8(i).toString().slice(-2));
          }
          console.log('> ' + a.join(' '));
          this.heartRate = a[1];
        }
        });
      });
    }).catch(error => {
      console.log('Argh!! ' + error);
    });
  }
}
