import {
  AfterContentChecked,
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import {Image} from '../../../../api/article/model/image';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {ArticlesService} from '../../../../api/article/articles.service';
import {DialogService} from '../../../../shared/dialog/service/dialog.service';
import {rotateInAnimation, rotateOutAnimation} from 'angular-animations';
import {ImageManagerService} from './service/image-manager.service';

@Component({
  selector: 'app-image-manager',
  templateUrl: './image-manager.component.html',
  styleUrls: ['./image-manager.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    rotateInAnimation({anchor: 'in', duration: 300}),
    rotateOutAnimation({anchor: 'out', duration: 300}),
  ],
})
export class ImageManagerComponent implements OnInit, AfterContentChecked {
  @ViewChild("container") container: ElementRef | undefined;
  @ViewChild("imageContainer") imageContainer: ElementRef | undefined;
  public imageSize: 'large' | 'small' | 'medium';
  public change: boolean;
  draggedIndex: number | undefined;
  marginLeftToCenter: any;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private articlesService: ArticlesService,
    private dialogService: DialogService,
    private ngZone: NgZone,
    private imageManager: ImageManagerService
  ) {
    this.imageSize = 'small';
    this.change = false;
  }


  public ngAfterContentChecked(): void {
    this.centerImages();
    this.changeDetector.detectChanges();
  }

  private handleImageUploaded = (): void => {
    this.changeDetector.detectChanges();
  };

  get images(): Image[] {
    return this.imageManager.images;
  }

  get loadedFiles(): number {
    return this.imageManager.uploadedImages;
  }

  get allFiles(): number {
    return this.imageManager.files;
  }

  ngOnInit(): void {
    this.centerImages();
    this.imageManager.sortImageAsc();
    this.imageManager.isImageUploaded.subscribe(this.handleImageUploaded);
  }

  public async uploadFiles(files: File[]): Promise<void> {
    this.imageManager.createImagesFromFiles(files).then(() => {
    });
  }

  public getImage(index: number): string {
    return this.imageManager.getImagePath(index);
  }

  public identify(index: any, item: any) {
    return item.order;
  }

  public removeImage(event: Event, index: number) {
    event.stopPropagation();
    this.ngZone.run(() => this.handleDeleteDialog(index));
  }

  public ngAfterViewInit(): void {

  }

  public chooseSize(id: number) {
    this.imageSize = 'small';
    if (id === 1) {
      this.imageSize = 'medium';
    }
    if (id === 2) {
      this.imageSize = 'large';
    }
    this.centerImages();
  }

  private getImageSizeInPx(): number {
    if (this.imageSize === 'medium') {
      return 200;
    }
    if (this.imageSize === 'large') {
      return 300;
    }
    return 100;
  }

  private centerImages = (): void => {
    const imageWidth = this.getImageSizeInPx() + 6;
    const width = this.container?.nativeElement.clientWidth;
    const countImages = Math.floor(width / imageWidth);
    const margin = width - (imageWidth * countImages);
    const cssMarginLeft = margin.toFixed(0) + 'px';
    this.marginLeftToCenter = {
      'margin-left': cssMarginLeft,
    };
  };

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.ngZone.runOutsideAngular(this.centerImages);
  }

  public setRootImage(event: MouseEvent, image: Image) {
    this.imageManager.setRootImage(image);
    this.changeDetector.detectChanges();
  }

  private handleDeleteDialog = (index: number): void => {
    this.dialogService.openDialog({
      actionDanger: 'Cancel',
      actionSuccess: 'Delete',
      question: 'Are you sure ?',
      resultHandler: (result) => this.resultHandler(result, index),
    });
  };

  private resultHandler = (result: any, index: number) => {
    if (result) {
      this.imageManager.deleteImage(index);
      this.changeDetector.detectChanges();
    }
  };


  public dragStart(index: number) {
    this.draggedIndex = index;
    this.changeDetector.detectChanges();
  }

  public dragEnd() {
    this.draggedIndex = undefined;
  }

  public drop(event: CdkDragDrop<any>) {
    this.imageManager.handleImageDrop(event);
    this.change = !this.change;
  }
}
