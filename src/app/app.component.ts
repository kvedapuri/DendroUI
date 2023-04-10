import { Component } from '@angular/core';
import { StorageService } from './_services/storage.service';
import { AuthService } from './_services/auth.service';
import { BnNgIdleService } from 'bn-ng-idle'; //  component to auto logoff.
import { NgcCookieConsentService, NgcInitializationErrorEvent, NgcInitializingEvent, NgcNoCookieLawEvent, NgcStatusChangeEvent } from 'ngx-cookieconsent';
import { Subscription }   from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  username?: string;

  // keep refs to subscriptions to be able to unsubscribe later
  private popupOpenSubscription!: Subscription;
  private popupCloseSubscription!: Subscription;
  private initializingSubscription!: Subscription;
  private initializedSubscription!: Subscription;
  private initializationErrorSubscription!: Subscription;
  private statusChangeSubscription!: Subscription;
  private revokeChoiceSubscription!: Subscription;
  private noCookieLawSubscription!: Subscription;


  constructor(private storageService: StorageService, private authService: AuthService, private bnIdle: BnNgIdleService, private cookieService: NgcCookieConsentService) { }

  ngOnInit(): void {

        // subscribe to cookieconsent observables to react to main events
        this.popupOpenSubscription = this.cookieService.popupOpen$.subscribe(
          () => {
            // you can use this.cookieService.getConfig() to do stuff...
          });
    
        this.popupCloseSubscription = this.cookieService.popupClose$.subscribe(
          () => {
            // you can use this.cookieService.getConfig() to do stuff...
          });
    
        this.initializingSubscription = this.cookieService.initializing$.subscribe(
          (event: NgcInitializingEvent) => {
            // the cookieconsent is initilializing... Not yet safe to call methods like `NgcCookieConsentService.hasAnswered()`
            console.log(`initializing: ${JSON.stringify(event)}`);
          });
        
        this.initializedSubscription = this.cookieService.initialized$.subscribe(
          () => {
            // the cookieconsent has been successfully initialized.
            // It's now safe to use methods on NgcCookieConsentService that require it, like `hasAnswered()` for eg...
            console.log(`initialized: ${JSON.stringify(event)}`);
          });
    
        this.initializationErrorSubscription = this.cookieService.initializationError$.subscribe(
          (event: NgcInitializationErrorEvent) => {
            // the cookieconsent has failed to initialize... 
            console.log(`initializationError: ${JSON.stringify(event.error?.message)}`);
          });
    
        this.statusChangeSubscription = this.cookieService.statusChange$.subscribe(
          (event: NgcStatusChangeEvent) => {
            // you can use this.cookieService.getConfig() to do stuff...
          });
    
        this.revokeChoiceSubscription = this.cookieService.revokeChoice$.subscribe(
          () => {
            // you can use this.cookieService.getConfig() to do stuff...
          });
    
          this.noCookieLawSubscription = this.cookieService.noCookieLaw$.subscribe(
          (event: NgcNoCookieLawEvent) => {
            // you can use this.cookieService.getConfig() to do stuff...
          });
          
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      // this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }

    // Auto Logout on user Inactive for 1 min, 1 min=60 seconds.
    this.bnIdle.startWatching(1200).subscribe((res) => {
      if (res) {
        console.log('session expired');
        this.logout();
      }
    });

  }

  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();

        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }

  ngOnDestroy() {
    // unsubscribe to cookieconsent observables to prevent memory leaks
    this.popupOpenSubscription.unsubscribe();
    this.popupCloseSubscription.unsubscribe();
    this.initializingSubscription.unsubscribe();
    this.initializedSubscription.unsubscribe();
    this.initializationErrorSubscription.unsubscribe();
    this.statusChangeSubscription.unsubscribe();
    this.revokeChoiceSubscription.unsubscribe();
    this.noCookieLawSubscription.unsubscribe();
  }
}