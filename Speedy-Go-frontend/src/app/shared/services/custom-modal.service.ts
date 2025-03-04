import { Injectable, ComponentRef, ComponentFactoryResolver, ApplicationRef, Injector } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomModalService {
  private componentRef!: ComponentRef<any>;
  private afterClosedSubject = new Subject<any>();

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  open(config: { component: any, data: any, width: string, maxHeight: string, position: any, panelClass: string }): any {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(config.component);
    this.componentRef = componentFactory.create(this.injector);

    Object.assign(this.componentRef.instance, config.data);

    this.appRef.attachView(this.componentRef.hostView);
    const domElem = (this.componentRef.hostView as any).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    return {
      afterClosed: () => this.afterClosedSubject.asObservable()
    };
  }

  close(result: any): void {
    this.appRef.detachView(this.componentRef.hostView);
    this.componentRef.destroy();
    this.afterClosedSubject.next(result);
    this.afterClosedSubject.complete();
  }
}
