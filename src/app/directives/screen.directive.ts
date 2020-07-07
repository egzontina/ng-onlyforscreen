import {Directive, HostListener, Input, OnInit, Renderer2, TemplateRef, ViewContainerRef} from '@angular/core';
import {BreakpointObserver, MediaMatcher} from '@angular/cdk/layout';
import {ScreenService} from '../services/screen.service';

@Directive({
    selector: '[onlyForScreen]'
})
export class ScreenDirective implements OnInit {

    widthOfScreen: number;
    device: string;

    constructor(
        private screenService: ScreenService,
        private templateRef: TemplateRef<any>,
        private viewContainerRef: ViewContainerRef,
        private mediaMatcher: MediaMatcher,
        private renderer2: Renderer2,
        private breakpointObserver: BreakpointObserver,
    ) {
        this.widthOfScreen = screenService.iConfig.tablet;
    }

    @Input()
    set onlyForScreen(device: string) {
        this.device = device;
    }

    ngOnInit(): void {
        this.breakpointObserver.observe([
            `(min-width: ${this.screenService.iConfig.mobile}px)`,
            `(min-width: ${this.screenService.iConfig.tablet}px)`
        ]).subscribe(this.deviceListener);
    }

    @HostListener('window:resize', ['$event'])
    deviceListener = () => {

        this.widthOfScreen = window.innerWidth;
        this.viewContainerRef.clear();

        if (this.widthOfScreen < this.screenService.iConfig.mobile) {

            // mobile
            return this.device === 'mobile' && this.viewContainerRef.createEmbeddedView(this.templateRef);

        } else if (
            this.screenService.iConfig.mobile <= this.widthOfScreen &&
            this.widthOfScreen < this.screenService.iConfig.tablet) {

            // tablet
            return this.device === 'tablet' && this.viewContainerRef.createEmbeddedView(this.templateRef);

        } else if (this.screenService.iConfig.tablet <= this.widthOfScreen) {

            // desktop
            return this.device === 'desktop' && this.viewContainerRef.createEmbeddedView(this.templateRef);
        }
    };
}
