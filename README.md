# angular-flickr-search
Angular flickr search application with infinite scroll and filtering. 

The application has infinite scroll and tag filtering. The results are pre-filtered to "kent", but you can add more tags in the search input. A good test it to add "black and white". Here are some things I'll be working on this week:

- Add tests for the services and controllers (which I'm expecting will need some refactoring too)

You may notice a problem with overlapping cards. I suspect this is due to the tags being rendered after masonry has been fired. I think the solution may be to move the logic to a directive and emit back to the search result directive to run masonry. Would appreciate advice!

The other thing I'd like a better solution to the two timeouts I'm using. 