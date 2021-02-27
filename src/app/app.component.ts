import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass']
})


export class AppComponent implements AfterViewInit {
    constructor(
        private cdrf: ChangeDetectorRef){
    }
    clicked = true;
    ngOnInit() {
        console.log("I'm in web view ng onit");
    }
    ngAfterViewInit() {
        // it works for current version
        // window.addEventListener('load', (event) => {
        //     setTimeout(() => {
        //         (window as any).nsWebViewBridge.on('webReceiverEvent', (data) => {
        //             alert("back in web");
        //             this.toggleClick();
        //             console.log('markers event from native'); console.dir(data);
        //         });
        //     }, 100);
        // });
        //its the previous code
        // window.addEventListener("ns-bridge-ready", function (e) {
        //     setTimeout(() => {
        //         (window as any).nsWebViewBridge.on('webReceiverEvent', function (msg: any) {
        //             // alert(JSON.stringify(msg.data));
        //             alert("good to go");
        //         });
        //     }, 1000);
        // });
        window.addEventListener('load', ()=> {
            setTimeout(() => {
                (window as any).nsWebViewBridge.on('webReceiverEvent',  ((msg: any)=> {
                    this.title = 'changed native';
                    this.toggleClick();
                    alert(JSON.stringify(msg.message)); 
                }));
            }, 1000); 
        });
    }
    title = 'native-wrapper';
    initiateScannerEvent() {
        //this.toggleClick();
        var nsWebViewBridge = (window as any).nsWebViewBridge;
        nsWebViewBridge.emit('scannerEvent', { trigger: true });
    }
    anotherfunction(){
        alert("I'm in another function");
        this.toggleClick();
    }
    toggleClick(){
        debugger
        console.log("I'm in toggle function 1" +this.clicked);
        if(this.clicked){
            this.clicked = false;
        } else {
            this.clicked = true;
        }
        this.cdrf.detectChanges();
        this.cdrf.markForCheck();
        //alert("I'm in toggle function");
        console.log("I'm in toggle function 2" + this.clicked);
    }
}

