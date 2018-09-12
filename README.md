# Auth
Dit is een angular template die gebruikt kan worden voor authenticatie binnen een Angular omgeving. Het doel van deze repository is tijdbesparing. Lees de uitleg hieronder en je weet wat je moet kopieren/veranderen. 
Note: Er is hier wel vanuit gegaan dat je al een Angular project hebt aangemaakt.

# Mappen die aangepast dienen te worden
1. [app](https://bitbucket.org/socialbrothers/angular-auth/src/master/src/app/)
2. [app/Models/user]()
3. [app/Pages/home (optional)]()
4. [app/Pages/login]()
5. [app/Services/api]()
6. [app/Services/auth]()
7. [app/Environments]()

---

## 1. app 
In de hoofdmap dienen de volgende files aangepast te worden.  
**app.component.html**  
Hier dient die ene regel toegevoegd te worden voor de navigatie binnen de app.  
**app.module.ts**  
Op deze pagina dienen gekopieerd/veranderd te worden:  
**const appRoutes: Hier worden alle paths binnen je applicatie geset. Alle onderdelen die login vereisen dienen 'canActivate: [AuthGuard]}' te hebben. Voor de login pagina is 'canActivate: [AuthGuard]}' niet nodig (anders loopt je dashboard kapot).**  
**Imports: De onderstaande imports dienen toegevoegd te worden.**  
- RouterModule.forRoot(appRoutes, {} ),  
- HttpClientModule,  
- FormsModule,  
- ReactiveFormsModule,  
**Providers: De onderstaande providers dienen toegevoegd te worden.**  
- { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },  
- ApiService,  
- AuthService,  
- AuthGuard,  

## 2. app/Models/user
De volledige folder (of de ene file) kan gekopieerd worden. In deze file worden de getters en setters gezet.

## 3. app/Pages/home (optional)
Deze dient nu als testpagina en hoeft dus niet per s� gekopieerd te worden. Wel dienen alle pagina's die een login bevatten in app.module.ts gedeclareerd te worden bij 'const appRoutes'.

## 4. app/Pages/login
De files login.component.ts en login.component.html kunnen beiden gekopieerd worden. Deze pagina's kunnen uiteraard gestyled worden naar eigen design, houdt wel rekening met de angular onderdelen in login.component.html behouden blijven.

## 5. app/Services/api
- Deze volledige folder kan gekopieerd worden en in jouw project gezet worden. Wanneer oneSignal niet gebruikt wordt comment dan de regels 18,19,20,21 en 24 uit in api-interceptor.ts
- De Path naar de authenticatie kan aangepast worden op regel 36 in api.service.ts

## 6. app/Services/auth
Deze folder kan volledig gekopieerd worden.

## 7. app/Environments
In de file environment.ts kan de apiUrl aangegeven worden naar de locatie van de desbetreffende api. Indien oneSignal niet gebruikt wordt comment de regels 8, 9 en 10.