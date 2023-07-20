# Ask for Help Form

## About the Project
Giving Kitchen (GK) is a non-profit based in Atlanta, GA which provides emergency financial assistance to food & beverage workers who are experiencing a crisis. The first step an applicant takes is to fill out the Ask for Help form, which GK uses to determine 1) if the applicant is eligible for help, and if so 2) who the applicant should be assigned to internally. GK worked with a consultant to re-design the Ask for Help form in the hopes that it will automate more of that process, because the current procedure is that someone has to review each form and forward it along. I was given an outline of the process and took the first stab at making a form from it. While my form won't actually be the one GK uses, they did ask me to present the form to the consultant so that I could give them an idea of how the final product might function. My design will update dynamically depending on the responses the applicant chooses (for instance, if the crisis is related to loss of housing, it will ask if the housing was affected by tornado, fire, mold, flood, etc). The end of the form asks for the applicant's mailing address. To prevent spelling / grammar errors, I applied use-places-autocomplete to suggest the address as the user types it in (use-places-autocomplete pulls from the Google addresses API). A requirement of the project was that it should be front-end only, so I used Firebase to store the application data rather than a SQL database.

## Built With
- React
- Redux
- Material UI
- JavaScript
- Firebase / Firestore
- use-places-autocomplete

<img width="1785" alt="image" src="https://github.com/kathryntoney/gk-form/assets/127783825/3404fdbc-791c-4d28-ae58-d6e7589267c3">

## Links:
- Final project: https://gkaskforhelp.netlify.app/
- My portfolio: https://kathryntoney.com
- My LinkedIn: https://www.linkedin.com/in/katietoney/
