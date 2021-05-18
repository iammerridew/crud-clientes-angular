import {
  Component,
  ViewChild,
  ElementRef,
  Input,
  AfterViewInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

declare var H: any;

@Component({
  selector: 'app-here-map',
  templateUrl: './here-map.component.html',
  styleUrls: ['./here-map.component.scss'],
})
export class HereMapComponent implements AfterViewInit {
  @Output()
  updateCords = new EventEmitter<any[]>();

  @ViewChild('map')
  public mapElement!: ElementRef;

  @Input()
  public lat: any;

  @Input()
  public lng: any;

  @Input()
  public width: any;

  @Input()
  public height: any;

  constructor(private route: Router) {
    this.platform = new H.service.Platform({
      apikey: environment.heremap_key,
    });
  }

  private platform: any;
  private map: any;
  private behavior: any;
  private ui: any;
  public defaultLayers: any;
  public marker: any;

  ngAfterViewInit() {
    this.defaultLayers = this.platform.createDefaultLayers();
    this.map = new H.Map(
      this.mapElement.nativeElement,
      this.defaultLayers.vector.normal.map,
      {
        zoom: 12,
        center: { lat: this.lat, lng: this.lng },
      }
    );

    this.behavior = new H.mapevents.Behavior(
      new H.mapevents.MapEvents(this.map)
    );

    this.ui = H.ui.UI.createDefault(this.map, this.defaultLayers, 'es-ES');

    this.marker = new H.map.Marker({
      lat: this.lat,
      lng: this.lng,
    });
    this.map.addObject(this.marker);

    if (this.route.url.split('/')[1] !== 'details') {
      this.setUpClickListener();
    }
  }

  setUpClickListener() {
    this.map.addEventListener('tap', (evt: any) => {
      var coord = this.map.screenToGeo(
        evt.currentPointer.viewportX,
        evt.currentPointer.viewportY
      );
      this.marker.setGeometry({
        lat: coord.lat.toFixed(4),
        lng: coord.lng.toFixed(4),
      });
      this.onUpdateCords(coord.lat.toFixed(4), coord.lng.toFixed(4));
    });
  }

  onUpdateCords(lat: string, lng: string) {
    this.updateCords.emit([lat, lng]);
  }
}
