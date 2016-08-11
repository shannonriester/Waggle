#WAGGLE

### MVP
login/signup
get user's current location
list of nearby locations - foursquare search results (map is secondary)
click to view an individual location
  - waggle.com/locations?name=AuditoriumShoresDogPark&lat=30.22&long=-97.75
  - mark themselves as there
  - show people who said they were there within the last hour

#### server-side collections
- users
- checkins - join between users and locations (which are on 4sqare)
  - include user id, location id, time it was made

#### Future features
map to show locations
list of popular times to checkin at this place
mutual matching (double swipe right)
show total number of checkins regardless of match status
only showing names of checkins for matches
showing user profiles of matches
allow message of matches

##Elevator Pitch
A social-media, location-based and dog-oriented app that allows you to search nearby dog places, discover cute dogs and their humans! Maybe you'll make a new friend taking your pup out on his very own dog date!



##Building Tools & Libraries
1. React
2. React-router
3. React-DOM
4. React Transitions (animations)
  - `npm install --save react-addons-css-transition-group`
5. Babel Preset React
6. Backbone
7. Underscore
8. Moment
9. Normalize-scss
10. jQuery  


##StyleGuide
- html elemtns (including react elements) names must be separated by `-`
- JavaScript names must be camel-cased and start with a lower-case letter
- components need to have `-component` in their name
  ```html
  <div classNme="app-component"></div>
  ```
- Arrays, functions, and objects must have a trailing comma 

##Basic Features
1. Search (dogs/users)
- Search through human-user collection (via swipe)
  - Dog API allows you to search humans based on dog-breed
  - Human-owners showcase photos of themselves(if so desired), and their dog
  - Search can only be dog-specific-- human-owners will be randomly shown to session-user
  - Only gender-specific for human-owners
2. Wagging
  - Session-user **must** wag-left or wag-right in order to see next potential match
  - If wag-left, session-user 'rejects' the random user-human/dog and continues on to random matching
    - Session-user CANNOT undo this action. Session-user will not be presented again with rejected user-humans/dogs
  - If wag-right, session-user 'accepts' the random user-human/dog
    - If other user _also_ wags-right, it's a match! (Both users **_must_** wag-right to be a match!)
3. Matching
  - Only matched users are allowed to chat in Waggle Chat room
  - User can delete entire history with single user, but not edit messages in any other way
4. Login
  - Uses Facebook o-auth to create account
5. Location Services
  - Users can search for nearby parks/dog hangout spots
  - Users can add/edit submitted locations
  - Users can filter search to meet specific requirements
    - eg. 'off-leash', 'on-leash', 'open water', 'shaded', 'dog park', 'kid friendly', etc.
  - Waggle maps will show you locations near you that have been 'liked' by waggle users
    - Shows % approval rating
6. User Profile
  - Only up to 6 photos allowed for the user to upload
    - Use file uploads
  - Users can edit their profile to be a short bio about themselves or their dog
    - User will specify (if they so choose) why they are on the app (meet new people, romantic interests, new in town and his/her dog needs new friends too!)

##APIs
1. Fake collection of users with dogs and images
  - https://randomuser.me/
2. Dog-breed API (for specifying breed)
3. Google Maps API
  - https://developers.google.com/maps/
  - https://developers.google.com/maps/documentation/javascript/
4. Kinvey
5. Drag and Drop API
  - https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API
6. Touch Events
  - https://developer.mozilla.org/en-US/docs/Web/API/Touch_events
7. Facebook API
  - https://developers.facebook.com/
8. Yelp?

##Data Modeling
  - Connecting session-user with other user IF MATCHED

##Routes
1. Home (must log in to view match potentials)
  - User will be directed to Swipe Page after successfully logging in/signing up
    - login
    - sign up
2. User profile
  - Short bio (view/edit)
  - Images (view/edit)
3. Map (around user)
4. Settings
  - Dog-breed searching parameters
  - location preferences
  - notifications
  - owner preferences (male/female)
5. Messages
  - list of all messages from each match
  - user can view/edit (only entire history*)
    - * deleting their own message history does NOT remove the other user's message history
6. Swipe Page


##Libraries
1. JQuery
2. Underscore
3. Moment

##Special Features
1. Swiping! Full mobile functionality and view
2. Unique Web App view (different from mobile)
3. Location
  - Set your location to only find people near you!
    - If you only want humans/dogs within a 3 mile range, those are the only users you will view
4. Funny dog puns
  - "Bow-WOW! You matched!" -- after matching
  - "Throw me a bone, why don't ya?" --message preview
