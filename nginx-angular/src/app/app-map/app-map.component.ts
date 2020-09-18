import { Component, OnInit } from '@angular/core';
import { AppMapService } from './app-map.service';
import { MessageService } from '../message/message.service';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { Map } from 'mapbox-gl';
import { FeatureCollection } from 'geojson';

@Component({
  selector: 'app-app-map',
  templateUrl: './app-map.component.html',
  styleUrls: ['./app-map.component.css']
})

export class AppMapComponent implements OnInit {
  selectedCluster: any;
  draw: any;
  map: Map;
  featureCollection: FeatureCollection = {
    type: 'FeatureCollection',
    features: []
  };


  constructor(private appMapService: AppMapService, private messageService: MessageService) {
  }

  loadMap(map: Map) {
    this.map = map;
    this.draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true
      }
    });
    this.map.addControl(this.draw, 'top-right');
    this.map.on('draw.update', this.updateArea.bind(this));
    this.map.on('draw.create', this.updateArea.bind(this));
    this.map.on('draw.delete', this.deleteArea.bind(this));

  }

  deleteArea(): void {
    this.featureCollection = {
      type: 'FeatureCollection',
      features: []
    };
    this.selectedCluster = null;
  }

  setCenter(feature: any): void {
    this.map.setCenter(feature.geometry.coordinates);
  }

  updateArea(): void {
    let data = this.draw.getAll();
    let features = data.features;

    // only allow one polygon to be drawn at a time
    if (features.length > 1) {
      features.shift();
    }

    data.features = features;
    this.draw.set(data);

    // search using the latest polygon
    this.appMapService.postData(data.features[0].geometry).subscribe(res => {
      this.featureCollection = res.featureCollection;
      this.messageService.success(`Found ${this.featureCollection.features.length} events`);
    });
  }

  ngOnInit() {
  }
}
