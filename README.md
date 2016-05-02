# angularJs-GemStore

Gem Store is an imitation of an e-commerce website.
The purpose of this application to learn and gets hands on experience on AngularJs 1x.

Feature of the application:
	It consists of a navigation bar with the following pages: Home, View All Gems, Add Gem and Shopping Cart.

	A. Home
		- Welcome message and an image

	B. View All Gems
		B.1 Display
			- Lists all gems in the store
			- Each gem has name, price, image, quantity, description, specification and reviews

			B.1.1 Reviews
				B.1.1.1 Display
					- Each gem shows all its reviews under Reviews tab
					- Average customer review is displayed dynamically based on existing reviews
					- A review bar which visually represents the number of reviews for each rating (1 to 5 stars)

				B.1.1.2 Filter
					- Clicking on a particular bar will show only those reviews.
					- Toggle back to view all reviews by clicking 'See All Reviews'

				B.1.1.3 Add Review
					- Add review by selecting your rating from a dropdown, entering Comment and user name
					- Live preivew of the review is displayed as it is being typed
					- On submit, new review is added. Average customer review and review bars are dynamically re-calculated.

				B.1.1.4 Delete Review
					- Any review can be deleted by cliking the delete button next to each review.
					- On delete, the review is removed. Average customer review and review bars are dynamically re-calculated.

		B.2 Delete
			- Any gem can be deleted by clicking the Delete button next to the Gem
			- Clicking on Delete will delete the gem and all its reviews

		B.3 Edit (Inline Edit)
			- Any content of a Gem can be edited inline
			- Click on any field to edit, the text will convert to input field, make your changes and click Save.
			- On save, the updated value will communicated to the webservice and instantly updated on the page.

		B.4 One Click Checkout
			- User can perform one click checkout to instantly buy the gem he/she likes straight from the List page
			- On clicking one click checkout, user is asked for purchase confirmation with the price of the gem
			- On confirming purchase, success message for the purchase is displayed and the gem inventory is updated to be reduced by 1

		B.5 Add to Cart
			- User can add gems to the cart and checkout later from the Shopping Cart page
			- A gem which has already been added to the cart cannot be added again

		B.6 Sold Out
			- A gem is marked as sold out once all gems in the inventory has been sold, i.e. Quantity = 0
			- Once a gem is marked as Sold Out, a user cannot perform One Click Checkout OR Add to Cart

		B.7 Search
			B.7.1 Simple Instant Search
				- Search the content of all fields of all gems
				- Results are filtered intantly as you type

			B.7.2 Advanced Instant Search
				Makes REST calls to webservice as you type
				- Search by name of the gem
				- Filter results by price range by providing Min and Max price range
				- Filter results by average customer review. Shows gems with at least the given customer rating

		B.8 Sort
			- Sort by price (high to low) and (low to high)
			- Sort by average customer review (high to low) and (low to high)

	C. Add New Gem
		- User can add a new gem with all required details
		- Live preview of the Gem is shown as the form is filled including the image URL
		- On adding gem, the form resets and the Gem is added to the View All Gems page

	D. Shopping Cart
		- Lists all gems that has been added to the cart
		- User can remove Gem from the cart
		- User can purchase the Gem from the cart
		- On purchase, Gem is removed from the cart and the inventory is updated accordingly