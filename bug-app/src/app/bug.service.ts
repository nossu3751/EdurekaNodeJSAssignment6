import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BugService {
  url:string;

  constructor(private http:HttpClient) { 
    this.url = "http://localhost:8003/api/bugs"
  }

  getAllBugs():Observable<any>{
    return this.http.get(this.url);
  }

  addBug(bug:any):Promise<any>{
    return new Promise((resolve)=>{
      this.http.post(this.url, bug).subscribe((data)=>{
        resolve(data);
      },(error)=>{
        resolve(null);
      })
    })
  }

  updateBug(bug:any):Promise<any>{
    return new Promise((resolve)=>{
      this.http.put(this.url, bug).subscribe((data)=>{
        resolve(data);
      },(error)=>{
        resolve(null);
      })
    })
  }

  deleteBug(bug:any):Promise<any>{
    return new Promise((resolve)=>{
      this.http.delete(this.url,bug).subscribe((data)=>{
        resolve(true);
      },(error)=>{
        resolve(false);
      })
    })
  }

}
