import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../classes/user';
import { Alert } from './../classes/alert';
import { AlertService } from './alert.service';
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { switchMap } from 'rxjs/operators';
import { from } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { isError } from 'util';

@Injectable()
export class AuthService {

  public currentUser: Observable<User | null>;


  constructor(
    private router: Router,
    private alertService: AlertService,
    private afAuth: AngularFireAuth,
    private db: AngularFirestore
  ) {
    // Fetch the user from the Firebase backend, then set the user
    this.currentUser = this.afAuth.authState.pipe(switchMap((user) => {
      if (user) {
        return this.db.doc<User>(`Users/${user.uid}`).valueChanges();
      } else {
        return of(null);
      }
    }))
  }

  public signup(firstName: string, lastName: string, email: string, password: string): Observable<boolean> {
    //todo call firebase signup function
    return from(
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then((user) => {
          const userRef: AngularFirestoreDocument<User> = this.db.doc(`Users/${user.user.uid}`);
          const updateUser = {
            id: user.user.uid,
            email: user.user.email,
            firstName,
            lastName,
            photoUrl: 'https://firebasestorage.googleapis.com/v0/b/chat-b1484.appspot.com/o/adorable-cat-close-up-1870320%20Cropped.jpg?alt=media&token=7ad027ab-1d17-4c0b-9777-99dae7ad5446'
          }
          userRef.set(updateUser);
          return true;
        })
        .catch((err) => false)
    );
  }

  public login(email: string, password: string): Observable<boolean> {
    //todo call firebase login function

    return from(
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then((user) => true)
        .catch((err) => false)
    );
  }

  public logout(): void {
    //todo call firebase logout function
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
      this.alertService.alerts.next(new Alert('You have been signed out.'));
    });
  }

}