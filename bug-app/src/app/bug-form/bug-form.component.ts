import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { BugService } from '../bug.service';

@Component({
  selector: 'app-bug-form',
  templateUrl: './bug-form.component.html',
  styleUrls: ['./bug-form.component.css']
})
export class BugFormComponent implements OnInit {
  bugForm:FormGroup;
  bugs:any[] = [];
  errorMsg:string;
  asyncBugs:BehaviorSubject<any[]> = new BehaviorSubject([] as any);

  constructor(private formBuilder:FormBuilder, private _bugService:BugService) { 
    this.bugForm = formBuilder.group({
      title:['',[Validators.required]],
      description:['',[Validators.required]],
      assignee:['',[Validators.required]]
    })
    this.errorMsg = "";
  }

  resolve(bug:any){
    let id = bug["_id"];
    bug.status = "Resolved";

    this._bugService.updateBug(bug).then((resolve)=>{
      if(resolve == null){
        alert("Couldn't resolve!")
      }else{
        alert("Bug " + id + " resolved!")
        let currBugs = this.asyncBugs.value.filter(
          (b:any) => (
            b._id != id
          )
        )
        currBugs.push(resolve);
        this.asyncBugs.next(currBugs);

      }
    })
  }

  daysLeft(createdAt:string){

    console.log(createdAt);
    let currTime = new Date().getTime();
    let firstTime = new Date(createdAt).getTime();

    let timePassed = (currTime - firstTime) / 1000 / 60 / 60 / 24;
    let timeLeft = 3 - timePassed;

    return timeLeft;
  }

  initiate(){
    if(this.bugForm.invalid){
      this.errorMsg = "Please correct your form."
    }else{
      let title = this.bugForm.get("title")?.value;
      let description = this.bugForm.get("description")?.value;
      let assignee = this.bugForm.get("assignee")?.value;

      let bug = {
        "status":"Initiated",
        "title":title,
        "description": description,
        "assignee":assignee
      }

      this._bugService.addBug(bug).then((res)=>{
        if(res == null){
          alert("Failed to add!");
        }else{
          alert("Successfully Added!");
          let currBugs = this.asyncBugs.value;
          currBugs.push(res);
          this.asyncBugs.next(currBugs);
          this.bugForm.reset();
        }
      })
    }
  }

  ngOnInit(): void {
    this._bugService.getAllBugs().subscribe((data)=>{
      this.bugs = data;
      this.asyncBugs.next(data);
    })

    console.log(new Date().getTime() / 1000 / 60 / 60 / 24);
  }

}
