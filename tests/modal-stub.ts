import {
  ComponentFactory, EmbeddedViewRef, Injectable, TemplateRef, ViewContainerRef, ViewRef, Injector,
  ComponentRef, NgModuleRef, ResolvedReflectiveProvider
} from "@angular/core";
import { ContainerContent, DialogRef, Maybe, Modal } from "angular2-modal";

@Injectable()
export class OverlayStub {
  defaultViewContainer: ViewContainerRef;
}

@Injectable()
export class ViewContainerRefStub extends ViewContainerRef {
  clear(): void {
  }

  get(index: number): ViewRef;
  get(index: number): ViewRef | any;
  get(index: number): any {
  }

  createEmbeddedView<C>(templateRef: TemplateRef<C>, context?: C, index?: number): EmbeddedViewRef<C> {
    return undefined;
  }

  createComponent<C>(componentFactory: ComponentFactory<C>, index?: number, injector?: Injector, projectableNodes?: any[][]): ComponentRef<C>;
  createComponent<C>(componentFactory: ComponentFactory<C>, index?: number, injector?: Injector, projectableNodes?: any[][], ngModule?: NgModuleRef<any>): ComponentRef<C>;
  createComponent<C>(componentFactory, index?, injector?, projectableNodes?, ngModule?): ComponentRef<C> {
    return undefined;
  }

  insert(viewRef: ViewRef, index?: number): ViewRef {
    return undefined;
  }

  move(viewRef: ViewRef, currentIndex: number): ViewRef {
    return undefined;
  }

  indexOf(viewRef: ViewRef): number {
    return undefined;
  }

  remove(index?: number): void {
  }

  detach(index?: number): ViewRef;
  detach(index?: number): ViewRef | any;
  detach(index?: number): any {
  }
}

