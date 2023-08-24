import { userStore } from "../models/user-store.js";

export const accountsController = {
  index(request, response) {
    const viewData = {
      title: "Login or Signup",
    };
    response.render("index", viewData);
  },

  login(request, response) {
    const viewData = {
      title: "Login to the Service",
      loginFailed: false,
    };
    response.render("login-view", viewData);
  },

  logout(request, response) {
    response.cookie("station", "");
    response.redirect("/");
  },

  signup(request, response) {
    const viewData = {
      title: "Login to the Service",
    };
    response.render("signup-view", viewData);
  },

  async register(request, response) {
    const user = request.body;
    await userStore.addUser(user);
    console.log(`registering ${user.email}`);
    response.redirect("/");
  },

  async authenticate(request, response) {
    const user = await userStore.getUserByEmail(request.body.email);
    if (user && user.password === request.body.password) {
      response.cookie("station", user.email);
      console.log(`logging in ${user.email}`);
      response.redirect("/dashboard");
    } else {
      const viewData = {
        title: "Login to the Service",
        loginFailed: true, // Set loginFailed to true
      };
      response.render("login-view", viewData); // Render the login view with the loginFailed flag
    }
  },

  async getLoggedInUser(request) {
    const userEmail = request.cookies.station;
    return await userStore.getUserByEmail(userEmail);
  },

  async updatePage(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    response.render("update-account", { user: loggedInUser });
  },

  async updateAccount(request,response){
    //console.log("Request Body:", request.body)
    
    const loggedInUser = await accountsController.getLoggedInUser(request);

    //console.log("logged in user: ", loggedInUser);

    const updatedFields = { 
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      email: request.body.email,
      password: request.body.password,
    };
    
    await userStore.updateUser(loggedInUser._id, updatedFields);
    response.redirect("/login");
  },

};
