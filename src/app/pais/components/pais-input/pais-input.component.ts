import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styleUrls: ['./pais-input.component.css']
})
export class PaisInputComponent implements OnInit{
  
  @Input() placeholder : string = '';
  @Output() onEnter : EventEmitter<string> = new EventEmitter();
  @Output() onDebouncer: EventEmitter<string> = new EventEmitter();
  debouncer : Subject<string> = new Subject;
  
  termino : string = '';
  
  ngOnInit() {
    this.debouncer
    .pipe(
      debounceTime(300)
    )
    .subscribe( valor => {
      this.onDebouncer.emit(valor);
    });
  }

  //  Metodo 1
  // teclaPresionada( event: any ){
  //   const valor = event.target.value;
  //   console.log(valor);
  // }

  teclaPresionada(){
    this.debouncer.next( this.termino )
  }

  buscar(){
    this.onEnter.emit( this.termino )
  }

}
