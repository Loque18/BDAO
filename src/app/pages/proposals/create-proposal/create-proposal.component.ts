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
  savedUsers : userData[] = []

  constructor(private userService : UserDataService) { }


  changeID(ID : any) : void {
    this.userID = ID.target.value
    this.userService.getID(this.userID).subscribe(user =>{
      this.user = user
    })
  }

  postUser(id : any){
    if (this.user) {
    this.savedUsers.push(this.user);
    }
  }
 
  add(title : string) : void{
    title = title.trim()
    if (!title) {return;}
    this.userService.addUser({title} as userData)
    .subscribe((user) => {
      this.users?.push(user)
      console.log('User added:', user);
    })
    console.log(this.users)
  }

  save() : void{
    if(this.user){
      this.userService.updateUser(this.user)
      .subscribe(() => console.log("worked"))
    }
  }

  delete(user : userData): void{
    this.users = this.users?.filter(h => h !== user)
    this.userService.deleteUser(user.id).subscribe()
  }

  ngOnInit(){
    this.userService.getData().subscribe(users =>
      this.users = users)
      console.log(this.users)
    }
    
  }

