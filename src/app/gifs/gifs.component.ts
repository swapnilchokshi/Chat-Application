import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gifs',
  templateUrl: './gifs.component.html',
  styleUrls: ['./gifs.component.css']
})
export class GifsComponent implements OnInit, OnDestroy {
  gifs: any[] = [];
  subscription: Subscription;
  public static url: String;

  clickGif(parameter: String) {
    GifsComponent.url = parameter;
    console.log(GifsComponent.url);
  }

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getTrendingGifs();

    this.subscription = this.dataService.getGifs()
      .subscribe((response: any) => {
        this.gifs = response;
      });
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

}
