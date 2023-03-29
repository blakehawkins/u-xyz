unichance.xyz
===

Unichance is a service for promoting and measuring open data about university accessibility, especially for international students.

Part of the attraction to unichance is that data is purely unfilitered and unvalidated. Submitting your own metric takes seconds, and the tools provided for analysing data are very powerful.


Background
---

Unichance was made at Productforge 3, November 2014, by Yoyu, Pavel Mrlík, Blake Hawkins, and Dong. The webapp utilizes various technologies: Amazon AWS, nginx, MongoDB, sleepy.mongoose, node.js, AngularJS, among others. At time of writing the app is deployed on http://unichance.xyz/


State
---

Done:

* Standard way of graphing staked charts
* Specification of entry format
* Means of fetching statistical data and recent entries

Not Done:

* Means of posting data
* Standardized data format


Running
---

To duplicate our stack you should:

* Have a remote server listening on port 80 (we use AWS + nginx as a means of forwarding to our angular seed)
* Have the angular seed running (`npm run start`)
* Have a mongodb instance running with a static database location
* Have a service for the interface to mongo from angular - we use sleepy.mongoose.


Running sleepy mongoose:
---

`python sleepymongoose/httpd.py --xorigin`


Importing jSON into mongo:
---

`mongoimport -d <database> -c <collection> --type json --file junk.json --quiet --jsonArray`

Generating entries from UCAS statistics
---

`python tools/csv-parser.py`

Ops
---

`npm update`
