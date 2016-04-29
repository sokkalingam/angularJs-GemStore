# angularJs-GemStore

Gem Store is an imitation of an e-commerce website.
The purpose of this application to learn and gets hands on experience on AngularJs 1x.

Feature of the application:
	It consists of a navigation bar with the following pages: Home, View All Gems, Add Gem and Shopping Cart.

	Home
		- Welcome message and an image

	View All Gems
		Display
			- Lists all gems in the store
			- Each gem has name, price, image, quantity, description, specification and reviews

		Reviews
			Display
				- Each gem shows all its reviews under Reviews tab
				- Average customer review is displayed dynamically based on existing reviews
				- A review bar which visually represents the number of reviews for each rating (1 to 5 stars)

			Filter
				- Clicking on a particular bar will show only those reviews.
				- Toggle back to view all reviews by clicking 'See All Reviews'

			Add Review
				- Add review by selecting your rating from a dropdown, entering Comment and user name
				- Live preivew of the review is displayed as it is being typed
				- On submit, new review is added. Average customer review and review bars are dynamically re-calculated.

			Delete Review
				- Any review can be deleted by cliking the delete button next to each review.
				- On delete, the review is removed. Average customer review and review bars are dynamically re-calculated.

	/** Sections to be explained in detail**/		
	- Search for gem by plain search
	- Sort by price and average customer reviews
	- Advanced Instant search by field, which provides results as you type.

	/** More details to be added **/