import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements AfterViewInit {

  ngOnInit(){
    console.log("I'm in web view ng onit");
  }
  ngAfterViewInit() {

    (window as any).addEventListener("ns-bridge-ready", function(e) {


      console.log("I'm in web ngAfterViewInit");
      (window as any).nsWebViewBridge.on('webReceiverEvent', function(msg: any) {
          // alert(JSON.stringify(msg.data));
          console.log("I'm in web view");
          alert("good to go");
  });

 });
}
  title = 'native-wrapper';
  initiateScannerEvent() {
    //alert("I've been clicked!")

    var nsWebViewBridge = (window as any).nsWebViewBridge;
    nsWebViewBridge.emit('scannerEvent', { trigger: true });
}
}

