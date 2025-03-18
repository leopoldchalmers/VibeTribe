> VibeTribe Project Report
>
> Emil Andersson Senja Kortesaari Hilda Lange Hanna Magnusson Leopold
> Wahlbeck
>
> March 2025
>
> 1 Introduction
>
> Vibe Tribe is a meeting place where music lovers can connect and share
> their thoughts and ideas through a community-based forum. The
> application allows users to create blogs/forums/threads/topics, namely
> called ”tribes”, where the user can determine the overall topic. These
> tribes are then displayed on the website homescreen, where users can
> join any of the displayed tribes. In these tribes, any user can create
> posts and engage in discussions with other tribe members. To access
> the code for this application, follow the link:
>
> https://github.com/leopoldchalmers/VibeTribe
>
> 2 User Manual
>
> 2.1 Installing VibeTribe 2.1.1 Download repository
>
> Begin by visiting our GitHub repository by using the link provided.
> You can obtain the source code by either cloning the repository or
> downloading it as a ZIP-file.
>
> 2.1.2 Installing dependencies
>
> After downloading the repository, you will need to install the
> necessary packages to be able to run both the client and server. Begin
> by opening your terminal and navigate to the client folder:
>
> cd path/to/repository/client
>
> 1
>
> Then run the command:
>
> npm install
>
> Then, navigate to the server folder:
>
> cd path/to/repository/server
>
> and execute the same command. Now all packages should be installed!
>
> 2.1.3 Docker
>
> For the database, VibeTribe uses Docker to run a PostgreSQL container.
> There-fore, you will nede to install the latest versions of both
> docker and postgres.
>
> To initiate the database, open a terminal window and run the following
> line:
>
> dockerrun-d–namevibetribepostgres−−envPOSTGRESUSER = appdbuser−
> −envPOSTGRESP ASSWORD = webappgroup1gang−p5432 : 5432postgres : latest
>
> 2.1.4 Running VibeTribe
>
> With all dependencies installed and Docker running, you can now start
> Vibe-Tribe. This is done by opening a terminal window, navigating to
> the client folder and running the command:
>
> npm run dev.
>
> Thisshouldgeneratealocalhostlinkwhichlookslikethis:
> http://localhost:5173. In another terminal window, navigate to the
> server folder and run the same com-mand again. Next, open a browser
> and visit the generated URL.
>
> VibeTribe should now be up and running!
>
> 2
>
> 2.2 Navigating VibeTribe
>
> When visiting VibeTribe, you are met with a homepage displaying all
> existing tribes. The top of the page features a navigation bar
> providing access to your account and the ability to navigate back to
> the homepage. At the bottom of the page, a footer contains links to
> our contact information and details about VibeTribe.
>
> 2.2.1 Create an account
>
> To create an account, begin by pressing the account icon located on
> the navi-gation bar to the right. This action brings you to the login
> screen, where you can choose the option to sign up as a new user.
> Choose a username, email and a password that is at least 5 characters
> long. You will then need to log in to access the features.
>
> 3

<img src="./ornohtc2.png"
style="width:4.2959in;height:2.18706in" /><img src="./mcxdm25m.png"
style="width:4.29637in;height:2.19492in" />

> Figure 1: Login screen
>
> Figure 2: Register screen
>
> 2.2.2 Create a tribe
>
> To create a tribe, press the ”create tribe” button on the homepage.
> Give the tribe a suiting name and a description. Your tribe will now
> be visible on the homepage for other users to see and interact with!
>
> 2.2.3 Create a post
>
> In the tribes, you can create a post by clicking the ”create post”
> button. Give the post a title and a message. It will now be visible
> for other users.
>
> 4
>
> 2.2.4 Account
>
> To see your account details, click on the account icon in the
> navigation bar which will bring you to your profile page. Here, you
> will see your username. If you wish to log out, simply press the log
> out button.
>
> 3 Design
>
> 3.1 Components 3.1.1 App.tsx
>
> The App component is the root component of the VibeTribe application.
> It is responsible for setting up the router and providing global state
> for the user session. The component renders the Navbar and Footer
> components, while the page content is dynamically loaded based on the
> route.
>
> Purpose:
>
> • The App component manages the routing of the application, allowing
> navi-gation between different pages such as Home, Account, Sign Up,
> and Tribe Info.
>
> • It provides a global user session state through the UserContext,
> which is available to all components within the application.
>
> Props:
>
> • The App component does not receive any props directly.
>
> State:
>
> • user (User \|Undefined): Stores the current user’s session
> information, managed via useState, which allows updating the user
> state in the global context.. This determines if the user is logged in
> or not.
>
> API Calls:
>
> • The App component does not make direct API calls. It relies on child
> components, such as Account, SignUp, and others, to interact with the
> backend for authentication and user-related data.
>
> Routing:
>
> • Uses BrowserRouter and Routes from react-router-dom to manage
> nav-igation.
>
> • The routes defined in this component include:
>
> – "/" → Renders the Home component.
>
> – "/account" → Renders the Account component.
>
> 5
>
> – "/accountinfo" → Renders the AccountInfo component. – "/signup" →
> Renders the SignUp component.
>
> – "/createTribe" → Renders the CreateTribe component. – "/about" →
> Renders the About component.
>
> – "/contact" → Renders the Contact component.
>
> – "/tribe/:id" → Renders the TribeInfo component for the specific
> tribe identified by the id parameter.
>
> Context:
>
> • Usesthe UserContext.Providertoprovidethe userstateandthe setUser
> function to the child components. This allows components to access and
> modify the current user’s information.
>
> Components Rendered:
>
> • Navbar: Always rendered at the top of the page for navigation.
>
> • Footer: Always rendered at the bottom of the page.
>
> • Based on the route, the content of the page is dynamically rendered.
> For instance:
>
> – Home: Displays a list of tribes.
>
> – Account: Displays the login form if the user is not logged in. –
> SignUp: Allows the user to create a new account.
>
> – CreateTribe: Allows users to create a new tribe.
>
> – TribeInfo: Displays detailed information about a specific tribe.
>
> 3.1.2 About.tsx
>
> • Purpose: This page is static and provides the user with information
> about VibeTribe and how it is used. Contains no properties, states, or
> API calls.
>
> 3.1.3 Account.tsx
>
> • Purpose: This component is used to handle and showcase the log-in
> page. It also allows users to sign up if they don’t have an account.
>
> • Props: This component does not contain any props.
>
> • State: The Account component uses states to handle user log in and
> error messages.
>
> – username (string): Stores the inputted username. – password
> (string): Stores the inputted password.
>
> 6
>
> – errors (Errors): Is of type Errors and holds error messages for
> incorrect inputs.
>
> The Errors interface is used to define the types error messages that
> can be stored (username, password, and server error).
>
> interface Errors { username?: string; password?: string; serverError?:
> string;
>
> }
>
> • API calls:
>
> – Handles log in functionality by calling the login() function from
> the api, with username and passowrd as parameters, which triggers a
> POST request on http://localhost:8080/users/login.
>
> – This component utilizes an enum from the api, LoginResult, to
> prop-erly display error messages or successfully log in the user.
>
> ∗ If a user has successfully logged in, UserContext is updated with
> the user’s information and the user is redirected to the homepage.
>
> ∗ Otherwise, accurate error messages will be triggered and dis-played.
>
> export enum LoginResult { SUCCESS, INVALID_CREDENTIALS, SERVER_ERROR
>
> }
>
> 3.1.4 AccountInfo.tsx
>
> • Purpose: The AccountInfo component displays the logged-in user’s
> ac-count details, including their username. It also provides the
> option to log out.
>
> • Props: This component does not receive any props directly.
>
> • State:
>
> – errors (Errors): An object that holds error messages related to
> logout attempts.
>
> This interface defines the error messages that can be stored, log out
> errors in this case.
>
> 7
>
> interface Errors { logoutError ?: string
>
> }
>
> • API calls:
>
> – POST http://localhost:8080/users/logout is called using the logout()
> function when the user clicks the ”Log out” button.
>
> – This component also utilizes an enum, LogoutResult, in order to
> allow the user to log out or display error messages.
>
> ∗ If the log out request succeeds, the user is logged out, and the
> state is updated by setting user to undefined, and the user is
> redirected to the log in page (/account).
>
> ∗ If there is a server error during log out, an error message is
> displayed to the user, an error message is displayed: ”A server error
> was encountered. Try again later.”
>
> export enum LogoutResult { SUCCESS,
>
> SERVER_ERROR }
>
> 3.1.5 Contact.tsx
>
> • Purpose: A static page used to provide the user with our contact
> infor-mation. Contains no props, states, or API calls.
>
> 3.1.6 CreateTribe.tsx
>
> • Purpose: The CreateTribe component allows authenticated users to
> create a new Tribe within the VibeTribe platform. It includes a form
> where users can enter a tribe name and description, then submit the
> form to create the tribe in the backend.
>
> • Props: This component does not receive any props.
>
> • State: CreateTribe uses the useState hook to manage the following
> states.
>
> – owner (string): Username of the creator (set dynamically after form
> submission).
>
> – title (string): Name of the tribe, updated via the input field.
>
> – description (string): Description of the tribe, updated via the
> input field.
>
> – createdAt (Date): Timestamp of when the tribe is created.
>
> 8
>
> – updatedAt (Date): Timestamp of when the tribe is last updated.
>
> • API calls:
>
> – Thiscomponentinteractswiththebackendbycallingthe createTribe()
> function, whichcreatesa POST requeston http://localhost:8080/tribes.
>
> – Before sending the request, the owner field is assigned the
> currently logged-in user’s username.
>
> The request body is structured as follows:
>
> {
>
> "owner": "username", "title": "Tribe Name",
>
> "description": "Tribe Description", "createdAt":
> "YYYY-MM-DD:00:00.000", "updatedAt": "YYYY-MM-DD:00:00.000"
>
> }
>
> Success response redirects the user to the homepage (/), and failure
> han-dling logs the error to the console. Errors are managed using a
> try-catch block in the handleSubmit function. If the user is not
> authenticated, an error is logged, and form submission is prevented.
> If the API request fails, the error is logged to the console.
>
> 3.1.7 Footer.tsx
>
> • Purpose: The Footer component is a fixed-bottom navigation element
> displayed across all pages. It provides quick access to the About and
> Contact pages while displaying copyright information. It doesn’t
> contain any props, states, or make any calls to the backend.
>
> 3.1.8 Home.tsx
>
> • Purpose: The Home component serves as the main landing page,
> display-ing a list of tribes fetched from the backend. It also
> provides a button to create a new tribe, redirecting users based on
> their authentication status.
>
> – Redirects users to the CreateTribe page if authenticated.
>
> – Redirects users to the Account (login) page if not authenticated.
>
> • Props: This component does not receive any props.
>
> • State:
>
> – tribes (array of tribe objects): Stores the list of tribes
> re-trieved from the backend.
>
> • API calls:
>
> 9
>
> – Fetches tribes from the backend using getTribes() on mount which
> usesaxiostotriggera GET requeston http://localhost:8080/tribes.
>
> 3.1.9 Navbar.tsx
>
> • Purpose: The Navbar component is responsible for displaying the
> header and navigation elements throughout the app. It includes a logo
> linking to the homepage, the app title that links to the homepage, and
> a profile icon that redirects the user to the account page or the
> login page based on their authentication status.
>
> • Props: The component does not receive any props directly. It uses
> the UserContext to determine whether the user is authenticated and
> show the appropriate navigation options.
>
> • State: The component does not use any internal states.
>
> • API calls: This component does not make any direct API calls. It
> interacts with the UserContext to check if the user is logged in and
> adjusts the behavior of the profile button accordingly.
>
> 3.1.10 Post.tsx
>
> • Purpose: The Post.tsx file defines the PostComponent, which is
> re-sponsible for displaying an individual post within a tribe. It
> presents key information about the post, such as its title,
> description, author, number of likes, and the associated tribe.
>
> • Props: Post – An object containing:
>
> – title (string): The title of the post.
>
> – description (string): The content of the post.
>
> – author (string): The username of the post’s creator.
>
> – likes (number): The number of likes the post has received.
>
> – tribe.description (string): The description of the associated tribe.
>
> • State: The component is purely presentational and does not maintain
> state.
>
> • API calls: The component only receives data via props and does not
> interact with the backend.
>
> 10
>
> 3.1.11 PostList.tsx
>
> • Purpose: The PostList component is responsible for displaying a list
> of posts within a tribe. It receives an array of posts as a prop and
> renders them in an unordered list. If no posts are available, it
> displays a message indicating that no tribes are available. This
> component serves as a simple way to visualize the content shared
> within a specific tribe.
>
> • Props: Post\[\]: An array of post objects, where each post contains:
>
> – id (number): Unique identifier for the post.
>
> – description (string): The content of the post.
>
> • State: The component does not manage any internal state.
>
> • API calls: The component receives data via props and does not
> interact with the backend.
>
> 3.1.12 SignUp.tsx
>
> • Purpose: The SignUp component provides a form for new users to
> reg-ister an account. If the user already has an account there is a
> link back to the log in page. It includes input fields for the
> username, email, and password, and handles validation and error
> messaging. If the registration is successful, it redirects the user to
> the homepage.
>
> • Props: This component does not contain any props.
>
> • State:
>
> – username (string): The username entered by the user. – email
> (string): The email entered by the user.
>
> – password (string):The password entered by the user.
>
> – errors (Errors): An object that holds error messages related to the
> fields (username, email, password), as well as a generic server error
> message.
>
> interface Errors { username?: string; email?: string; password?:
> string; serverError?: string;
>
> }
>
> • API calls:
>
> – calls the registerUser() function from the API, which creates a POST
> request on http://localhost:8080/users with the body:
>
> {username: string,email: string,password: string}
>
> 11
>
> – Upon a successful response, the user is redirected to the homepage.
>
> – If the registration fails (e.g., username already exists or invalid
> email format), an error message is displayed on the form.
>
> • Error Handling:
>
> – If there is an issue with registration (such as empty fields or
> invalid data), the component displays appropriate error messages.
>
> – If the backend responds with an error, such as an existing username
> or invalid email, those specific errors are displayed.
>
> – A generic error message is shown if an unexpected server error
> occurs.
>
> 3.1.13 TribeCard.tsx
>
> • Purpose: The TribeCard component is responsible for displaying the
> details of a single tribe. It shows the tribe’s title, description,
> owner, and creation date. Clicking the card redirects the user to the
> tribe’s detailed page.
>
> • Props:
>
> – tribe (Tribe object): A single tribe’s data to be displayed in the
> card.
>
> • State: This component does not use any state.
>
> • API calls: This component does not make any API calls. It receives
> the tribe data as a prop from the TribeList component.
>
> 3.1.14 TribeInfo.tsx
>
> • Purpose: The TribeInfo component is used to display detailed
> infor-mation about a single tribe, including its title, description,
> owner, and creation date. It also fetches and displays a list of posts
> related to the tribe. Authenticated users can create new posts, which
> are added to the list dynamically.
>
> • Props: The component does not receive props directly. Instead, it
> re-trieves the tribe ID from the URL using the useParams hook to fetch
> the specific tribe data and related posts.
>
> • State:
>
> – tribe (Tribe): Stores the details of the current tribe.
>
> – posts (array of Post objects): Stores the posts related to the
> tribe.
>
> – showModal (boolean): Manages the visibility of the modal for
> cre-ating new posts.
>
> 12
>
> – newPost (object): Stores the input data for creating a new post,
> including title, description, and song link.
>
> • API calls:
>
> – Calls the getTribeById() function which creates a GET request on
> http://localhost:8080/tribe/id, which fetches tribe data based on the
> ID.
>
> – The getPostsByTribeId() function creates a GET request on
> http://localhost:8080/posts/tribe/id. It fetches posts related to the
> tribe by tribe ID.
>
> – The createTribe() function creates a POST request on
> http://localhost:8080/tribes It creates a new post for the tribe, sent
> when the form is submitted (authenticated users only).
>
> 3.1.15 TribeList.tsx
>
> • Purpose: The TribeList component is responsible for displaying a
> list of tribes in a grid layout. It receives an array of tribe objects
> as a prop and maps each one to a TribeCard component for rendering. If
> no tribes are available, it displays a message indicating the absence
> of tribes. This component helps users explore different tribes within
> the application.
>
> • tribes: Tribe\[\]: An array of tribe objects, where each tribe
> contains:
>
> – id (number): Unique identifier for the tribe. – title (string): Name
> of the tribe.
>
> – description (string): Brief description of the tribe. – owner
> (string): Username of the tribe’s creator.
>
> – createdAt (Date): Timestamp when the tribe was created. – updatedAt
> (Date): Timestamp of the last update.
>
> • State: This component does not use any state.
>
> • API calls: The component receives data via props and does not
> interact with the backend.
>
> 3.2 API specification 3.2.1 User API Specification
>
> • Create User
>
> Method & URL: POST /users Description: Creates a new user account.
> Request Body:
>
> 13
>
> {
>
> "username": "string", "email": "string", "password": "string"
>
> }
>
> Success Response: Status: 201 Created Body:
>
> {
>
> "username": "string" }
>
> Error Responses: Status: 400 Bad Request
>
> Possible Error Messages: ”All fields required”, ”Username already
> exists”, ”Invalid email format”, ”Email already exists”
>
> • Login User
>
> Method & URL: POST /users/login
>
> Description: Authenticates a user with a username and password.
> Request Body:
>
> {
>
> "username": "string", "password": "string"
>
> }
>
> Success Response: Status: 200 OK
>
> Body: ”Logged in” (Sets the session with the username) Error Response:
>
> Status: 401 Unauthorized
>
> Body: ”No such username or password”
>
> • Check Session
>
> Method & URL: GET /users/session
>
> Description: Checks if a user is currently logged in via session data.
> Success Response:
>
> Status: 200 OK
>
> Body: ”Logged in as: \<username\>”
>
> 14
>
> Error Response: Status: 401 Unauthorized
>
> Body: ”No user logged in”
>
> • Logout User
>
> Method & URL: POST /users/logout
>
> Description: Logs out the user by deleting the session information.
> Success Response:
>
> Status: 200 OK
>
> Body: ”blabla Logged out”
>
> Error Handling: No specific error messages are defined for this
> end-point. In case of a server error, an HTTP error response is
> returned ”A server error was encountered. Try again later.”.
>
> 3.2.2 Tribe API Specification
>
> • Get All Tribes
>
> Method & URL: GET /tribes
>
> Description: Retrieves a list of all tribes. You don’t need to be
> logged in to get all the tribes.
>
> Success Response: Status: 200 OK
>
> Body: JSON array of tribe objects. Error Response:
>
> Status: 500 Internal Server Error Body: Error message string.
>
> • Create Tribe
>
> Method & URL: POST /tribes
>
> Description: Creates a new tribe. The user must be logged in. Request
> Body:
>
> {
>
> "title": "string", "description": "string", "owner": "string"
>
> }
>
> Success Response: Status: 201 Created
>
> 15
>
> Body: JSON object representing the newly created tribe. Error
> Responses:
>
> \- Status: 403 Forbidden (if the user is not logged in; Body: ”Not
> logged in”)
>
> \- Status: 400 Bad Request (if missing title/description or if
> description is not a string; e.g. ”All fields are required” or a type
> error message)
>
> \- Status: 500 Internal Server Error (for other errors)
>
> • Get Tribe by ID
>
> Method & URL: GET /tribes/:id
>
> Description: Retrieves a tribe by its numeric identifier. Request
> Parameter: id (number)
>
> Success Response: Status: 200 OK
>
> Body: JSON object representing the tribe. Error Responses:
>
> \- Status: 400 Bad Request (if id is not a valid number; Body:
> ”Invalid ID format”)
>
> \- Status: 500 Internal Server Error
>
> • Get Tribes by User
>
> Method & URL: GET /tribes/:user
>
> Description: Retrieves all tribes created by a specific user. Request
> Parameter: user (string)
>
> Success Response: Status: 200 OK
>
> Body: JSON array of tribe objects. Error Response:
>
> Status: 500 Internal Server Error Body: Error message string.
>
> 3.2.3 Post API Specification
>
> • Get Posts
>
> Method & URL: GET /posts
>
> Description: Retrieves a list of posts. Optionally, a query parameter
> tribeId can be provided to filter posts by tribe.
>
> Request Query Parameter (optional): tribeId (number) Success Response:
>
> Status: 200 OK
>
> Body: JSON array of post objects.
>
> 16
>
> Error Responses:
>
> \- Status: 400 Bad Request if tribeId is provided in an invalid format
> (Body: ”Invalid tribeId format”)
>
> \- Status: 500 Internal Server Error (Body: error message)
>
> • Get Post by ID
>
> Method & URL: GET /posts/:id
>
> Description: Retrieves a single post by its unique identifier. Request
> Parameter: id (number)
>
> Success Response: Status: 200 OK
>
> Body: JSON object representing the post. Error Responses:
>
> \- Status: 400 Bad Request if id is not a valid number (Body: ”Invalid
> ID format”)
>
> \- Status: 404 Not Found if the post is not found (Body: ”Post not
> found”) - Status: 500 Internal Server Error (Body: error message)
>
> • Create Post
>
> Method & URL: POST /posts Description: Creates a new post. Request
> Body:
>
> {
>
> "title": "string", "description": "string", "author": "string",
> "tribeId": number, "songLink": "string"
>
> }
>
> Success Response: Status: 201 Created
>
> Body: JSON object representing the newly created post. Error
> Responses:
>
> \- Status: 400 Bad Request if description is not a string - Status:
> 500 Internal Server Error (Body: error message)
>
> • Update Post
>
> 17
>
> Method & URL: PATCH /posts/:id
>
> Description: Updates an existing post identified by its unique ID.
> Request Parameter: id (non-negative integer)
>
> Request Body:
>
> {
>
> "title": "string", "description": "string", "songLink": "string"
>
> }
>
> Success Response: Status: 200 OK
>
> Body: JSON object representing the updated post. Error Responses:
>
> \- Status: 400 Bad Request if id is missing, not a non-negative
> integer, or if description is not a string (Body: appropriate error
> message)
>
> \- Status: 404 Not Found if the post is not found (Body: ”Post not
> found”) - Status: 500 Internal Server Error (Body: error message)
>
> 3.3 ER-diagram 3.3.1 Entities
>
> • User: The User entity represents each user that has created a
> VibeTribe account and it has the attributes:
>
> – Username (Primary Key): Represents the username and this at-tribute
> is a primary key, ensuring that no users can share username.
>
> – Password: Holds the user’s password.
>
> – Email: Holds the email account connected to the user.
>
> • Tribe: The Tribe entity represents each tribe created and contains
> the attributes:
>
> – Id (Primary Key): Contains the id that is used to identify each
> created tribe. It is a primary key to make sure that each id is
> unique.
>
> – Owner (Foreign Key): Represents the user who created the tribe. It
> is a foreign key becuase it uses and references the User attribute.
>
> – Title: Holds the title of the tribe.
>
> – Description: Contains the tribe’s description. – UpdatedAt: When the
> tribe was last updated. – CreatedAt: When the tribe was created.
>
> 18
>
> • Post: This entity represents each post made on VibeTribe. It
> contains the attributes:
>
> – Id (Primary Key): The post’s id which is a unique identifier,
> there-fore a primary key.
>
> – Likes: Holds the post’s likes. – Title: The title of the post.
>
> – Description: The description of the post. – UpdatedAt: When it was
> last updated.
>
> – Author (Foreign Key): The author of the post. It is a foreign key
> because it uses and references the User entity.
>
> – Tribe (Foreign Key): The tribe which the post is connected to, also
> a foreign key because it uses and references the Tribe entity.
>
> – SongLink: Contains the link to the song currently being discussed.
>
> 3.3.2 Relationships
>
> • Owns: This relationship is between the User entity and the Tribe
> entity, because each tribe is owned by a user. The relationship is
> one-to-many, as a user can own several tribes but a tribe can only
> have one user.
>
> • Has: This relationship is between the Tribe entity and the Post
> entity and it is also a one-to-many relationship. One tribe can
> contain many posts, but each post can only be connected to one tribe.
>
> 19

<img src="./2myliw1k.png"
style="width:4.77359in;height:3.76224in" />

> Figure 3: Enter Caption
>
> 4 Responsibilities
>
> During the lab sessions, we all worked together and were therefore
> responsible for all parts. After all the labs were completed, we chose
> to continue working on VibeTribe as a project. We then divided the
> responsibilities so that Hanna and Hilda’s responsibilities consisted
> of completing the frontend. This included finishing the design
> components and implementing frontend tests.
>
> Leopold, Emil and Senja focused on the backend which included
> implement-ing the post feature, refactoring the code and implementing
> backend tests.
>
> 20
