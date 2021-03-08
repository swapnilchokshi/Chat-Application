import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  gifs = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient) { }

  getTrendingGifs(){
    return this.http.get(`https://api.giphy.com/v1/gifs/trending?api_key=${environment.giphyApiKey}&limit=80&q=`)
      .subscribe((response: any) => {
        this.gifs.next(response.data);
      });
  }

  searchGifs(gifName: String){
    return this.http.get(`https://api.giphy.com/v1/gifs/search?q=${gifName}&api_key=${environment.giphyApiKey}&limit=80`)
      .subscribe((response: any) => {
        this.gifs.next(response.data);
      });
  }


  getGifs(){
    return this.gifs.asObservable();
  }

}
