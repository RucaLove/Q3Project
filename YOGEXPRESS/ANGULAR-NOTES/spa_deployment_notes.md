## Deploying separate apps

- Understand benefits of separate client/server deployments

- know how to remove unnecessary code form express generate app

- understand how to add CORS middleware

- know how to modify code to use different API urls

### Separate Client & Server side:
#### PROs:
Separation of concerns:
  - Allows multiple teams to work on same project

Security:
  - Hard to see how the back end works for

CDN for speed
  - decide what assets of the app are not changing and dedicate them to server side CDN
  - Cheap way to serve up assets
    - e.g. Angular dynamically generated views VS sending a new html file for everything a user does

A/B Testing:
  - Change either component of the site separately
  - Swapping out a piece of the site for different users

API VERSIONS:
  - Stealth deployment (multiple versions of app)
    - Allow testing with a soft release(test, while the other is still live)

Mobile Native


#### CONs:
Complexity
  - Hard to release things together
  - Keeping everything connected (tables(db), inputs)

Security:
  - More infrastructure vulnerabilities
