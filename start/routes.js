"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.on("/").render("welcome");
Route.group(() => {
  Route.get("/signup", "AuthController.index");
  Route.post("/signup", "AuthController.register");
  Route.post("/login", "AuthController.login");
})
  .prefix("api")
  .middleware(["guest"]);

Route.group(() => {
  Route.post("/logout", "AuthController.logout");
  Route.resource("curriculum", "CarriculumController");
  Route.resource("subject", "SubjectController");
  Route.resource("question", "QuestionController");
})
  .prefix("api")
  .middleware(["auth"]);
