import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { userData } from 'src/app/constants/users';
import { UserDataService } from './user-data.service';


@Component({
  selector: 'app-create-proposal',
  templateUrl: './create-proposal.component.html',
  styleUrls: ['./create-proposal.component.scss']
})
export class CreateProposalComponent {
  text1 = 'VIP-101 Risk Parameters Adjustments for'
  text2 = ' SXP, TRX and ETH'

  users : userData[] | undefined
  user: userData | undefined
  userID : number = 0

  constructor(private userService : UserDataService) { }



  changeID(ID : any) : void {
    this.userID = ID.target.value
    this.userService.getID(this.userID).subscribe(user =>{
      this.user = user
    })
  }

  add(title : string) : void{
    title = title.trim()
    if (!title) {return;}
    this.userService.addUser({title} as userData)
    .subscribe((user: userData) => {
      this.users?.push(user)
    })
  }

  save() : void{
    if(this.user){
      this.userService.updateUser(this.user)
      .subscribe(() => console.log("worked"))
    }
  }

  /*ngOnInit(){
    this.userService.getID(this.userID).subscribe(user =>{
      this.user = user
    })
  }*/
}
