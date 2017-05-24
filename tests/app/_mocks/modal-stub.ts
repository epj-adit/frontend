import {
  ComponentFactory, EmbeddedViewRef, Injectable, TemplateRef, ViewContainerRef, ViewRef, Injector,
  ComponentRef, NgModuleRef, ResolvedReflectiveProvider
} from "@angular/core";
import { ContainerContent, DialogRef, Maybe, Modal } from "angular2-modal";

@Injectable()
export class OverlayStub {
  defaultViewContainer: ViewContainerRef;
}

