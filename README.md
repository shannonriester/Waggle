# WAGGLE  
http://_waggle.surge.sh/

## About
Have you ever noticed a group of friends at a restaurant and everyone is lost on their smart phones, not engaging with each other at all? As much as I love technology and social-media, I feel that it's more important to be present and engaged in the moment. Waggle is designed to use technology to lose technology, so to speak.

As "man's best friend," it's safe to say that dogs make us feel more connected with each other (dog and human alike). Dog-people really do love all things dog, so I wanted to simplify the process of finding dog-friendly places with dog-friendly people.

Waggle creates the opportunity to bring people together, connecting on a deeper level. Its simplified search & checkin features make it easy for the user to explore dog-allowed places nearby. Checking-in is important in that if there are more than 3 people checked in to a location, a _hot spot_ is created: so the user can decide to get out and go make some new friends or meet up with some cool dogs. I hope that Wagglrs (Waggle-users) experience and appreciate this different approach to using technology to lose technology, if only for a short amount of time. 

## Elevator Pitch
A location-based, social-media app that allows you to search for dog-friendly places, find cute dogs, and meet other local dog-lovers!

## MVP
1. Functional login/signup for (new) users
2. Getting user's current location
3. List of nearby locations - yelp search results (map is secondary)
4. Click to view an individual location
  - url ex: `/search/?category=restaurant`
  - User can check-in (mark themselves as there)
  - Show users who checked-in at location within the last hour
5. User can checkin to place

## Server-Side Collections
- Users
- Matches
  - Join matches between users and matches
- Checkins
  - join between users and locations
  - Include user id, location id, time it was made
- PlacesCollection

##Data Modeling
  - Connecting session-user with other user IF MATCHED
  - Connecting checkins with individual places

## Building Tools & Libraries
1. React
5. Babel Preset React
6. Backbone
7. Underscore
8. Moment
9. Normalize-SCSS
10. jQuery  

## Basic Features
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


## APIs and other Resources
1. [Yelp](https://www.yelp.com/developers/manage_api_keys)
2. [FreeGeoIP](https://freegeoip.net/?q=70.112.11.58)
3. [Google Maps API](https://developers.google.com/maps/documentation/javascript/)
4. Backend as a Service (BaaS) [Kinvey](https://www.kinvey.com/)
  - Kinvey is powered by MongoDB's powerful query search
5. [Trello](https://trello.com/b/PhBKfGhn/waggle)
  - Check out some of my process and wireframes


## Routes
1. Landing Page: `/`
  - User must log in to access the site
2. Search Results Page: `_waggle/search/?category=park`
  - Contains map view, list of yelp results of dog-friendly places nearby
  - Initial search query is set by default to "parks"
3. User's profile: `_waggle/user/<username>`
  - User can upload background image photos
  - User can change profile-pic by clicking on default image (while editing)
4. Settings `_waggle.surge.sh/settings`
  - location range preferences (limited to up to 25 miles)
5. Message History (All messages) `_waggle.surge.sh/messages`
  - list of all messages from each match
6. Conversation page `_waggle.surge.sh/messages/<otherUser>`
6. Search nearby Users/Dog-Places

## Special Features
1. Swiping background images on profile
2. Image uploading:
  - React Dropzone
  - JS File Reader
3. Search Results:
  - Change what city you're currently searching in and see what dog-friendly places are there
  - Update your discovery range (in settings)
4. Funny dog puns
  - "Bow-WOW! You matched!" -- after matching
  - "Throw me a bone, why don't ya?" --message preview


## StyleGuide
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
1. [The Noun Project](https://thenounproject.com/)
  - Paw-print icon (filled) Created by YuguDesign, from the Noun Project
  - Paw-print icon (not filled) Created by Sergey Demushkin, from the Noun Project
  - Waggle Logo Created by Carmen Marín Crespo from the Noun Project
2. [Tinder](https://www.gotinder.com/) and [Air BnB](https://www.airbnb.com/)
  - Design inspirations

## Installation
  - Clone this repo (or fork then clone, if you prefer)
  - Run `npm install`
  - if you get permission errors you may need to run `sudo npm install` to install a couple global dependencies
