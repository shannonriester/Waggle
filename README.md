#WAGGLR

##Elevator Pitch
A location-based, social-media app that allows you to search for dog-friendly places, find cute dogs, and meet other local dog-lovers!

### MVP
1. Functional login/signup for (new) users
2. Getting user's current location
3. list of nearby locations - foursquare search results (map is secondary)
4. click to view an individual location
  - url ex: `waggle.com/locations?name=AuditoriumShoresDogPark&lat=30.22&long=-97.75`
  - User can check-in (mark themselves as there)
  - Show users who checked-in at location within the last hour

#### Server-Side Collections
- Users
- Checkins - join between users and locations (which are on foursquare)
  - Include user id, location id, time it was made
- PlacesCollection

##Data Modeling
  - Connecting session-user with other user IF MATCHED

#### Future features
map to show locations
list of popular times to checkin at this place
mutual matching (double swipe right)
show total number of checkins regardless of match status
only showing names of checkins for matches
showing user profiles of matches
allow message of matches

##Building Tools & Libraries
1. React
2. React-router
3. React-DOM
4. React Transitions (animations)
  - `react-addons-css-transition-group`
5. Babel Preset React
6. Backbone
7. Underscore
8. Moment
9. Normalize-SCSS
10. jQuery  

##Basic Features
1. Search (places/users(and dogs))
  - Search dog-friendly or dog-related places that you can visit/people have checked in to
  - Users can filter search to meet specific requirements
    - Filtered results could be "off-leash", "park", "outdoors", "bar", etc.
  - Based of user's current location (returns results within specific range of user's location)
2. Map & Search Results
  - Show nearby dog-related places
    - Users can search for nearby parks/dog hangout spots
    - Users can add/edit submitted locations
  - Waggle maps will show you locations near you that have been 'liked' by waggle users
    - This is the place's percentage approval rating, based on Waggle users
  - Shows where users are with their dogs (if checked in)
  - Search results give detailed view/description of the place
    - Also show's who was checked in there and since when
    - Only shows who was there for that day (sorted from most recent checkins)

3. Matching/Friending
  - Only matched users are allowed to message each other
  - User can delete entire message history, but not edit messages in any other way
    - This will not affect recipient user's message history
4. User Profile
  - Only up to 6 photos allowed for the user to upload
    - Use file uploads
  - Users can edit their profile to be a short bio about themselves or their dog
    - User will specify (if they so choose) why they are on the app (meet new people, romantic interests, new in town and his/her dog needs new friends too!)
<!-- 5. Login
  - Uses Facebook o-auth to create account -->

##APIs and other Operating Systems
1. [RandomUser Generator](https://randomuser.me/)
<!-- 2. Dog-breed API (for specifying breed) -->
2. [FreeGeoIP](https://freegeoip.net/?q=70.112.11.58)
3. [Google Maps API](https://developers.google.com/maps/documentation/javascript/)
4. Backend as a Service (BaaS) [Kinvey](https://www.kinvey.com/)
5. [Mozilla Drag & Drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)
6. [Mozilla Touch Events](https://developer.mozilla.org/en-US/docs/Web/API/Touch_events)
7. [Facebook API](https://developers.facebook.com/)
8. [Yelp](https://www.yelp.com/developers/manage_api_keys)


##Routes
1. Home (must log in to view match potentials)
  - User will be directed to Swipe Page after successfully logging in/signing up
    - login
    - sign up
2. User profile
  - Short bio about User/Dog
  - User/Dog Images
3. Map (around user)
4. Settings
  - Dog-breed searching parameters
  - location range preferences (limited to up to 25 miles)
  - push notifications
  <!-- - Human preferences (male/female) -->
5. Messages
  - list of all messages from each match
  - user can view/edit
6. Search nearby Users/Dog-Places

##Special Features
1. Swiping! Full mobile functionality and view
2. Unique Web App view (different from mobile)
3. Location
  - Set your location to only find people near you!
    - If you only want humans/dogs within a 3 mile range, those are the only users you will view
4. Funny dog puns
  - "Bow-WOW! You matched!" -- after matching
  - "Throw me a bone, why don't ya?" --message preview


##StyleGuide
  1. Code indentation (white-space)
    - Use the tab, spaced at two-spaces
    - Only use tab-spacing (at 2-space size)
    - Math operators separated by a single-space around operators
    - Must use a single-space after `,`s
    - functions must not have space after declaration/before `()`s
      ex:
      ```js
      function myFunction() {},
      ```
  2. Naming
    - All names start with a lower-case letter
    - JavaScript names must be camel-cased and start with a lower-case letter
    - HTML elements (including React elements) must be separated with `-` if more than one word long
    - components need to have `-component` in their name
      ```html
      <div classNme="app-component"></div>
      ```
    - Models & Collections:
      - Begin with UpperCase letter
      - Use CamelCasing
      - Files and constructors end in `Model`
        - ex: `SessionModel()`
    3. Syntax
      - Always end a simple-statement with a `;`
      - Use trailing commas in object-properties{} and arrays[]
        - ex:
        ```js

        export default React.createClass({
          getInitialState: function() {
            return {
              modal: null,
              places: store.placesCollection.toJSON(), //<-- here

            }
          }, // <-- here
        });        
        ```
        - Put closing bracket of functions and objects on new line
    4. Quotations
      - HTML elements (including React elements)
        - use `""`s
      - JavaScript
        - use `''`s

## Credits
1. Bone icon
  - `<div>Icons made by <a href="http://www.flaticon.com/authors/metropolicons" title="Metropolicons">Metropolicons</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>`
2. [Foursquare](https://developer.foursquare.com/)
  - API
  - Design/wire-framing inspiration
3. [Tinder](https://www.gotinder.com/)
  - Inspired heavily from Tinder's mobile design

## Installation
  - Clone this repo (or fork then clone, if you prefer)
  - Run `npm install`
  - if you get permission errors you may need to run `sudo npm install` to install a couple global dependencies
