<h3>What URL should be used to access your application?</h3>
<p>
  Answer: After doing an NPM install and starting the node server, you can access the application at http://localhost:8888/
</p>
<h3>What libraries did you use to write your application?</h3>
<p>
Answer:
</p>
<ol>
  <li>
     "jquery": "^2.2.4", 
  </li>
  <li>
     "lodash": "^4.13.1", 
  </li>
  <li>
     "angular": "^1.4.0",
  </li>
  <li>
     "bootstrap": "^3.2.0", (css & js)
  </li> 
  <li>
    "angular-cookies": "^1.4.0",
  </li>
  <li>
    "angular-route": "^1.4.0",
  </li>
  <li>
     "restangular": "^1.5.2",
  </li>
  <li>
     "angular-paging": "^2.2.2",
  </li>
  <li>
    "angular-strap": "^2.3.9"
  </li>   
</ol>

<h3>What influenced the design of your user interface?</h3>
<p>
  Answer: The user interface is greatly influenced by ease-of-use and clean, minimalistic design.
    My main goal about the design is for the user to clearly understand what he/she needs to do and not to think twice about the task at hand.
</p>

<h3>What steps did you take to make your application user friendly?</h3>
<p>
  Answer:
</p>
<ol>
 <li>Ensure keyboard support on forms and navigations.</li>
 <li>Support for redirecting user to the page he/she wants to navigate once authenticated from the log-in page.</li>
 <li>Responsive design so user can view the application correctly on smaller devices.</li>
 <li>Since application is a cookie based system, ensure to show the user a message if his/her browser's cookie feature is disabled.</li>
 <li>
     Support on browser's bookmark feature of data on US States table. Everytime the user navigate on the table maybe clicking on different pages or sorting a column, the url on that page updates also. Thus giving the user
     the ability to bookmark or maybe even share to someone for future reference. It's simple but powerful feature especially on a Single Page application.
 </li>
 <li>
   I also consider other developers that might maintain this application as <b>user</b>. Since this is an AngularJs application, organization and structure of assets and files are highly important. I greatly take into account the maintainability and
   ease-of-use in development and also on deployment. One example is by using bower on managing the libraries used in the application. This is like the NPM in Node but with javascript libraries. I also used yeoman in building this application. In yeoman, you 
   can create Angular components thru the command line making all those repetitive/boring tasks automated thus making a developer efficient.
 </li>
</ol>
<h3>What steps did you take to insure your application was secure?</h3>
<ol>
  <li>Implement a cookie-based authentication system.</li>
  <li>
      Implement an Authentication Interceptor service that is available application-wide. This is an Angular Service that keep tracks of all responses from the server. 
      Example, say if it happened that the server returned a 401 on a specific request and a user cookie is still set on the browser, 
      the application will log-out the user immediately by deleting the cookie and set necessary flags back to Unauthenticated at the same time, redirect the user to the log-in page.
      Adding new features for authenticated user in the future is right away protected. 
  </li>
  <li>
     Implement a per AngularJs route access flag that has an object value. The value of that object will determine if a user needs to be authenticated or not to access that route. Setting the object's value to true will make a single route available to authenticated users only.
  </li>
  <li>
    XSS protection through AngularJs. The framework automatically escapes data through ng-bind or the {{ curly brace syntax }}. This means it outputs the literal characters instead of interpreting them as HTML.
  </li>
</ol>
<h3>What could be done to the front end or back end to make it more secure?</h3>
<p>
  Answer:
</p>
<ol>
  <li>
     Require a secure connection using HTTPS. Tell the browser to only send the cookie if the request is being sent over HTTPS.
  </li>
  <li>
     Implement rate limiting on the back end to prevent from brute force attack.
  </li>
  <li>
     Separate the server side API using CORS. 
  </li>
  <li>
     Sanitize data on the back end by using filter/sanitizer. 
  </li>
  <li>
     Use token-based authentication (JWT) instead of cookie or session. 
  </li>
  <li>
    Configure front and back end to pass CSRF token on forms submission, etc.
  </li>
  <li>
    Configure back end to set the path argument for cookie to a specific limited path. The default value of "/" means every request will get the cookie, while "/forums/" would limit the cookie to just that path.
  </li>
</ol>
