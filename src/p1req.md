I have a react app with react-hook-form and material UI, It is an heavy app with lot of interdependent form fields

I have 3 sections in my app

Section1 : Deal section

Where i have 50 inputs with 30 as material UI autocomplete

Section2:

Where i have UI in form of rows with each row containing 30 input fields all material UI autocomplete , and ican also add new rows there is an add button

Section 3:

Again i have 50 material UI Autocomplete fields with Deal Misc details

Tricky part about this is when i change lets say some fields in deal section which is section 1 , it changes inputs in some rows in section 2

And same is for section 2 and section 3

Meaning sections are interrelated in terms of business functiotnality and Ad business wants all details in single page itself

How can i structure my app , seeing the complexity of it and making it not lag because of re-rendering.
